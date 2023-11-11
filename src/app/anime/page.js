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
  const [dataAnimeCharacter, setDataAnimeCharacter] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async() => {
    const response = await fetch(`${process.env.API_URL}/anime/${q}/full`)
    const responseCharacter = await fetch(`${process.env.API_URL}/anime/${q}/characters`)
    const responseJson = await response.json()
    const responseCharacterJson = await responseCharacter.json()
    setDataAnimeById(responseJson)
    setDataAnimeCharacter(responseCharacterJson)
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
          <div className='flex flex-col w-full items-center gap-4'>
            <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-center font-extrabold">{dataAnimeById.data.title}</h1>
            <div className={`grid grid-cols-${dataAnimeById.data.genres.length}`}>
              {
                dataAnimeById.data.genres.map((genre,index) => (
                  <p key={index} className=' flex-1 text-center md:text-base sm:text-sm text-xs'>{genre.name}</p>
                ))
              }
            </div>
          </div>
          <div className="grid lg:grid-cols-2 justify-items-center items-center gap-4">
            <div className=' lg:w-fit w-1/2'>
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
                  <div className="flex flex-row sm:text-xl text-base items-center"><HiStar /> {dataAnimeById.data.score}</div>
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
              <p className="text-justify lg:text-lg md:text-base text-sm">{dataAnimeById.data.synopsis}</p>
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
          <div className="w-full flex flex-col gap-4">
            <h1 className='text-3xl'>Trailer</h1>
            <VideoPlayer id={dataAnimeById.data.trailer.youtube_id}/>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <h1 className='text-3xl'>Character</h1>
            <div className='grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-4'>
              {dataAnimeCharacter.data.map((char, index) => {
                return(
                <div key={index} className='flex flex-col'>
                  <Image className='h-full bg-cover' alt={char.character.images.webp.image_url} src={char.character.images.webp.image_url} width={225} height={350}/>
                  <p className='text-center lg:text-base sm:text-sm text-xs/none'>{char.character.name}</p>
                </div>)
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default animeName;