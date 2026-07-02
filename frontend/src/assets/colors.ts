
const thesisScale = [
  '#fff5f0',
  '#fcbba1',
  '#fb6a4a',
  '#cb181d',
  '#67000d'
]

const orangeScale = [
  '#f7ded0',
  '#f5b490',
  '#ec844c',
  '#e35205',
  '#a63d05'
]

import { viewMode } from '../hooks/getUrlParams.ts';
export const defaultRiskColors = viewMode && viewMode === "embedded" ? orangeScale : thesisScale;