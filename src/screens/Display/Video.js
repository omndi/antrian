import React, {useEffect} from 'react'
import * as cld from "cloudinary-video-player";
import "cloudinary-video-player/dist/cld-video-player.light.min";
import "cloudinary-video-player/dist/cld-video-player.light.min.css";

const domId = 'video-player'
const alphabetical = (a, b) => {
  const nameA = a.publicId.toUpperCase()
  const nameB = b.publicId.toUpperCase()
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1
  return 0
}

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
        sorter: alphabetical,
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
