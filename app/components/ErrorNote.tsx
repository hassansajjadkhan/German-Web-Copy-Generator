import React from 'react';

interface ErrorNoteProps {
  message: string;
}

export function ErrorNote({ message }: ErrorNoteProps) {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-4">
      <p className="text-sm text-red-800">{message}</p>
    </div>
  );
}
