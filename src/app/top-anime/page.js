"use client" // This is a client component

import React, { useState, useEffect } from 'react'
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import Loading from '../loading';

const TopAnime = ({params}) => {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [dataTopAnime, setDataTopAnime] = useState(null)
  const [paginationTopAnime, setPaginationTopAnime] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async() => {
    const response = await fetch(`${process.env.API_URL}/top/anime?page=${page}${filter === '' ? '' : `&filter=${filter}`}`);
    const responseJson = await response.json();
    setDataTopAnime(responseJson.data)
    setPaginationTopAnime(responseJson.pagination)
    setLoading(false)
  }

  const typeButton = () => {
    setIsOpen(!isOpen)
  }

  const airingButton = () => {
    if (filter === 'airing') {
      setIsOpen(false)
      return
    }
    setFilter('airing')
    setLoading(true)
  }

  const upComingButton = () => {
    if (filter === 'upcoming') {
      setIsOpen(false)
      return
    }
    setFilter('upcoming')
    setLoading(true)
  }

  const byPopularityButton = () => {
    if (filter === 'bypopularity') {
      setIsOpen(false)
      return
    }
    setFilter('bypopularity')
    setLoading(true)
  }

  const favoriteButton = () => {
    if (filter === 'favorite') {
      setIsOpen(false)
      return
    }
    setFilter('favorite')
    setLoading(true)
  }

  useEffect(() => {
    fetchData()
    setIsOpen(false)
  }, [page, filter])

  if (loading) return (<Loading/>)

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col md:w-5/6 gap-4 p-8">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <span className="text-red-500 md:text-4xl/none text-2xl/none">|</span>
              <span className=" md:text-3xl/none text-xl/none">Top Anime</span>
            </div>
            <div className='relative'>
              <button className="flex items-center justify-between w-full text-gray-400 hover:text-white focus:text-white border-gray-700 hover:bg-gray-700 md:hover:bg-transparent" onClick={typeButton}>Type<svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
              </button>
              <div className={` ${isOpen ? '' : 'hidden'} absolute z-20 right-0 mt-2.5 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                  <li>
                    <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full" onClick={airingButton}>Airing</button>
                  </li>
                  <li>
                    <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full" onClick={upComingButton}>Up Coming</button>
                  </li>
                  <li>
                    <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full" onClick={byPopularityButton}>By Popularity</button>
                  </li>
                  <li>
                    <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full" onClick={favoriteButton}>Favorite</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-4">
            {dataTopAnime.map((data, i) => {
              return (
                <div key={`${data.mal_id}-${i}`}>
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