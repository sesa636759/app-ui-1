export type SnackbarType = 'success' | 'error' | 'warning' | 'info';

export type SnackbarVariant = 'filled' | 'outlined' | 'soft';

export type SnackbarSize = 'sm' | 'md' | 'lg';

export type SnackbarPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

export type SnackbarStackMode = 'stack' | 'queue' | 'lifo';

export type SnackbarOpenMode = 'slide-down' | 'slide-up' | 'slide-left' | 'slide-right' | 'fade' | 'scale' | 'bounce';

export interface SnackbarItem {
  id: string;
  type: SnackbarType;
  message: string;
  link?: {
    text: string;
    url: string;
  };
  duration?: number; // in milliseconds, default 5000
  variant?: SnackbarVariant;
  size?: SnackbarSize;
}