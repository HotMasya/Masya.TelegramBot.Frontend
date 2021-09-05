import { createStandardAction } from "typesafe-actions";
import { ThemeActionTypes } from "../action-types";

export const toggleTheme = createStandardAction(
    ThemeActionTypes.TOGGLE_THEME
)();