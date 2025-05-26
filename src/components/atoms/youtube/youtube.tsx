import React from 'react';

type YoutubeProps = {
  url: string;
};

export const Youtube: React.FC<YoutubeProps> = ({ url }) => {
  if (!url) return null;

  return (
    <div className="w-full aspect-video max-h-[80vh] rounded overflow-hidden">
      <iframe
        src={url}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full max-w-[calc(100vw - 32px)]"
      />
    </div>
  );
};
