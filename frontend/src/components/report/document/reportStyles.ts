import { StyleSheet } from "@react-pdf/renderer";
import { reportTheme as t } from "./reportTheme";


const treeItem = (level: number) => ({
  fontSize: 10 * [1.6, 1.2, 1][level],
  height: 22 * [1.6, 1.2, 1][level],

  backgroundColor: t.c.bg2,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 5,
  paddingVertical: 3,
  paddingLeft: [5, 35, 65][level],

  
}) as const;


export const reportStyles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: t.font.body,
    fontWeight: t.font.weight.normal,
    color: t.c.text,
    fontSize: 10,
    backgroundColor: t.c.bg1,
  },

  heading: {
    backgroundColor: t.c.bg3,
    width: "100%",
    height: 120,
    padding: "40 40 0 40",
  },

  title: {
    fontFamily: t.font.heading,
    fontWeight: t.font.weight.bold,
    fontSize: 22,
    marginBottom: 16,
  },

  section: {
    marginBottom: 16,
  },

  label: {
    fontWeight: t.font.weight.medium,
  },

  sidebanner: {
    backgroundColor: t.c.bg2,
    height: 942,
    width: 100,
    zIndex: 9,
    position: "absolute",
    top: 0,
    left: 0,
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
});

export const reportStylesRevision = Date.now();