import { StyleSheet } from "@react-pdf/renderer";
import { reportTheme as t } from "./reportTheme";

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

  banner: {
    backgroundColor: t.c.bg3,
    height: 120,
    width: 595,
    zIndex: 8,
    position: "absolute",
    top: 0,
    left: 0,
  },

  sidebanner: {
    backgroundColor: t.c.bg2,
    height: 942,
    width: 100,
    zIndex: 9,
    position: "absolute",
    top: 0,
    left: 0,
  }
});

export const reportStylesRevision = Date.now();