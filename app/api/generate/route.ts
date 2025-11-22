import { NextRequest, NextResponse } from 'next/server';
import { UserInputSchema } from '@/app/lib/schema';
import { generateWebsiteCopy } from '@/app/lib/llmClient';

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const RATE_LIMIT_MAX =
  parseInt(process.env.RATE_LIMIT_PER_HOUR || '10', 10) || 10;

/**
 * Check if IP has exceeded rate limit
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];

  // Filter out requests outside the time window
  const recentRequests = requests.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (recentRequests.length >= RATE_LIMIT_MAX) {
    return false;
  }

  // Add current request
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);

  // Cleanup old entries periodically
  if (Math.random() < 0.01) {
    // 1% chance
    for (const [key, timestamps] of rateLimitMap.entries()) {
      const validTimestamps = timestamps.filter(
        (t) => now - t < RATE_LIMIT_WINDOW
      );
      if (validTimestamps.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, validTimestamps);
      }
    }
  }

  return true;
}

/**
 * Get client IP address
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Zu viele Anfragen. Bitte versuchen Sie es später erneut. (Rate limit erreicht)',
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = UserInputSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Ungültige Eingabedaten',
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    // Generate website copy
    const aiResponse = await generateWebsiteCopy(validationResult.data);

    return NextResponse.json({
      ok: true,
      data: aiResponse,
    });
  } catch (error) {
    console.error('API error:', error);

    // Handle Zod validation errors specifically
    if (error && typeof error === 'object' && 'issues' in error) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Die KI-Antwort konnte nicht validiert werden. Bitte versuche es erneut.',
          details: error,
        },
        { status: 500 }
      );
    }

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
