import { NextRequest, NextResponse } from 'next/server';
import { AIResponse } from '@/app/lib/schema';

/**
 * Add a new page to existing website content
 * POST body should include:
 * - pageName: string (name of the new page)
 * - pageDescription: string (description/purpose of the page)
 * - existingResponse: AIResponse (the current AI response to extend)
 * - userInput: UserInput (original user input for context)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageName, pageDescription, existingResponse, userInput } = body;

    if (!pageName || !pageDescription || !existingResponse || !userInput) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Erforderliche Felder fehlen: pageName, pageDescription, existingResponse, userInput',
        },
        { status: 400 }
      );
    }

    // Create a prompt specifically for generating the new page
    const pageGenerationPrompt = `Basierend auf folgendem Kontext, erstelle EINE neue Seite mit dem Namen "${pageName}".

KONTEXT:
- Unternehmen: ${userInput.businessType}
- Branche: ${userInput.industry}
- Marke: ${userInput.brandName}
- Zielgruppe: ${userInput.targetAudience}
- Website-Ziele: ${userInput.websiteGoals}
- Leistungen: ${userInput.keyServices}
- Markenstimme: ${userInput.brandVoice}

NEUE SEITE - BESCHREIBUNG:
${pageDescription}

Erstelle eine substantielle Seite mit:
- Aussagekräftiger Titel
- 4-6 detaillierte Abschnitte (mindestens 180-300 Wörter pro Abschnitt)
- Jeder Abschnitt sollte aussagekräftig und wertvoll sein
- Berücksichtige die bestehenden Seiten und integriere die neue Seite logisch
- SEO-optimierter Titel (50-60 Zeichen) und Meta-Beschreibung (130-155 Zeichen)

Antworte NUR mit JSON im folgenden Format:
{
  "title": "Seitentitel",
  "sections": [
    {
      "heading": "Überschrift",
      "body": "Detaillierter Text...",
      "cta": "Call-to-action (optional)"
    }
  ],
  "seo": {
    "title": "SEO Titel",
    "description": "SEO Meta Beschreibung",
    "keywords": ["keyword1", "keyword2"]
  }
}`;

    // Call the LLM to generate the new page
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: pageGenerationPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Groq API error:', errorData);
      return NextResponse.json(
        {
          ok: false,
          error: 'Fehler bei der KI-Generierung der neuen Seite',
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse the JSON response from the LLM
    let newPage;
    try {
      newPage = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse LLM response:', content);
      return NextResponse.json(
        {
          ok: false,
          error: 'Die KI-Antwort konnte nicht geparst werden',
        },
        { status: 500 }
      );
    }

    // Validate the new page structure
    if (!newPage.title || !Array.isArray(newPage.sections) || newPage.sections.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Ungültige Seitenstruktur von der KI erhalten',
        },
        { status: 500 }
      );
    }

    // Add the new page to the existing response
    const updatedResponse: AIResponse = {
      ...existingResponse,
      pages: [
        ...existingResponse.pages,
        {
          title: newPage.title,
          sections: newPage.sections,
          seo: newPage.seo,
        },
      ],
    };

    return NextResponse.json({
      ok: true,
      data: updatedResponse,
    });
  } catch (error) {
    console.error('API error:', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Ein unbekannter Fehler ist aufgetreten';

    return NextResponse.json(
      {
        ok: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      error: 'Method not allowed. Please use POST.',
    },
    { status: 405 }
  );
}
