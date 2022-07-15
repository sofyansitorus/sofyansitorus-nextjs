import themes from './themes';

const getTheme = (paletteMode: keyof typeof themes) => {
    return themes[paletteMode];
};

export default getTheme;
