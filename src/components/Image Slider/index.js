"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react'
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs"
import {RxDotFilled} from 'react-icons/rx'
import {AiOutlineInfoCircle} from 'react-icons/ai'

const ImageSlider = ({data}) => {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const timerRef = useRef(null)

  const prevSlide = () => {
    clearInterval(timerRef.current);
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    clearInterval(timerRef.current);
    const isLastSlide = currentIndex === data.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex) => {
    clearInterval(timerRef.current);
    setCurrentIndex(slideIndex)
  }

  const moreInfoBehavior = () => {
    router.push(`/anime?q=${data[currentIndex].mal_id}`)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [currentIndex, data]);

  return (
    <div className="md:h-[calc(80vh)] h-[calc(75vh)] w-full relative">
      <div style={{ backgroundImage: `url(${data[currentIndex].trailer.images.maximum_image_url})` }} className='w-full h-full bg-center bg-cover duration-500 transition-all opacity-40'></div>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center md:gap-8 gap-4 lg:p-8 p-4">
        <h1 className="text-white sm:text-3xl md:text-4xl lg:text-5xl text-2xl lg:text-left text-center font-bold drop-shadow-xl">{data[currentIndex].title}</h1>
        <p className="lg:w-[calc(40%)] w-full text-white text-justify lg:text-lg md:text-base text-xs drop-shadow-xl">{data[currentIndex].synopsis.split('.').slice(0, 2).join('.')}.</p>
        <button onClick={moreInfoBehavior} className='bg-white text-white bg-opacity-30 rounded-md w-fit lg:p-4 md:p-3 p-2 lg:text-base md:text-sm text-xs font-medium flex flex-row items-center gap-2 hover:bg-opacity-10 transition'><AiOutlineInfoCircle/>More Info</button>
      </div>
      <button onClick={prevSlide} className="absolute z-10 top-[90%] -translate-x-0 translate-y-[-50%] left-[5%] lg:text-7xl md:text-5xl text-3xl rounded-full p-4 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft/>
      </button>
      <button onClick={nextSlide} className="absolute z-10 top-[90%] -translate-x-0 translate-y-[-50%] right-[5%] lg:text-7xl md:text-5xl text-3xl rounded-full p-4 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight/>
      </button>
      <div className='flex top-4 justify-center py-2'>
        {data.map((slide, slideIndex) => (
          <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className='text-2xl cursor-pointer'>{slideIndex === currentIndex ? <RxDotFilled className=' text-cyan-400'/> : <RxDotFilled/>}</div>
        ))}
      </div>
    </div>
  )
}

export default ImageSlider