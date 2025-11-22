/**
 * Utility classes for consistent spacing and typography
 */

export const container = {
  base: 'mx-auto w-full px-4 sm:px-6',
  narrow: 'max-w-2xl',
  wide: 'max-w-4xl',
};

export const card = {
  base: 'rounded-md border border-border bg-background shadow-sm',
  padding: 'p-6 sm:p-8',
  hover: 'transition-shadow hover:shadow-md',
};

export const typography = {
  h1: 'text-3xl font-semibold tracking-tight text-foreground sm:text-4xl',
  h2: 'text-2xl font-semibold tracking-tight text-foreground sm:text-3xl',
  h3: 'text-xl font-semibold tracking-tight text-foreground sm:text-2xl',
  h4: 'text-lg font-semibold tracking-tight text-foreground',
  body: 'text-base text-foreground leading-relaxed',
  small: 'text-sm text-muted-foreground',
  label: 'text-sm font-medium text-foreground',
};

export const spacing = {
  section: 'space-y-8',
  stack: 'space-y-6',
  compact: 'space-y-4',
  tight: 'space-y-2',
};

export const button = {
  base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  primary:
    'border border-primary bg-primary text-primary-foreground hover:bg-primary/90',
  secondary:
    'border border-border bg-background hover:bg-secondary hover:text-secondary-foreground',
  ghost: 'hover:bg-secondary hover:text-secondary-foreground',
  size: {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10',
  },
};

export const input = {
  base: 'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  textarea: 'min-h-[100px] resize-y',
};
