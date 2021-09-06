import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import GlobalStyles from './GlobalStyles';
import palette from './palette';

const ThemeConfig: React.FC = (props) => {
  const { children } = props;
  const { ...paletteSettings } = palette;
  const themeState = useSelector((state: RootState) => state.theme);

  const theme = useMemo(() => {
    return createTheme({
        palette: {
          ...paletteSettings,
          type: themeState.theme,
        }
    });
  }, [themeState.theme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default ThemeConfig;
