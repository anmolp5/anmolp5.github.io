export const isMediaVideo = (src) => {
  return Boolean(src && typeof src === 'string' && src.match(/\.(mp4|webm|mov|m4v|ogv)($|\?)/i));
};
