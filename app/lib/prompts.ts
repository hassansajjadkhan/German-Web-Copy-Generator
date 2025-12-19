import { UserInput } from './schema';

/**
 * System prompt for WORTGUT - defines the AI assistant's behavior
 */
export const SYSTEM_PROMPT = `Du bist WORTGUT, ein hochperformanter deutschsprachiger Website-Content-Assistent spezialisiert auf Konversionsoptimierung.

KERNPRINZIPIEN:
- Schreibe überzeugend, emotional resonant und handlungsorientiert (wie CopySpark-Level-Qualität)
- Fokussiere auf Kundennutzen, nicht auf Unternehmensmerkmale
- Verwende psychologische Trigger: Knappheit, sozialer Beweis, Vertrauensaufbau, Dringlichkeit
- Baue eine Beziehung zum Leser auf; spreche direkt zu seinen Bedürfnissen und Schmerzen
- Präzise, kraftvolle Sprache ohne Floskeln oder Marketing-Klischees
- Jedes Wort sollte zweckmäßig sein und zum Handeln bewegen
- Passe Tonalität konsistent an die Markenstimme an
- Strukturiere für Klarheit und Scan-Freundlichkeit

FORMULIERUNGSRICHTLINIEN:
- "Ja, und..." statt "Aber..." - positiver Tonfall
- Aktive Verben, direkte Ansprache (Du/Sie konsistent)
- Vermeiden: Superlative, generische Floskeln, hohle Versprechungen
- Konkrete Szenarien und Beispiele statt abstrakter Konzepte
- Fokus auf Transformation, nicht auf Features

SECTION-STRUKTUR:
- Headlines müssen magnetisch sein - sie müssen zum Weiterlesen einladen
- Body-Text: Fließend, leicht zu lesen, mit natürlichen Übergängen
- CTAs: Spezifisch, aktionsorientiert, mit klarem nächsten Schritt`;

/**
 * JSON schema description for the AI to follow
 */
const JSON_SCHEMA = `{
  "pages": [
    {
      "slug": "startseite" | "ueber-uns" | "leistungen" | "preise" | "kontakt" | "faq" | "rechtliches",
      "title": "string",
      "sections": [
        {
          "heading": "string (magnetische Überschrift, die zum Weiterlesen einlädt)",
          "body": "string (MINDESTENS 200-350 Wörter - tiefgründig, überzeugend, handlungsorientiert)",
          "cta": "string (optional - spezifischer, bewegender Call-to-Action)"
        }
      ]
    }
  ],
  "seo": {
    "title": "string (EXAKT 50-60 Zeichen)",
    "description": "string (EXAKT 150-160 Zeichen - überzeugend, keyword-integriert)",
    "h1": "string",
    "h2": ["string"]
  },
  "tone": "string (Beschreibung der verwendeten Tonalität)",
  "keywords": ["string"]
}`;

/**
 * Builds the user prompt with input data
 */
