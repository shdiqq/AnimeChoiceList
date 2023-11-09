"use client" // This is a client component
import React, { useState } from 'react'
import YouTube from 'react-youtube'

const VideoPlayer = ({id}) => {  
  const option = {
    width: "100%",
    height: "100%"
  }

  return (
    <div className=''>
      <YouTube
        className='lg:h-112 h-64'
        videoId={id}
        opts={option}
        onReady={(event) => event.target.pauseVideo()}
      />
    </div>
  )
}

export default VideoPlayer