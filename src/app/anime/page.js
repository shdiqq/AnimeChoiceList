"use client" // This is a client component

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import NotFound from "@/app/not-found";
import VideoPlayer from "@/components/VideoPlayer";
import Image from "next/image";
import { HiStar } from 'react-icons/hi';
import Loading from '../loading';

const animeName = () => {
  const searchParams = useSearchParams()
  const q = searchParams.get('q')
  const [dataAnimeById, setDataAnimeById] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async() => {
    const response = await fetch(`${process.env.API_URL}/anime/${q}/full`)
    const responseJson = await response.json();
    setDataAnimeById(responseJson)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return (<Loading/>)
  if (dataAnimeById.status && !loading) return (<NotFound/>)

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center md:w-5/6 md:gap-8 md:p-8 gap-4 p-4">
          <h1 className="text-xl font-extrabold">{dataAnimeById.data.title}</h1>
          <div className="grid lg:grid-cols-2 justify-items-center items-center gap-4">
            <div className='h-fit'>
              <Image
                alt={dataAnimeById.data.images.webp.large_image_url}
                src={dataAnimeById.data.images.webp.large_image_url}
                width={420}
                height={600}
              />
            </div>
            <div className="flex flex-col h-full justify-between lg:gap-16 gap-8">
              <div className="grid grid-cols-3 lg:h-full h-24">
                <div className="border flex flex-col justify-center items-center p-4">
                  <div className="sm:text-xl text-base">SCORE</div>
                  <div className="flex flex-row sm:text-xl text-base"><HiStar /> {dataAnimeById.data.score}</div>
                </div>
                <div className="border flex flex-col justify-center items-center p-4">
                  <div className="sm:text-xl text-sm">RANK</div>
                  <div className="flex flex-row sm:text-xl text-base">#{dataAnimeById.data.rank}</div>
                </div>
                <div className="border flex flex-col justify-center items-center p-4">
                  <div className="sm:text-xl text-sm">POPULARITY</div>
                  <div className="flex flex-row sm:text-xl text-base">#{dataAnimeById.data.popularity}</div>
                </div>
              </div>
              <p className="text-justify">{dataAnimeById.data.synopsis}</p>
              <div className="grid grid-cols-3 lg:h-full h-24">
                <div className="border flex flex-col justify-center items-center p-4">
                  <div className="sm:text-xl text-base">YEAR</div>
                  <div className="flex flex-row sm:text-xl text-base">{dataAnimeById.data.year}</div>
                </div>
                <div className="border flex flex-col justify-center items-center p-4">
                  <div className="sm:text-xl text-base">SEASON</div>
                  <div className="flex flex-row sm:text-xl text-base">{dataAnimeById.data.season}</div>
                </div>
                <div className="border flex flex-col justify-center items-center p-4">
                  <div className="sm:text-xl text-base">EPISODE</div>
                  <div className="flex flex-row sm:text-xl text-base">{dataAnimeById.data.episodes}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-5/6 w-full">
            <VideoPlayer id={dataAnimeById.data.trailer.youtube_id}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default animeName;