export const SPACING = {
  25: 4,
  50: 8,
  75: 12,
  100: 16,
  125: 20,
  150: 24,
  200: 32,
  250: 40,
  300: 48,
};

export const SPACING_PX = {
  25: `${SPACING[25]}px`,
  50: `${SPACING[50]}px`,
  75: `${SPACING[75]}px`,
  100: `${SPACING[100]}px`,
  125: `${SPACING[125]}px`,
  150: `${SPACING[150]}px`,
  200: `${SPACING[200]}px`,
  250: `${SPACING[250]}px`,
  300: `${SPACING[300]}px`,
};

export const margins = {
  small: SPACING_PX[100],
  medium: SPACING_PX[125],
  large: SPACING_PX[250],
};

export const FONT_SIZE = {
  body: "12px",
  subheader: "24px",
  header: "32px",
};

export const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};
