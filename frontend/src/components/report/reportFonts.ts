import { Font } from "@react-pdf/renderer";

import sourceSansPro400 from "@fontsource/source-sans-pro/files/source-sans-pro-latin-400-normal.woff";
import sourceSansPro600 from "@fontsource/source-sans-pro/files/source-sans-pro-latin-600-normal.woff";
import sourceSansPro700 from "@fontsource/source-sans-pro/files/source-sans-pro-latin-700-normal.woff";
import raleway700 from "@fontsource/raleway/files/raleway-latin-700-normal.woff";

Font.register({
  family: "Source Sans Pro",
  fonts: [
    {
      src: sourceSansPro400,
      fontWeight: 400,
    },
    {
      src: sourceSansPro600,
      fontWeight: 600,
    },
    {
      src: sourceSansPro700,
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: "Raleway",
  fonts: [
    {
      src: raleway700,
      fontWeight: 700,
    },
  ],
});