import { PixelRatio } from "react-native";

/**
 * Small responsive helpers.
 * - scale(size, screenWidth, guidelineBaseWidth)
 * - vScale(size, screenHeight, guidelineBaseHeight)
 * - normalizeFont(size, screenWidth, screenHeight)
 *
 * Use these to compute sizes inside components when you have the current width/height.
 */

const guidelineBaseWidth = 375; // iPhone 6 width
const guidelineBaseHeight = 812; // iPhone 6 height

export const scale = (
  size: number,
  screenWidth: number,
  baseWidth = guidelineBaseWidth,
) => (screenWidth / baseWidth) * size;

export const vScale = (
  size: number,
  screenHeight: number,
  baseHeight = guidelineBaseHeight,
) => (screenHeight / baseHeight) * size;

// normalize font to nearest pixel and respect system font scale (accessibility)

export const normalizeFont = (
  size: number,
  screenWidth: number,
  screenHeight: number,
) => {
  const scaled = scale(size, screenWidth);
  const fonstScale = PixelRatio.getFontScale ? PixelRatio.getFontScale() : 1;
  const rounded = PixelRatio.roundToNearestPixel(scaled);
  return Math.round(rounded / fonstScale);
};

export default {
  scale,
  vScale,
  normalizeFont,
};
