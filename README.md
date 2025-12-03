# WORTGUT – German AI Website Copy Assistant

> Professionelle deutsche Website-Texte mit KI-Unterstützung erstellen

WORTGUT ist eine minimalistische Web-App, die mithilfe von KI hochwertige, markennahe Website-Texte auf Deutsch generiert. Perfekt für Selbstständige, Kreative und kleine Unternehmen, die professionelle Website-Inhalte benötigen.

## ✨ Features

- **Formular-basierte Eingabe**: Einfache, übersichtliche Erfassung von Marken- und Projektdetails
- **KI-gestützte Content-Generierung**: Nutzt Groq (oder andere OpenAI-kompatible APIs) für natürliche, präzise Texte
- **Strukturierte Ausgabe**: Organisiert nach Seiten (Startseite, Über uns, Leistungen, etc.) und Abschnitten
- **SEO-optimiert**: Generiert Meta-Titel, -Beschreibungen und Keywords
- **Export-Funktionen**:
  - Copy to Clipboard (einzelne Abschnitte oder alle Texte)
  - Download als Markdown (.md)
- **Minimalistisches Design**: Ruhige, professionelle Ästhetik mit viel Whitespace
- **Serverless**: Läuft als stateless MVP auf Vercel oder Netlify
- **Selbst-hostbar**: Komplette Kontrolle über Deployment und Daten

## 🚀 Quick Start

### Voraussetzungen

- Node.js 18+ und pnpm (oder npm/yarn)
- Groq API Key (oder OpenAI API Key)

### Installation

1. **Repository klonen oder Dateien herunterladen**

```bash
git clone <your-repo-url>
cd wortgut
```

2. **Dependencies installieren**

```bash
pnpm install
# oder
npm install
```

3. **Umgebungsvariablen konfigurieren**

Kopiere `.env.example` zu `.env.local`:

```bash
cp .env.example .env.local
```

Bearbeite `.env.local` und füge deinen API-Key ein:

```env
# LLM Provider Configuration
LLM_PROVIDER=groq
LLM_API_KEY=your_groq_api_key_here
LLM_BASE_URL=https://api.groq.com/openai/v1
LLM_MODEL=llama-3.3-70b-versatile

# Optional: Rate limiting
RATE_LIMIT_PER_HOUR=10
```

