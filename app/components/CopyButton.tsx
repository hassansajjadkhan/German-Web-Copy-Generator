'use client';

import React, { useState } from 'react';
import { Button } from './Button';

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = 'Kopieren' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Button variant="secondary" size="sm" onClick={handleCopy}>
      {copied ? '✓ Kopiert' : label}
    </Button>
  );
}
