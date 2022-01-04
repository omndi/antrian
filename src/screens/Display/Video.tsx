import React from 'react'

interface Props {
  className: string
  file: string
}

const Video = React.forwardRef<HTMLVideoElement, Props>(({file, ...props}, ref) => {
  return (
    <video
      autoPlay
      muted={false}
      {...props}
      ref={ref}
      src={`${process.env.PUBLIC_URL}/videos/${file}.mp4`}
    />
  )
})
export default Video