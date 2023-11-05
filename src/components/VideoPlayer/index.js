"use client" // This is a client component
import React, { useState } from 'react'
import YouTube from 'react-youtube'

const VideoPlayer = ({id}) => {
  const option = {
    width: "600",
    height: "250"
  }

  return (
    <div className=''>
      <YouTube
        className=' w-full aspect-video'
        videoId={id}
        opts={option}
        onReady={(event) => event.target.pauseVideo()}
        onError={() => alert("Video is broken, please try another.")}
      />
    </div>
  )
}

export default VideoPlayer