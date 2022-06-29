import React, {useEffect} from 'react'
import * as cld from "cloudinary-video-player";
import "cloudinary-video-player/dist/cld-video-player.light.min";
import "cloudinary-video-player/dist/cld-video-player.light.min.css";

const domId = 'video-player'
// https://stackoverflow.com/a/38641281/1586406
const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
const localeCompare = (a, b) => collator.compare(a.publicId, b.publicId) 

const Video = React.forwardRef(({file, ...props}, ref) => {
  const videoPlayerInit = () => {
    const player = cld.videoPlayer(domId, {
      cloud_name: process.env.REACT_APP_CD_CLOUDNAME,
    });
    player.transformation({quality: 'auto'})

    player
      .playlistByTag(process.env.REACT_APP_CD_PLAYLIST_TAG, {
        autoAdvance: true,
        repeat: true,
        sorter: localeCompare,
      })
  };

  useEffect(() => {
    videoPlayerInit()
  }, []);

  return (
    <video
      {...props}
      ref={ref}
      className={`cld-video-player ${props.className}`}
      id={domId}
      muted={false}
      controls
      autoPlay
    />
  )
})

export default Video
