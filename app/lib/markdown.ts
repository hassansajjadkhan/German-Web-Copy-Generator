import { AIResponse } from './schema';

/**
 * Convert AI response to markdown format
 */
export function toMarkdown(
  aiResponse: AIResponse,
  _brandName: string
): string {
  const lines: string[] = [];

  // SEO Header
  lines.push(`# ${aiResponse.seo.title}`);
  lines.push('');
  lines.push(`_${aiResponse.seo.description}_`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // SEO Metadata section
  lines.push('## SEO-Metadaten');
  lines.push('');
  lines.push(`**H1:** ${aiResponse.seo.h1}`);
  lines.push('');
  lines.push('**H2-Überschriften:**');
  aiResponse.seo.h2.forEach((h2: string) => {
    lines.push(`- ${h2}`);
  });
  lines.push('');
  lines.push(`**Tonalität:** ${aiResponse.tone}`);
  lines.push('');
  if (aiResponse.keywords && aiResponse.keywords.length > 0) {
    lines.push(`**Schlüsselwörter:** ${aiResponse.keywords.join(', ')}`);
    lines.push('');
  }
  lines.push('---');
  lines.push('');

  // Pages
  lines.push('## Seiten');
  lines.push('');

  aiResponse.pages.forEach((page) => {
    lines.push(`### ${page.title}`);
    lines.push('');

    page.sections.forEach((section) => {
      lines.push(`#### ${section.heading}`);
      lines.push('');
      lines.push(section.body);
      lines.push('');

      if (section.cta) {
        lines.push(`**CTA:** ${section.cta}`);
        lines.push('');
      }
    });

    lines.push('---');
    lines.push('');
  });

  return lines.join('\n');
}

/**
 * Generate a filename for the markdown export
 */
export function generateFilename(brandName: string): string {
  const safeBrandName = brandName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const timestamp = new Date().toISOString().split('T')[0];

  return `wortgut-${safeBrandName || 'website'}-${timestamp}.md`;
}
