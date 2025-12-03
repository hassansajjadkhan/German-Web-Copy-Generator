import { UserInput } from './schema';

/**
 * System prompt for WORTGUT - defines the AI assistant's behavior
 */
export const SYSTEM_PROMPT = `Du bist WORTGUT, ein deutschsprachiger Website-Content-Assistent.
Schreibe klar, professionell, markennah und präzise. Verwende ruhige, minimalistische Sprache.
Passe Tonalität, Wortwahl und Satzlänge an die Eingaben an (Du/Sie bleibt konsistent).
Gliedere Inhalte in Seiten und Abschnitte (Heading + Body + optionale CTA).
Integriere relevante Schlüsselwörter natürlich (ohne Keyword-Stuffing).
Antworte AUSSCHLIESSLICH als valides JSON, das exakt dem vorgegebenen Schema entspricht.
Keine Erklärungen, keine Zusatztexte, nur JSON.`;

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
          "heading": "string",
          "body": "string (MINDESTENS 180-300 Wörter pro Abschnitt - ausführlich und detailliert)",
          "cta": "string (optional)"
        }
      ]
    }
  ],
  "seo": {
    "title": "string (EXAKT 50-60 Zeichen)",
    "description": "string (EXAKT 150-160 Zeichen - sehr wichtig!)",
    "h1": "string",
    "h2": ["string"]
  },
  "tone": "string (Beschreibung der verwendeten Tonalität)",
  "keywords": ["string"] (optional)
}`;

/**
 * Builds the user prompt with input data
 */
export function buildUserPrompt(input: UserInput): string {
  return `Erstelle eine Seitenstruktur + Texte basierend auf:
- Tätig als: ${input.businessType}
- Branche: ${input.industry}
- Marke: ${input.brandName}
- Zielgruppe: ${input.targetAudience}
- Website-Ziele: ${input.websiteGoals}
- Leistungen: ${input.keyServices}
- Markenstimme: ${input.brandVoice}
- Zusätzliche Details: ${input.extraDetails || '—'}

Erstelle ausführliche, detaillierte Texte für folgende Seiten:

1. Startseite - MUST HAVE MINDESTENS 6-8 SEPARATE ABSCHNITTE (Homepage ist die kritischste Seite und muss substantiell sein):
   a) Hero/Willkommen-Abschnitt: Emotionaler, überzeugender Eröffnungssatz mit klarem Wertversprechen
   b) Hauptnutzen & Problembewusstsein: Was ist das Kernproblem der Zielgruppe? Wie löst das Angebot es?
   c) Leistungsübersicht: Kurze Einführung in die 3-5 Hauptleistungen (detaillierte Version auf Leistungen-Seite)
   d) Alleinstellungsmerkmale: 3-4 konkrete Gründe, warum Kunden dieses Unternehmen wählen sollten
   e) Vertrauensaufbau: Erfahrung, Zertifizierungen, Erfolgsgeschichten, Kundenanzahl, Branchenerfahrung
   f) Value Proposition: Welcher konkrete Wert wird geliefert? Messbare Ergebnisse wenn möglich
   g) Kundentypen/Zielgruppe-Fokus: An wen richten wir uns? Verschiedene Kundengruppen kurz ansprechen
   h) Starker Call-to-Action: Nächste Schritte klar machen, Engagement aufforderung
   
   DIESE 6-8 ABSCHNITTE SIND ERFORDERLICH - nicht weniger! Die Startseite sollte MINDESTENS 1500-2000 Gesamtwörter sein über alle Abschnitte

2. Über uns (Ausführliche Geschichte und Entstehung, Unternehmenswerte mit Erklärungen, Team-Vorstellung, Mission und Vision, Was uns unterscheidet)

3. Leistungen (Sehr detaillierte Beschreibung JEDER angebotenen Dienstleistung, Prozessablauf, Nutzen für Kunden, konkrete Beispiele, mindestens 3-5 Hauptleistungen als separate Abschnitte)

4. Preise (Detaillierte Preisstruktur, Paket-Beschreibungen, Was ist enthalten, Flexible Optionen, Wert-Argumentation, Zahlungsbedingungen falls relevant)

5. Kontakt (Mehrere Kontaktwege beschreiben, Formular-Einleitung, Erreichbarkeitszeiten, Response-Zeit Erwartung, Standort-Information falls relevant, Einladender Abschlusstext)

6. FAQ (MINDESTENS 8-12 häufig gestellte Fragen mit ausführlichen, hilfreichen Antworten - jede Antwort sollte 80-150 Wörter umfassen. Kategorisiere nach Themen wie: Allgemeines, Leistungen, Preise, Ablauf, Support. Stelle sicher, dass die FAQ-Seite substantiell und wertvoll ist)

7. Rechtliches (Hinweis auf erforderliche Seiten wie Impressum/Datenschutz/AGB, KEINE Rechtsberatung, aber erkläre WARUM diese wichtig sind und was generell enthalten sein sollte)

Format:
${JSON_SCHEMA}

WICHTIG - STRIKTE ANFORDERUNGEN:

LÄNGE & QUALITÄT:
- "pages[].sections[].body" MUSS MINDESTENS 180-300 Wörter enthalten
- Jeder Abschnitt soll ausführlich, informativ und wertvoll sein
- FAQ-Antworten: MINDESTENS 80-150 Wörter pro Frage
- FAQ-Seite: MINDESTENS 8-12 Fragen mit umfassenden Antworten
- Keine oberflächlichen 1-2 Sätze - liefere echten Mehrwert
- Verwende konkrete Details, Beispiele und Erklärungen

SEO (KRITISCH - EXAKT EINHALTEN):
- "seo.title" EXAKT zwischen 50-60 Zeichen (zähle die Zeichen!)
- "seo.description" MUSS EXAKT zwischen 130-155 Zeichen sein - NIEMALS länger als 158 Zeichen
- Zähle JEDEN Buchstaben und jedes Leerzeichen in der SEO description
- Die description ist KRITISCH - sie darf NIEMALS 158 Zeichen überschreiten
- Wenn die description zu lang ist, kürze sie SOFORT

STIL & KONSISTENZ:
- Verwende natürliche, fließende deutsche Sprache
- Keine Halluzinationen, keine technischen Platzhalter
- Passe die Ansprache (Du/Sie) an die Zielgruppe und Markenstimme an und bleibe konsistent
- Integriere die genannten Leistungen und Ziele organisch in die Texte
- Schreibe überzeugend, professionell und markengerecht

FORMAT:
- NUR JSON ausgeben, keine zusätzlichen Erklärungen
- Strikte Einhaltung des JSON-Schemas`;
}
