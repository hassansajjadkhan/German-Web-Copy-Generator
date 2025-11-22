import React from 'react';

export function LoadingBar() {
  return (
    <div className="w-full bg-secondary rounded-full h-1 overflow-hidden">
      <div className="h-full bg-primary animate-loading-bar" />
    </div>
  );
}
