"use client" // This is a client component

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Card from "@/components/Card";
import Loading from '../loading';

const Search = ({params}) => {
  const searchParams = useSearchParams()
  const q = searchParams.get('q')
  const [dataSearchAnime, setDataSearchAnime] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async() => {
    const response = await fetch(`${process.env.API_URL}/anime?q=${q}`);
    const responseJson = await response.json();
    setDataSearchAnime(responseJson.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return (<Loading/>)

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col md:w-5/6 gap-4 p-8">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <span className="text-red-500 md:text-4xl text-2xl">|</span>
              <span className="md:text-2xl text-xl">Search results: {q}</span>
            </div>
          </div>
          <div className="w-full grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            {dataSearchAnime.map((data) => {
              return (
                <div key={data.mal_id}>
                  <Card data={data}/>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Search;