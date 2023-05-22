import { round } from './numbers';

const STYLES_ROOT_FONT_SIZE_PX = 16;

export const px2rem = (px: number) =>
  `${round(px / STYLES_ROOT_FONT_SIZE_PX, 4)}rem`;
