import { UserInput, AIResponseSchema, AIResponse } from './schema';
import { SYSTEM_PROMPT, buildUserPrompt } from './prompts';

interface LLMConfig {
  provider: string;
  apiKey: string;
  baseUrl: string;
  model: string;
}

/**
 * Get LLM configuration from environment variables
 */
function getLLMConfig(): LLMConfig {
  const provider = process.env.LLM_PROVIDER || 'groq';
  const apiKey = process.env.LLM_API_KEY;
  const baseUrl =
    process.env.LLM_BASE_URL || 'https://api.groq.com/openai/v1';
  const model = process.env.LLM_MODEL || 'llama-3.3-70b-versatile';

  if (!apiKey) {
    throw new Error(
      'LLM_API_KEY environment variable is required. Please check your .env.local file.'
    );
  }

  return { provider, apiKey, baseUrl, model };
}

/**
 * Call the OpenAI-compatible chat completion endpoint
 */
async function callChatCompletion(
  config: LLMConfig,
  messages: Array<{ role: string; content: string }>,
  temperature: number = 0.6
): Promise<string> {
  const url = `${config.baseUrl}/chat/completions`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      temperature,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `LLM API error (${response.status}): ${errorText || response.statusText}`
    );
  }

  const data = await response.json();

  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    throw new Error('Invalid response structure from LLM API');
  }

  return data.choices[0].message.content;
}

/**
 * Generate website copy using the configured LLM provider
 */
export async function generateWebsiteCopy(
  input: UserInput
): Promise<AIResponse> {
  const config = getLLMConfig();

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: buildUserPrompt(input) },
  ];

  try {
    // First attempt
    const content = await callChatCompletion(config, messages);

    // Parse and validate JSON
    let parsedData: unknown;
    try {
      parsedData = JSON.parse(content);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Raw content:', content);

      // Retry with stricter reminder
      const retryMessages = [
        ...messages,
        { role: 'assistant', content },
        {
          role: 'user',
          content:
            'Die Antwort war kein valides JSON. Bitte antworte NUR mit einem gültigen JSON-Objekt, das dem Schema entspricht. Keine zusätzlichen Texte oder Formatierungen.',
        },
      ];

      const retryContent = await callChatCompletion(config, retryMessages);
      parsedData = JSON.parse(retryContent);
    }

    // Validate against schema
    try {
      // Post-process: Truncate SEO description if too long
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = parsedData as any;
      if (data.seo?.description && data.seo.description.length > 158) {
        console.warn(`SEO description too long (${data.seo.description.length} chars), truncating...`);
        data.seo.description = data.seo.description.substring(0, 155) + '...';
      }

      const validatedData = AIResponseSchema.parse(data);
      return validatedData;
    } catch (validationError) {
      console.error('Schema validation error:', validationError);
      console.error('Parsed data:', JSON.stringify(parsedData, null, 2));

      // Retry with validation error feedback
      const errorMessage =
        validationError instanceof Error
          ? validationError.message
          : 'Validierungsfehler';

      const retryMessages = [
        ...messages,
        { role: 'assistant', content: JSON.stringify(parsedData) },
        {
          role: 'user',
          content: `Die JSON-Antwort hatte Validierungsfehler: ${errorMessage}

KRITISCH:
- seo.title MUSS zwischen 50-60 Zeichen lang sein
- seo.description MUSS zwischen 130-155 Zeichen lang sein (SEHR WICHTIG - NIEMALS länger als 158!)
- Zähle JEDEN Buchstaben in seo.description genau
- Alle anderen Felder müssen dem Schema entsprechen

Bitte korrigiere die Fehler und gib eine neue, korrekte JSON-Antwort zurück.`,
        },
      ];

      const retryContent = await callChatCompletion(config, retryMessages);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const retryParsedData = JSON.parse(retryContent) as any;
      
      // Post-process retry data as well
      if (retryParsedData.seo?.description && retryParsedData.seo.description.length > 158) {
        console.warn(`SEO description still too long after retry (${retryParsedData.seo.description.length} chars), truncating...`);
        retryParsedData.seo.description = retryParsedData.seo.description.substring(0, 155) + '...';
      }
      
      const validatedData = AIResponseSchema.parse(retryParsedData);
      return validatedData;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Fehler bei der Content-Generierung: ${error.message}`);
    }
    throw new Error('Ein unbekannter Fehler ist aufgetreten');
  }
}
