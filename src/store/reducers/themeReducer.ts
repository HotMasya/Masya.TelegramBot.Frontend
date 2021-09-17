import { createReducer } from 'typesafe-actions';
import * as actions from '../actions';

export type ThemeState = {
  theme: 'light' | 'dark';
};

const initialState: ThemeState = {
  theme: (localStorage.getItem('x-theme-type') as 'light' | 'dark') ?? 'light',
};

export const themeReducer = createReducer(initialState).handleAction(
  actions.toggleTheme,
  (state) => {
    const themeType = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('x-theme-type', themeType);
    return {
      theme: themeType,
    };
  },
);
