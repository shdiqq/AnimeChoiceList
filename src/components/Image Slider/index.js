"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs"
import {RxDotFilled} from 'react-icons/rx'
import {AiOutlineInfoCircle} from 'react-icons/ai'

const ImageSlider = ({data}) => {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === data.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  const moreInfoBehavior = () => {
    router.push(`/anime?q=${data[currentIndex].mal_id}`)
  }

  return (
    <div className="h-[calc(100vh-200px)] w-full relative">
      <div style={{ backgroundImage: `url(${data[currentIndex].trailer.images.maximum_image_url})` }} className='w-full h-full bg-center bg-cover duration-700 lg:opacity-50 opacity-25'></div>
      <button onClick={prevSlide} className="absolute z-10 top-[90%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-4 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft size={30}/>
      </button>
      <button onClick={nextSlide} className="absolute z-10 top-[90%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-4 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight size={30}/>
      </button>
      <div className='flex top-4 justify-center py-2'>
        {data.map((slide, slideIndex) => (
          <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className='text-2xl cursor-pointer'><RxDotFilled/></div>
        ))}
      </div>
      <div className="absolute top-0 left-0 lg:w-[calc(40%)] w-full h-full flex flex-col justify-center gap-8 lg:p-8 p-4">
        <h1 className="text-white md:text-4xl lg:text-5xl text-xl lg:text-left text-center font-bold drop-shadow-xl">{data[currentIndex].title}</h1>
        <p className="text-white text-justify text-xs md:text-base drop-shadow-xl">{data[currentIndex].synopsis.split('. ').slice(0, 2).join('. ')}.</p>
        <button onClick={moreInfoBehavior} className='bg-white text-white bg-opacity-30 rounded-md w-fit md:p-4 p-2 lg:text-lg md:text-base text-xs font-semibold flex flex-row items-center hover:bg-opacity-20 transition'><AiOutlineInfoCircle className="mr-1"/>More Info</button>
      </div>
    </div>
  )
}

export default ImageSlider