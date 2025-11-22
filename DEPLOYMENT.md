# WORTGUT - Deployment Guide

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/wortgut)

### Manual Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables:
```bash
vercel env add LLM_PROVIDER
vercel env add LLM_API_KEY
vercel env add LLM_BASE_URL
vercel env add LLM_MODEL
```

4. Deploy to production:
```bash
vercel --prod
```

## Netlify Deployment

### Using Netlify CLI

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Initialize:
```bash
netlify init
```

3. Set environment variables in Netlify dashboard:
   - Go to Site settings → Environment variables
   - Add all required variables

4. Deploy:
```bash
netlify deploy --prod
```

### Using Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect repository in Netlify dashboard
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables in Site settings
5. Netlify will auto-deploy on every push

## Environment Variables

Required for all deployments:

```env
LLM_PROVIDER=groq
LLM_API_KEY=gsk_your_api_key_here
LLM_BASE_URL=https://api.groq.com/openai/v1
LLM_MODEL=llama-3.3-70b-versatile
RATE_LIMIT_PER_HOUR=10
```

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS according to Vercel's instructions

### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS or use Netlify DNS

## Performance Tips

- Enable edge caching for static assets
- Use Vercel/Netlify Analytics for monitoring
- Set up error tracking (Sentry, etc.)
- Configure appropriate rate limits based on expected traffic

## Security Checklist

- ✅ Never commit `.env.local` to git
- ✅ Rotate API keys regularly
- ✅ Monitor API usage in provider dashboard
- ✅ Enable HTTPS (automatic on Vercel/Netlify)
- ✅ Set up CORS if embedding in iframe
- ✅ Configure appropriate rate limits
