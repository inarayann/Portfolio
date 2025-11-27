/**
 * Custom Local Storage Hook
 * 
 * Reusable hook for managing localStorage with TypeScript support
 * Provides type-safe localStorage operations with error handling
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Generic localStorage hook
 * Manages localStorage operations with type safety and error handling
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] => {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

/**
 * Theme hook for managing dark/light mode
 * Pre-configured for theme management
 */
export const useTheme = () => {
  const [theme, setTheme, removeTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  
  // Check system preference on mount if no stored theme
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = window.localStorage.getItem('theme');
        // Only check system preference if no stored theme exists
        if (!stored && window.matchMedia) {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (prefersDark) {
            setTheme('dark');
          }
        }
      } catch (error) {
        console.error('Error checking system theme preference:', error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      
      // Immediately update DOM to prevent flash and ensure instant feedback
      if (typeof window !== 'undefined') {
        const html = document.documentElement;
        // Force remove both classes first
        html.classList.remove('light', 'dark');
        // Then add the correct one
        html.classList.add(newTheme);
        
        // Trigger a custom event to notify components
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
      }
      
      return newTheme;
    });
  }, [setTheme]);

  const setLightTheme = useCallback(() => {
    setTheme('light');
  }, [setTheme]);

  const setDarkTheme = useCallback(() => {
    setTheme('dark');
  }, [setTheme]);

  // Note: Theme class management is handled by ThemeProvider
  // This hook only manages the theme state in localStorage

  return {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    removeTheme
  };
};

/**
 * Settings hook for managing user preferences
 * Pre-configured for application settings
 */
export const useSettings = () => {
  const [settings, setSettings] = useLocalStorage('app-settings', {
    animations: true,
    notifications: true,
    language: 'en',
    timezone: 'UTC'
  });

  const updateSetting = useCallback((key: keyof typeof settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  }, [setSettings]);

  return {
    settings,
    setSettings,
    updateSetting
  };
};

/**
 * Recent items hook for managing recently viewed items
 * Useful for tracking user activity
 */
export const useRecentItems = <T>(maxItems: number = 10) => {
  const [recentItems, setRecentItems] = useLocalStorage<T[]>(`recent-items`, []);

  const addItem = useCallback((item: T) => {
    setRecentItems(prev => {
      const filtered = prev.filter(existingItem => 
        JSON.stringify(existingItem) !== JSON.stringify(item)
      );
      const updated = [item, ...filtered].slice(0, maxItems);
      return updated;
    });
  }, [setRecentItems, maxItems]);

  const removeItem = useCallback((item: T) => {
    setRecentItems(prev => 
      prev.filter(existingItem => 
        JSON.stringify(existingItem) !== JSON.stringify(item)
      )
    );
  }, [setRecentItems]);

  const clearItems = useCallback(() => {
    setRecentItems([]);
  }, [setRecentItems]);

  return {
    recentItems,
    addItem,
    removeItem,
    clearItems
  };
};

/**
 * Form data hook for persisting form data
 * Useful for draft saving and form recovery
 */
export const useFormData = <T>(formKey: string, initialData: T) => {
  const [formData, setFormData, clearFormData] = useLocalStorage(`form-${formKey}`, initialData);

  const updateFormData = useCallback((updates: Partial<T>) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  }, [setFormData]);

  const resetFormData = useCallback(() => {
    setFormData(initialData);
  }, [setFormData, initialData]);

  return {
    formData,
    setFormData,
    updateFormData,
    resetFormData,
    clearFormData
  };
};
