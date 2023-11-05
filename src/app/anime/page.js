"use client" // This is a client component

import { useSearchParams } from 'next/navigation'
import NotFound from "@/app/not-found";
import Navbar from "@/components/Navbar";
import VideoPlayer from "@/components/VideoPlayer";
import Image from "next/image";
import { HiStar } from 'react-icons/hi';

const animeName = async() => {
  const searchParams = useSearchParams()
  const q = searchParams.get('q')
  const responseAnimeById = await fetch(`${process.env.API_URL}/anime/${q}/full`);
  const animeByIdJson = await responseAnimeById.json();
  if (animeByIdJson.status) {
    return (
      <NotFound/>
    )
  } else {
      const animeByIdData = animeByIdJson.data;
      return (
      <>
        <Navbar params={'/anime'}/>
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center md:w-5/6 gap-8 p-8">
            <h1 className="text-xl font-extrabold">{animeByIdData.title}</h1>
            <div className="grid lg:grid-cols-2 lg:items-center justify-items-center gap-4">
              <div>
                <Image
                  alt={animeByIdData.images.webp.large_image_url}
                  src={animeByIdData.images.webp.large_image_url}
                  width={500}
                  height={500}
                />
              </div>
              <div className="flex flex-col h-full justify-center gap-4">
                <div className="grid grid-cols-3 h-36">
                  <div className="border flex flex-col justify-center items-center">
                    <div className="md:text-xl text-sm">SCORE</div>
                    <div className="flex flex-row md:text-xl text-sm"><HiStar /> {animeByIdData.score}</div>
                  </div>
                  <div className="border flex flex-col justify-center items-center">
                    <div className="md:text-xl text-sm">RANK</div>
                    <div className="flex flex-row md:text-xl text-sm">#{animeByIdData.rank}</div>
                  </div>
                  <div className="border flex flex-col justify-center items-center">
                    <div className="md:text-xl text-sm">POPULARITY</div>
                    <div className="flex flex-row md:text-xl text-sm">#{animeByIdData.popularity}</div>
                  </div>
                </div>
                <p className="text-justify">{animeByIdData.synopsis}</p>
              </div>
            </div>
            {/* <div className="">
              <VideoPlayer id={animeByIdData.trailer.youtube_id}/>
            </div> */}
          </div>
        </div>
      </>
    )
  }
}

export default animeName;