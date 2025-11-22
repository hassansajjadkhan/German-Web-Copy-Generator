import { z } from 'zod';

/**
 * User input schema for the website copy generation form
 */
export const UserInputSchema = z.object({
  businessType: z.string().min(2, 'Bitte mindestens 2 Zeichen eingeben'),
  industry: z.string().min(2, 'Bitte mindestens 2 Zeichen eingeben'),
  brandName: z.string().min(2, 'Bitte mindestens 2 Zeichen eingeben'),
  targetAudience: z.string().min(2, 'Bitte mindestens 2 Zeichen eingeben'),
  websiteGoals: z.string().min(5, 'Bitte mindestens 5 Zeichen eingeben'),
  keyServices: z.string().min(5, 'Bitte mindestens 5 Zeichen eingeben'),
  brandVoice: z.string().min(2, 'Bitte mindestens 2 Zeichen eingeben'),
  extraDetails: z.string().max(10000).optional(),
});

export type UserInput = z.infer<typeof UserInputSchema>;

/**
 * AI response schema for the generated website copy
 */
export const AIResponseSchema = z.object({
  pages: z.array(
    z.object({
      slug: z.enum([
        'startseite',
        'ueber-uns',
        'leistungen',
        'preise',
        'kontakt',
        'faq',
        'rechtliches',
      ]),
      title: z.string(),
      sections: z.array(
        z.object({
          heading: z.string(),
          body: z.string(),
          cta: z.string().optional(),
        })
      ),
    })
  ),
  seo: z.object({
    title: z.string().max(65, 'SEO Titel sollte maximal 65 Zeichen haben'),
    description: z
      .string()
      .min(100, 'SEO Beschreibung sollte mindestens 100 Zeichen haben')
      .max(158, 'SEO Beschreibung sollte maximal 158 Zeichen haben'),
    h1: z.string(),
    h2: z.array(z.string()),
  }),
  tone: z.string(),
  keywords: z.array(z.string()).optional(),
});

export type AIResponse = z.infer<typeof AIResponseSchema>;
