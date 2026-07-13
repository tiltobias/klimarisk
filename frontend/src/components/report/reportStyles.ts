import { StyleSheet } from "@react-pdf/renderer";
import { reportTheme as t } from "./reportTheme";

export const reportStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: t.font.body,
    fontWeight: t.font.weight.normal,
    color: t.c.text,
    fontSize: 10,
    backgroundColor: t.c.bg1,
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
});

export const reportStylesRevision = Date.now();