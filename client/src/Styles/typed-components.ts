import * as StyleThings from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

const {
    default: styled,
    createGlobalStyle,
    ThemeProvider,
    keyframes
} = StyleThings as ThemedStyledComponentsModule<ITheme>;

export default styled;
export { createGlobalStyle, ThemeProvider, keyframes };