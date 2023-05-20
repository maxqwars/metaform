export type YouTubeEmbedVideo = {
  id?: number;
  title?: string;
  image?: string;
  preview?: {
    src?: string;
    thumbnail?: string;
  };
  youtubeId?: string;
  comments?: number;
  views?: number;
  timestamp?: number;
};
