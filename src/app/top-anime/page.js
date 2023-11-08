"use client" // This is a client component

import React, { useState, useEffect } from 'react'
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import Loading from '../loading';

const TopAnime = ({params}) => {
  const [page, setPage] = useState(1)
  const [dataTopAnime, setDataTopAnime] = useState(null)
  const [paginationTopAnime, setPaginationTopAnime] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async() => {
    const response = await fetch(`${process.env.API_URL}/top/anime?page=${page}`);
    const responseJson = await response.json();
    setDataTopAnime(responseJson.data)
    setPaginationTopAnime(responseJson.pagination)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [page])

  if (loading) return (<Loading/>)

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col md:w-5/6 gap-4 p-8">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <span className="text-red-500 md:text-4xl text-2xl">|</span>
              <span className="md:text-2xl text-xl">Top Anime</span>
            </div>
          </div>
          <div className="w-full grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            {dataTopAnime.map((data) => {
              return (
                <div key={data.mal_id}>
                  <Card data={data}/>
                </div>
              )
            })}
          </div>
          <div className='w-full flex items-center justify-center'>
            <Pagination params="/top-anime" data={paginationTopAnime} setPage={setPage}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default TopAnime;