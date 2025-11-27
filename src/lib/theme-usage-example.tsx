/**
 * Example: How to use MUI Theme in your components
 * 
 * This file demonstrates how to use the MUI theme system
 * in your components. You can delete this file after reviewing.
 */

'use client';

import { useTheme as useMuiTheme } from '@mui/material/styles';
import { Button, Card, Typography, Box } from '@mui/material';
import { useTheme as useAppTheme } from '@/hooks/useLocalStorage';

/**
 * Example Component using MUI Theme
 */
export function ExampleThemedComponent() {
  // Use MUI's useTheme hook to access theme values
  const muiTheme = useMuiTheme();
  
  // Use app's useTheme hook to access theme state
  const { theme, toggleTheme } = useAppTheme();

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: muiTheme.palette.background.paper,
        color: muiTheme.palette.text.primary,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, color: muiTheme.palette.primary.main }}>
        Themed Component Example
      </Typography>
      
      <Card sx={{ p: 2, mb: 2, backgroundColor: muiTheme.palette.background.default }}>
        <Typography variant="body1">
          Current theme: {theme}
        </Typography>
        <Typography variant="body2" sx={{ color: muiTheme.palette.text.secondary, mt: 1 }}>
          This component uses MUI theme colors that automatically adapt to light/dark mode.
        </Typography>
      </Card>

      <Button
        variant="contained"
        color="primary"
        onClick={toggleTheme}
        sx={{ mr: 1 }}
      >
        Toggle Theme
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        sx={{
          // You can also use theme values directly in sx prop
          borderColor: muiTheme.palette.secondary.main,
          '&:hover': {
            borderColor: muiTheme.palette.secondary.dark,
            backgroundColor: muiTheme.palette.secondary.light,
          },
        }}
      >
        Secondary Button
      </Button>
    </Box>
  );
}

/**
 * Usage in your components:
 * 
 * 1. Import MUI's useTheme hook:
 *    import { useTheme } from '@mui/material/styles';
 * 
 * 2. Use theme values:
 *    const theme = useTheme();
 *    const primaryColor = theme.palette.primary.main;
 * 
 * 3. Use in sx prop:
 *    <Box sx={{ color: theme.palette.primary.main }} />
 * 
 * 4. Or use theme-aware MUI components directly:
 *    <Button color="primary" variant="contained" />
 * 
 * 5. To toggle theme, use the app's useTheme hook:
 *    import { useTheme } from '@/hooks/useLocalStorage';
 *    const { toggleTheme, theme } = useTheme();
 */