**Groq API Key erhalten:**
- Besuche [console.groq.com](https://console.groq.com)
- Registriere dich kostenlos
- Erstelle einen API-Key
- Kopiere den Key in deine `.env.local`

4. **Development Server starten**

```bash
pnpm dev
# oder
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) in deinem Browser.

## 📦 Build & Deploy

### Lokal bauen

```bash
pnpm build
pnpm start
```

### Vercel Deployment (empfohlen)

1. **Vercel Account erstellen** (falls noch nicht vorhanden): [vercel.com](https://vercel.com)

2. **Projekt verbinden**:
   - Klicke auf "New Project"
   - Importiere dein Git Repository
   - Vercel erkennt automatisch Next.js

3. **Umgebungsvariablen setzen**:
   - Gehe zu Settings → Environment Variables
   - Füge hinzu:
     - `LLM_PROVIDER` = `groq`
     - `LLM_API_KEY` = `gsk_your_api_key_here`
     - `LLM_BASE_URL` = `https://api.groq.com/openai/v1`
     - `LLM_MODEL` = `llama-3.3-70b-versatile`
     - `RATE_LIMIT_PER_HOUR` = `10` (optional)

4. **Deploy**: Vercel baut und deployt automatisch

5. **Live URL**: Deine App ist unter `https://your-project.vercel.app` erreichbar

### Netlify Deployment

1. **Netlify Account erstellen**: [netlify.com](https://www.netlify.com)

2. **Next.js auf Netlify aktivieren**:
   - Netlify unterstützt Next.js App Router out-of-the-box
   - Wähle "New site from Git"
   - Verbinde dein Repository

3. **Build Settings**:
   - Build command: `npm run build` (oder `pnpm build`)
   - Publish directory: `.next`

4. **Umgebungsvariablen**:
   - Site settings → Environment variables
   - Füge dieselben Variablen wie bei Vercel hinzu

5. **Deploy**: Push zu Git oder manueller Deploy

## 🔧 Konfiguration

### Provider wechseln

WORTGUT unterstützt jeden OpenAI-kompatiblen Endpoint:

**Groq (Standard)**:
```env
LLM_PROVIDER=groq
LLM_BASE_URL=https://api.groq.com/openai/v1
LLM_MODEL=llama-3.3-70b-versatile
```

**OpenAI**:
```env
LLM_PROVIDER=openai
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4o-mini
LLM_API_KEY=sk-...
```

**Andere kompatible Anbieter** (z.B. Azure OpenAI, LocalAI):
- Setze `LLM_BASE_URL` auf den entsprechenden Endpoint
- Passe `LLM_MODEL` an verfügbare Modelle an

### Empfohlene Modelle

| Provider | Modell | Beschreibung |
|----------|--------|--------------|
| Groq | `llama-3.3-70b-versatile` | Schnell, hochwertige Texte (empfohlen) |
| Groq | `llama-3.1-70b-versatile` | Alternative mit guter Performance |
| Groq | `mixtral-8x7b-32768` | Großer Context Window |
| OpenAI | `gpt-4o-mini` | Kosteneffizient, gute Qualität |
| OpenAI | `gpt-4o` | Höchste Qualität |

### Rate Limiting

Passe die Rate-Limit-Einstellung an:

```env
RATE_LIMIT_PER_HOUR=10  # Max. Anfragen pro IP pro Stunde
```

> **Hinweis**: Das Rate Limiting ist sehr einfach gehalten (in-memory) und eignet sich für MVP-Zwecke. Für Production sollte eine robustere Lösung (Redis, Database) implementiert werden.

## 🌐 iframe Embed

Du kannst WORTGUT als iframe in deine eigene Website einbetten:

```html
<iframe 
  src="https://your-wortgut.vercel.app" 
  style="width:100%; min-height:1200px; border:0;" 
  loading="lazy"
  title="WORTGUT - Website Copy Generator"
></iframe>
```

**Responsive Embed**:
```html
<div style="position: relative; width: 100%; padding-bottom: 100%; overflow: hidden;">
  <iframe 
    src="https://your-wortgut.vercel.app" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
    loading="lazy"
  ></iframe>
</div>
```

## 📁 Projektstruktur

```
wortgut/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API endpoint für Content-Generierung
│   ├── components/
│   │   ├── Button.tsx             # Wiederverwendbare Button-Komponente
│   │   ├── CopyButton.tsx         # Copy-to-Clipboard Button
│   │   ├── DownloadMarkdownButton.tsx
│   │   ├── ErrorNote.tsx          # Fehler-Anzeige
│   │   ├── FormCard.tsx           # Hauptformular
│   │   ├── InputField.tsx         # Text Input
│   │   ├── LoadingBar.tsx         # Loading Indicator
│   │   ├── OutputSection.tsx      # Generierte Texte anzeigen
│   │   └── TextAreaField.tsx      # Textarea Input
│   ├── lib/
│   │   ├── llmClient.ts           # LLM API Client (Groq/OpenAI)
│   │   ├── markdown.ts            # Markdown Export
│   │   ├── prompts.ts             # Prompt Templates
│   │   ├── schema.ts              # Zod Validierung
│   │   └── ui.ts                  # UI Utility Classes
│   ├── globals.css                # Tailwind + Custom Styles
│   ├── layout.tsx                 # Root Layout
│   └── page.tsx                   # Homepage
├── public/
│   └── favicon.ico
├── .env.example                   # Beispiel-Umgebungsvariablen
├── .eslintrc.cjs                  # ESLint Config
├── .prettierrc                    # Prettier Config
├── next.config.ts                 # Next.js Config
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🛠️ Entwicklung

### Scripts

```bash
pnpm dev          # Development Server (localhost:3000)
pnpm build        # Production Build
pnpm start        # Production Server
pnpm lint         # ESLint
pnpm format       # Prettier Format
pnpm type-check   # TypeScript Check
```

### TypeScript

Das Projekt nutzt TypeScript strict mode. Alle Komponenten sind vollständig typisiert.

### Linting & Formatting

```bash
# Code formatieren
pnpm format

# Linting prüfen
pnpm lint
```

## 🧪 Testing

Basis-Unit-Tests für `markdown.ts` und `schema.ts` können mit Jest hinzugefügt werden:

```bash
# Jest installieren (optional)
pnpm add -D jest @types/jest ts-jest

# Tests ausführen
pnpm test
```

## 🔒 Sicherheit & Datenschutz

- ✅ **API-Key bleibt serverseitig**: Niemals im Client-Code exponiert
- ✅ **Keine Datenspeicherung**: Stateless MVP, keine Datenbank
- ✅ **Kein PII Tracking**: Keine persönlichen Daten werden gespeichert
- ✅ **Rate Limiting**: Schutz vor Spam und Missbrauch
- ⚠️ **HTTPS erforderlich**: In Production immer HTTPS verwenden

## 💰 Kosten & Limits

### Groq (empfohlen für MVP)
- **Free Tier**: Großzügiges Kontingent für Entwicklung und Testing
- **Geschwindigkeit**: Sehr schnelle Inferenz
- **Modelle**: Llama 3.x, Mixtral, Gemma
- Siehe aktuelle Limits: [console.groq.com](https://console.groq.com)

### OpenAI
- **Pricing**: Pay-per-use (ca. $0.15/$0.60 per 1M tokens für GPT-4o-mini)
- **Rate Limits**: Abhängig vom Tier
- Details: [openai.com/pricing](https://openai.com/pricing)

### Best Practices
- Setze angemessene Rate Limits
- Monitore API-Nutzung über Provider-Dashboard
- Für Production: Implementiere Caching und erweiterte Rate-Limiting-Strategien

## 🐛 Bekannte Probleme

- **Rate Limiting**: Die aktuelle Implementierung ist in-memory und wird bei Server-Restart zurückgesetzt
- **Große Texte**: Sehr lange Outputs (>4000 Wörter) können die UI verlangsamen
- **Browser-Kompatibilität**: Clipboard API benötigt HTTPS (außer localhost)

## 🗺️ Roadmap

Mögliche zukünftige Erweiterungen:

- [ ] Persistente Rate-Limiting (Redis/Upstash)
- [ ] Mehr Export-Formate (PDF, DOCX, HTML)
- [ ] Benutzerdefinierte Seitenstrukturen
- [ ] Tonalität-Presets (Du/Sie-Automatik, Branchen-Templates)
- [ ] Multi-Language Support (EN, FR, ES)
- [ ] Content-Versionierung und Vergleich
- [ ] Integration mit CMS (WordPress, Webflow)
- [ ] A/B-Testing für verschiedene Textvarianten

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE) Datei

## 🤝 Beitragen

Contributions sind willkommen! Bitte öffne ein Issue oder Pull Request.

## 💬 Support

Bei Fragen oder Problemen:
- Öffne ein [GitHub Issue](https://github.com/your-repo/issues)
- Kontaktiere uns über [deine-email@example.com]

## 🙏 Danksagungen

- **Groq**: Für schnelle, zuverlässige LLM-Inferenz
- **Next.js**: Für das hervorragende React-Framework
- **Vercel**: Für einfaches, schnelles Hosting
- **Tailwind CSS**: Für das Utility-First CSS Framework

---

**Made with ❤️ for the German creative community**

🌐 [Demo](https://your-wortgut.vercel.app) | 📚 [Docs](https://github.com/your-repo) | 🐦 [Twitter](https://twitter.com/your-handle)
