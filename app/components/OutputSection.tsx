'use client';

import React from 'react';
import { AIResponse } from '../lib/schema';
import jsPDF from 'jspdf';

interface OutputSectionProps {
  aiResponse: AIResponse;
  brandName: string;
  onReset: () => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
  userInput?: Record<string, unknown>;
  onPageAdded?: (updatedResponse: AIResponse) => void;
}

export function OutputSection({ aiResponse, brandName, onReset, onRegenerate, isRegenerating, userInput, onPageAdded }: OutputSectionProps) {
  const [activePageSlug, setActivePageSlug] = React.useState<string>(aiResponse.pages[0]?.slug || 'startseite');
  const [seitenCollapsed, setSeitenCollapsed] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedContent, setEditedContent] = React.useState('');
  const [showRegenerateModal, setShowRegenerateModal] = React.useState(false);
  const [showAddPageModal, setShowAddPageModal] = React.useState(false);
  const [newPageName, setNewPageName] = React.useState('');
  const [newPageDescription, setNewPageDescription] = React.useState('');
  const [isAddingPage, setIsAddingPage] = React.useState(false);

  const activePage = aiResponse.pages.find(p => p.slug === activePageSlug) || aiResponse.pages[0];

  // Generate formatted text for current page
  const generatePageText = () => {
    let text = '';
    activePage.sections.forEach((section) => {
      text += `${section.heading}\n\n`;
      text += `${section.body}\n\n`;
      if (section.cta) {
        text += `Call to Action: ${section.cta}\n\n`;
      }
      text += '---\n\n';
    });
    return text;
  };

  // Export as PDF
  const exportAsPDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginLeft = 15;
    const marginRight = 15;
    const pageWidth = doc.internal.pageSize.getWidth() - marginLeft - marginRight;

    // Add title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(`${brandName} - Website Content`, marginLeft, yPosition);
    yPosition += 15;

    // Add all pages
    aiResponse.pages.forEach((page) => {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(page.title, marginLeft, yPosition);
      yPosition += 10;

      page.sections.forEach((section) => {
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(section.heading, marginLeft, yPosition);
        yPosition += 8;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const splitText = doc.splitTextToSize(section.body, pageWidth);
        doc.text(splitText, marginLeft, yPosition);
        yPosition += splitText.length * 5 + 5;

        if (section.cta) {
          doc.setFont('helvetica', 'italic');
          doc.text(`CTA: ${section.cta}`, marginLeft, yPosition);
          yPosition += 8;
        }

        yPosition += 5;
      });

      yPosition += 10;
    });

    doc.save(`${brandName || 'wortgut'}-content.pdf`);
  };

  // Copy all content
  const copyAllContent = () => {
    navigator.clipboard.writeText(generatePageText());
  };

  // Add new page
  const handleAddPage = async () => {
    if (!newPageName.trim() || !newPageDescription.trim()) {
      alert('Bitte fülle alle Felder aus');
      return;
    }

    setIsAddingPage(true);
    try {
      const response = await fetch('/api/pages/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageName: newPageName,
          pageDescription: newPageDescription,
          existingResponse: aiResponse,
          userInput: userInput,
        }),
      });

      const data = await response.json();

      if (!data.ok) {
        alert('Fehler beim Hinzufügen der Seite: ' + data.error);
        return;
      }

      // Update the response with the new page
      if (onPageAdded) {
        onPageAdded(data.data);
      }

      // Reset modal
      setShowAddPageModal(false);
      setNewPageName('');
      setNewPageDescription('');
    } catch (error) {
      console.error('Error adding page:', error);
      alert('Fehler beim Hinzufügen der Seite');
    } finally {
      setIsAddingPage(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-champagne">
      {/* Sidebar Navigation */}
      <aside className="w-60 bg-white border-r border-gray-300 fixed h-screen overflow-y-auto">
        <div className="p-6">
          {/* Logo */}
          <button 
            onClick={onReset}
            className="mb-12 text-2xl font-logo font-light tracking-wider hover:opacity-60 transition-opacity text-black"
          >
            WORTGUT
          </button>
          
          {/* Navigation */}
          <nav className="space-y-1">
            {/* Seiten Header with Collapse */}
            <div 
              className="flex items-center justify-between py-2 cursor-pointer hover:opacity-70"
              onClick={() => setSeitenCollapsed(!seitenCollapsed)}
            >
              <span className="text-sm font-light text-black">Seiten</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAddPageModal(true);
                  }}
                  className="w-5 h-5 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors"
                  title="Neue Seite hinzufügen"
                >
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                  <span className="text-white text-xs">{seitenCollapsed ? '+' : '−'}</span>
                </div>
              </div>
            </div>
            
            {/* Page List */}
            {!seitenCollapsed && (
              <div className="pl-0 space-y-0.5 mt-2">
                {aiResponse.pages.map((page) => {
                  const pageLabels: Record<string, string> = {
                    'startseite': 'Homepage',
                    'ueber-uns': 'About',
                    'leistungen': 'Angebote',
                    'preise': 'Portfolio',
                    'kontakt': 'Kontakt',
                    'faq': 'FAQ',
                    'rechtliches': 'Shop'
                  };
                  
                  return (
                    <button
                      key={page.slug}
                      onClick={() => setActivePageSlug(page.slug)}
                      className={`block w-full text-left px-3 py-2 text-base font-light transition-colors ${
                        activePageSlug === page.slug 
                          ? 'bg-gray-100 text-black' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {pageLabels[page.slug] || page.title}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
            
            {/* Download PDF Button */}
            <div className="mt-8 pt-6 border-t border-gray-200\">
              <button
                onClick={exportAsPDF}
                className="w-full px-4 py-2.5 text-sm bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-light"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Als PDF herunterladen
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-60">
        <div className="max-w-4xl mx-auto px-16 py-12">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-2xl font-logo font-light tracking-wider text-black mb-3">
              WORTGUT
            </h1>
            <p className="text-sm text-gray-700 font-light">
              Dein AI-Powered Website Content Assistant. Erstelle in wenigen Minuten professionelle Website-Texte – individuell auf dein Unternehmen abgestimmt.
            </p>
            <a href="#" className="text-xs underline text-gray-700 hover:text-black transition-colors mt-2 inline-block">
              Watch Video-Tutorial
            </a>
          </header>

          {/* Action Bar */}
          <div className="bg-white border border-gray-300 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-logo font-light text-black tracking-wide">
                {activePage.title.toUpperCase()}
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsEditing(!isEditing);
                    if (!isEditing) {
                      setEditedContent(generatePageText());
                    }
                  }}
                  className="px-4 py-2 text-sm border border-gray-400 hover:bg-gray-50 transition-colors flex items-center gap-2 font-light"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Anpassen
                </button>
                <button
                  onClick={copyAllContent}
                  className="px-4 py-2 text-sm border border-gray-400 hover:bg-gray-50 transition-colors flex items-center gap-2 font-light"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Kopieren
                </button>
                <button
                  onClick={() => setShowRegenerateModal(true)}
                  disabled={isRegenerating}
                  className="px-4 py-2 text-sm border border-gray-400 hover:bg-gray-50 transition-colors flex items-center gap-2 font-light disabled:opacity-50"
                >
                  <svg className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {isRegenerating ? 'Wird generiert...' : 'Regenerieren'}
                </button>
              </div>
            </div>

            {/* Editing Mode */}
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 font-light mb-2 block">
                    Individuelle Anweisungen für die Startseite
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 text-base font-light focus:border-black focus:outline-none resize-none"
                    rows={6}
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    placeholder="Hier kannst du Anweisungen für die Startseite hinzufügen..."
                  />
                </div>
                
                {/* Tone Selection */}
                <div>
                  <label className="text-sm text-gray-600 font-light mb-2 block">Tonalität</label>
                  <div className="flex flex-wrap gap-2">
                    {['Professionell', 'Locker', 'Freundlich', 'Technisch', 'Formell'].map((tone) => (
                      <button
                        key={tone}
                        className="px-3 py-1.5 text-sm border border-gray-400 hover:bg-gray-100 transition-colors font-light"
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Length */}
                <div>
                  <label className="text-sm text-gray-600 font-light mb-2 block">Textlänge</label>
                  <div className="flex flex-wrap gap-2">
                    {['Kurz & knackig', 'Standard', 'Detailliert'].map((length) => (
                      <button
                        key={length}
                        className="px-3 py-1.5 text-sm border border-gray-400 hover:bg-gray-100 transition-colors font-light"
                      >
                        {length}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Content Display
              <div className="space-y-8">
                {activePage.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="text-xl font-light text-black">{section.heading}</h3>
                    <p className="text-base text-gray-700 leading-relaxed font-light whitespace-pre-wrap">
                      {section.body}
                    </p>
                    {section.cta && (
                      <button className="mt-4 px-6 py-2 border border-black text-xs hover:bg-black hover:text-white transition-colors font-light">
                        {section.cta}
                      </button>
                    )}
                    {idx < activePage.sections.length - 1 && (
                      <div className="border-t border-gray-300 mt-6"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <button
              onClick={onReset}
              className="px-8 py-3 bg-black text-white text-xs tracking-wider hover:bg-gray-800 transition-colors font-light"
            >
              NEU STARTEN
            </button>
            <p className="text-xs text-gray-500 mt-6 font-light">
              Eine Sektion: Sobald du &quot;Neu starten&quot; klickst, werden alle Texte unwiderruflich gelöscht. Kopiere Texte am besten vorher in ein Textdokument auf deinem PC, um diese zu speichern.
            </p>
          </div>
        </div>
      </div>

      {/* Regenerate Modal */}
      {showRegenerateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-lg font-logo font-light text-black mb-4">Inhalte erneut generieren</h3>
            <p className="text-sm text-gray-700 mb-6 font-light">
              Wähle die Einstellungen für die neue Generierung:
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-600 font-light mb-2 block">Tonalität</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Professionell', 'Locker', 'Freundlich', 'Technisch'].map((tone) => (
                    <button
                      key={tone}
                      className="px-3 py-1.5 text-xs border border-gray-400 hover:bg-black hover:text-white transition-colors font-light"
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 font-light mb-2 block">Textlänge</label>
                <div className="flex gap-2">
                  {['Kurz', 'Standard', 'Ausführlich'].map((length) => (
                    <button
                      key={length}
                      className="flex-1 px-3 py-1.5 text-xs border border-gray-400 hover:bg-black hover:text-white transition-colors font-light"
                    >
                      {length}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRegenerateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-400 text-sm hover:bg-gray-50 transition-colors font-light"
              >
                Abbrechen
              </button>
              <button
                onClick={() => {
                  setShowRegenerateModal(false);
                  onRegenerate();
                }}
                className="flex-1 px-4 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors font-light"
              >
                Regenerieren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Page Modal */}
      {showAddPageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-lg font-logo font-light text-black mb-4">Weitere Seite hinzufügen</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-600 font-light mb-2 block">Name der Seite</label>
                <input
                  type="text"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  placeholder="z. B. Portfolio, Team, FAQ"
                  className="w-full px-3 py-2 border border-gray-300 text-sm font-light focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 font-light mb-2 block">Beschreibung zur Seite</label>
                <textarea
                  value={newPageDescription}
                  onChange={(e) => setNewPageDescription(e.target.value)}
                  placeholder="Beschreibe, welche Abschnitte oder Inhalte auf dieser Seite erscheinen sollen..."
                  className="w-full px-3 py-2 border border-gray-300 text-sm font-light focus:border-black focus:outline-none resize-none"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAddPageModal(false);
                  setNewPageName('');
                  setNewPageDescription('');
                }}
                className="flex-1 px-4 py-2 border border-gray-400 text-sm hover:bg-gray-50 transition-colors font-light"
              >
                Abbrechen
              </button>
              <button
                onClick={handleAddPage}
                disabled={isAddingPage}
                className="flex-1 px-4 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors font-light disabled:opacity-50"
              >
                {isAddingPage ? 'Wird generiert...' : 'Seite hinzufügen'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
