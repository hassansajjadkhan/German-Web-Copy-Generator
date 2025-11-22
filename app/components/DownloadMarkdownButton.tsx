'use client';

import React from 'react';
import { Button } from './Button';
import { toMarkdown, generateFilename } from '../lib/markdown';
import { AIResponse } from '../lib/schema';

interface DownloadMarkdownButtonProps {
  aiResponse: AIResponse;
  brandName: string;
}

export function DownloadMarkdownButton({
  aiResponse,
  brandName,
}: DownloadMarkdownButtonProps) {
  const handleDownload = () => {
    const markdown = toMarkdown(aiResponse, brandName);
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = generateFilename(brandName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="secondary" onClick={handleDownload}>
      ↓ Markdown herunterladen
    </Button>
  );
}
