'use client';

import React, { useState } from 'react';
import { FormCard } from './components/FormCard';
import { OutputSection } from './components/OutputSection';
import { LoadingBar } from './components/LoadingBar';
import { ErrorNote } from './components/ErrorNote';
import { UserInput, AIResponse } from './lib/schema';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [brandName, setBrandName] = useState<string>('');
  const [lastFormData, setLastFormData] = useState<UserInput | null>(null);

  const handleSubmit = async (formData: UserInput) => {
    setIsLoading(true);
    setError(null);
    setBrandName(formData.brandName);
    setLastFormData(formData);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Ein Fehler ist aufgetreten');
      }

      setAiResponse(data.data);
    } catch (err) {
      console.error('Error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Es ist ein Fehler aufgetreten. Bitte versuche es erneut.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastFormData) {
      handleSubmit(lastFormData);
    }
  };

  const handleReset = () => {
    setAiResponse(null);
    setError(null);
    setLastFormData(null);
  };

  return (
    <main className="min-h-screen bg-champagne">
      {!aiResponse || isLoading ? (
        // Form View - Centered
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto space-y-8">
            {/* Header */}
            <header className="text-center space-y-4">
              <h1 className="text-5xl font-logo font-light tracking-wider text-black">
                WORTGUT
              </h1>
              <p className="text-base text-gray-700 max-w-md mx-auto leading-relaxed font-light">
                Dein AI-Powered Website Content Assistant. Erstelle in wenigen Minuten professionelle Website-Texte – individuell auf dein Unternehmen abgestimmt.
              </p>
              <a href="#" className="text-xs underline text-gray-700 hover:text-black transition-colors">
                Watch Video-Tutorial
              </a>
            </header>

            {/* Form Card */}
            <div className="bg-white border border-gray-300 p-8">
              <FormCard onSubmit={handleSubmit} isLoading={isLoading} />
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-4">
                <LoadingBar />
                <p className="text-center text-sm text-muted-foreground">
                  Texte werden erstellt … das dauert nur einen Moment.
                </p>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && <ErrorNote message={error} />}
            
            {/* Footer Feedback */}
            <div className="text-center space-y-2">
              <p className="text-xs text-gray-600 font-light">Feedback schicken</p>
              <p className="text-xs text-gray-500 font-light max-w-lg mx-auto leading-relaxed">
                Wir legen großen Wert auf deine Privatsphäre. Diese App speichert Daten ausschließlich in Schweiz, ohne sie zu
                speichern – alles bleibt privat und lokal. Nutze das Formular unten bedenkenlos. Sollte gefällt.
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Results View - Sidebar Layout
        <OutputSection 
          aiResponse={aiResponse} 
          brandName={brandName} 
          onReset={handleReset}
          onRegenerate={handleRegenerate}
          isRegenerating={isLoading}
        />
      )}
    </main>
  );
}
