import React, {useEffect} from 'react'
import * as cld from "cloudinary-video-player";
import "cloudinary-video-player/dist/cld-video-player.light.min";
import "cloudinary-video-player/dist/cld-video-player.light.min.css";

const CDVideo = React.forwardRef(({file, ...props}, ref) => {
  const videoPlayerInit = () => {
    const player = cld.videoPlayer("video-player", {
      cloud_name: process.env.REACT_APP_CD_CLOUDNAME,
    });

    player
      .playlistByTag(process.env.REACT_APP_CD_PLAYLIST_TAG, {
        autoAdvance: true,
        repeat: true
      })
      .then(function () {
        let list = player
          .playlist()
          .list()
          .map((source) => {
            return source.publicId();
          });
      });
  };

  useEffect(() => {
    videoPlayerInit()
  }, []);

  return (
    <video
      {...props}
      ref={ref}
      className={`cld-video-player ${props.className}`}
      id="video-player"
      muted={false}
      controls
      autoPlay
    />
  )
})

export default CDVideo
