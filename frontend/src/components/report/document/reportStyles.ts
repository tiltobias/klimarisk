import { StyleSheet } from "@react-pdf/renderer";
import { reportTheme as t } from "./reportTheme";


const treeItem = (level: number) => ({
  fontSize: 10 * [1.6, 1.2, 1][level],
  height: 22 * [1.6, 1.2, .7][level],

  // backgroundColor: t.c.bg2,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 5,
  paddingVertical: [3, 3, 1][level],
  paddingLeft: [5, 35, 65][level],

  
}) as const;


export const reportStyles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: t.font.body,
    fontWeight: t.font.weight.normal,
    color: t.c.text,
    fontSize: t.font.size,
    backgroundColor: t.c.bg1,
  },

  heading: {
    backgroundColor: t.c.bg3,
    width: "100%",
    height: 120,
    padding: t.x.mg * 3,
    paddingBottom: 0,
  },

  title: {
    fontFamily: t.font.heading,
    fontWeight: t.font.weight.bold,
    fontSize: t.font.size * 2.2,
    marginBottom: t.x.mg / 2,
    paddingRight: t.x.mg * 2.5,
  },

  section: {
    marginBottom: 16,
  },

  smallTitle: {
    fontWeight: t.font.weight.medium,
    fontSize: t.font.size * 1.2,
    paddingRight: t.x.mg * 2.5,
  },

  label: {
    // fontStyle: "italic" as const,
  },
  titleLabel: {
    fontWeight: t.font.weight.normal,
    fontSize: t.font.size * 1.8,
  },
  smallTitleLabel: {
    fontWeight: t.font.weight.normal,
    fontSize: t.font.size * 1.1,
  },

  score: {
    display: "flex" as const,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    fontFamily: t.font.body,
  },
  scoreVal: {
    width: t.font.size * 3.5,
    textAlign: "right" as const,
  },
  titleScoreVal: {
    width: t.font.size * 6.2,
    textAlign: "right" as const,
  },

  emph: {
    fontWeight: t.font.weight.medium,
  },

  description: {
    fontStyle: "italic" as const,
    fontSize: t.font.size * 0.9,
    paddingRight: t.x.mg * 2.5,
  },

  url: {
    fontStyle: "normal" as const,
    marginBottom: t.font.size * .4,
  },

  sidebanner: {
    backgroundColor: t.c.bg2,
    height: 842,
    width: t.x.aside,
    zIndex: 9,
    position: "absolute" as const,
    top: 0,
    left: 0,
  },

  colorTree: {
    marginLeft: 100,
  },

  treeItem: {
    risk: treeItem(0),
    element: treeItem(1),
    metric: treeItem(2),
    colorBox: {
      height: "100%",
      aspectRatio: "1 / 1",
    },
  },

  elementPage: {
    paddingTop: t.x.mg * 2,
    paddingBottom: t.x.mg * 2,

    heading: {
      backgroundColor: t.c.bg3,
      minHeight: 80,
      padding: t.x.mg / 2,
      margin: t.x.mg / 2,
      marginBottom: 0,
      marginTop: t.x.mg * -1.5,
      position: "relative" as const,
      display: "flex" as const,
      flexDirection: "row" as const,
    },

    headingColorBox: {
      width: t.x.aside - t.x.mg * 2,
      alignSelf: "stretch" as const,
      flexShrink: 0,
    },

    headingContent: {
      paddingTop: t.x.mg * 1.5,
      paddingBottom: t.x.mg * 0.5,
      marginLeft: t.x.mg * 2,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },

    section: {
      marginLeft: t.x.aside,
      paddingTop: t.x.mg,
      paddingHorizontal: t.x.mg,
      position: "relative" as const,
      minHeight: t.x.aside,
    },

    colorBox: {
      height: t.x.aside - 2*t.x.mg,
      aspectRatio: "1 / 1",
      position: "absolute" as const,
      top: t.x.mg,
      left: -t.x.aside + t.x.mg,
    },

    titleBox: {
      display: "flex" as const,
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
    },
  },

});

// Triggers vite HMR updates in dev mode
export const reportStylesRevision = Date.now();