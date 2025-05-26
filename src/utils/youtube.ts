export const extractYouTubeId = (url: string): string => {
  const regex = /https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
};