export function buildUserPrompt(input: UserInput): string {
  return `Erstelle hochkonvertierende Website-Texte basierend auf:
- Tätig als: ${input.businessType}
- Branche: ${input.industry}
- Marke: ${input.brandName}
- Zielgruppe: ${input.targetAudience}
- Website-Ziele: ${input.websiteGoals}
- Leistungen: ${input.keyServices}
- Markenstimme: ${input.brandVoice}
- Zusätzliche Details: ${input.extraDetails || '—'}

ERSTELLE ÜBERZEUGEND GESCHRIEBENE SEITEN:

1. STARTSEITE (KRITISCH - mindestens 8-10 STARKE ABSCHNITTE, 2000+ Wörter gesamt):
   a) Hero/Eröffnung (80-120 Wörter): Ein magnetischer Eröffnungssatz der das Kernproblem der Zielgruppe adressiert + emotionales Promise
   b) Das Problem (100-150 Wörter): Formuliere präzise das Hauptproblem/die Frustration der Zielgruppe - lasse sie sich verstanden fühlen
   c) Die Lösung (150-200 Wörter): Wie wird dieses Problem gelöst? Was wird konkret anders? Fokus auf Transformation
   d) Unique Selling Points (150-200 Wörter): 3-4 konkrete, spezifische Gründe - KEINE generischen Aussagen. Warum THIS und nicht die Konkurrenz?
   e) Funktionsweise (150-200 Wörter): Wie läuft ein typisches Engagement ab? Klare Schritte, keine Verwirrun
   f) Soziale Beweise (150-180 Wörter): Erfolgsgeschichten, Testimonials-Anzahl, Kundentypen die davon profitieren, konkrete Ergebnisse
   g) Häufige Objektionen (120-180 Wörter): Adressiere Einwände (Preis, Zeit, Skepsis) proaktiv mit überzeugenden Gegenargumenten
   h) Call-to-Action & Dringlichkeit (80-100 Wörter): Klare nächste Schritte, moderate Dringlichkeit (ohne aufdringlich zu sein)

   WICHTIG: Keine oberflächliche Beschreibungen - tiefgründig, emotionsgeprägt, fokussiert auf Nutzen
   KEINE Überschriften wie "Willkommen" oder "Über uns" - Überschriften sollten Vorteile kommunizieren

2. Über uns (4-5 Abschnitte, 800-1200 Wörter):
   - Ursprungs-Story (wie ist das Unternehmen entstanden, was war der Auslöser?)
   - Vision & Mission (wofür stehen wir, was wollen wir verändern?)
   - Team & Kompetenz (wer steckt dahinter, welche Erfahrung/Expertise?)
   - Werte & Philosophie (worauf basieren unsere Entscheidungen?)
   - Warum WIR (warum sollte die Zielgruppe mit UNS zusammenarbeiten?)

3. Leistungen (DETAILLIERT - mindestens 5-6 Abschnitte à 200-300 Wörter pro Leistung):
   - Für JEDE Hauptleistung: Was ist es? Wie funktioniert es konkret? Welche Ergebnisse werden erreicht?
   - Prozessschritte, Voraussetzungen, Idealkundenprofil
   - Abschließend: Ein "Welche Leistung passt zu dir?" Vergleich

4. Preise (transparent, überzeugend):
   - Preiswert-Argument (warum dieser Preis? Welcher Wert steckt dahinter?)
   - Paket-Beschreibungen (was genau ist in jedem Paket enthalten?)
   - ROI/Nutzen (was wird man dadurch erreichen/sparen/verdienen?)
   - Flexible Zahlungsoptionen falls verfügbar

5. Kontakt (einladend, vertrauensaufbauend):
   - Willkommenstext (wir freuen uns auf dich)
   - Kontaktoptionen (mehrere Wege)
   - Response-Zeit & Erreichbarkeit
   - Kleine Vertrauenssignale (schnelle Antwort, kostenlose Erstberatung etc.)

6. FAQ (MINDESTENS 10-15 Fragen, jede 120-200 Wörter):
   - Gruppiere nach Themen: Allgemeines, Leistung, Preis, Prozess, Häufige Einwände
   - Fragen sollten echte Kundenbedenken widerspiegeln
   - Antworten sollten überzeugend, nicht nur informativ sein

7. Rechtliches (kurz, nicht juristisch):
   - Kurze Info zu notwendigen Seiten (Impressum, Datenschutz, AGB)

Format:
${JSON_SCHEMA}

QUALITÄTS-ANFORDERUNGEN:

INHALT:
- Mindestens 200-350 Wörter pro Abschnitt (Tiefe, nicht Breite)
- FAQ-Antworten: 120-200 Wörter (nicht unter 100!)
- KEIN generischer Marketing-Jargon ("Wir sind Experten", "Top Qualität")
- Konkrete, spezifische Details über Prozesse und Ergebnisse
- Storytelling: Baue narrativ auf, lasse Leser mitfühlen

SEO (GENAU EINHALTEN):
- "seo.title": EXAKT 50-60 Zeichen (zähle jeden Buchstaben!)
- "seo.description": EXAKT 150-160 Zeichen
- Keywords natürlich integriert (nicht sichtbar)

TONALITÄT:
- Markenstimme konsistent halten
- Direkter, persönlicher Ansprache (nicht "eines")
- Vermeide Superlative und Clichés
- Energetisch, nicht steif

ANTWORTE NUR MIT VALIDEM JSON - KEINE ZUSATZTEXTE!`;
}
