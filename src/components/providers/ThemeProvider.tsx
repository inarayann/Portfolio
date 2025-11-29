'use client';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useTheme as useAppTheme } from '@/hooks/useLocalStorage';
import { getTheme } from '@/lib/theme';
import { useEffect, useState, useMemo } from 'react';

/**
 * ThemeProvider Component
 * 
 * Integrates MUI ThemeProvider with the existing theme management system
 * Provides theme context to all child components
 * Handles SSR properly to avoid hydration mismatches
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useAppTheme();
  const [mounted, setMounted] = useState(false);
  const [key, setKey] = useState(0); // Force re-render key

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use light theme as default during SSR to prevent hydration mismatch
  // Memoize to prevent unnecessary recalculations
  const muiTheme = useMemo(() => getTheme(mounted ? theme : 'light'), [mounted, theme]);

  // Sync MUI theme with document class for Tailwind dark mode
  useEffect(() => {
    if (typeof window === 'undefined' || !mounted) return;
    
    const html = document.documentElement;
    const currentTheme = getTheme(theme);
    
    // Force remove both classes first, then add the correct one
    html.classList.remove('light', 'dark');
    
    // Update HTML classes for Tailwind dark mode
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.add('light');
    }
    
    // Update CSS variables to match MUI theme
    html.style.setProperty('--background', currentTheme.palette.background.default);
    html.style.setProperty('--foreground', currentTheme.palette.text.primary);
    
    // Also set body background to ensure it updates (with !important to override MUI CssBaseline)
    document.body.style.setProperty('background-color', currentTheme.palette.background.default, 'important');
    document.body.style.setProperty('color', currentTheme.palette.text.primary, 'important');
    
    // Force a re-render by updating key
    setKey(prev => prev + 1);
  }, [theme, mounted]);

  // Only render children directly to avoid hydration issues
  // Theme classes are applied to html element, not needed here
  if (!mounted) {
    return (
      <MuiThemeProvider theme={getTheme('light')}>
        <CssBaseline enableColorScheme />
        {children}
      </MuiThemeProvider>
    );
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline enableColorScheme />
      {children}
    </MuiThemeProvider>
  );
}

