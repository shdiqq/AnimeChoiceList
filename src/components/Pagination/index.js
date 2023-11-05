"use client" // This is a client component
import React, { useState } from 'react'

const Pagination = ({ params, data, setPage }) => {
  const { current_page, last_visible_page, has_next_page } = data
  const [currentPageInput, setCurrentPageInput] = useState('');

  const goToPage = () => {
    const newPage = parseInt(currentPageInput, 10);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= last_visible_page) {
      setPage(newPage)
      setCurrentPageInput('')
    }
  };

  const handleNextPage = () => {
    if (current_page + 1 <= last_visible_page) {
      setPage((prevState) => prevState + 1)
    }
  }

  const handlePrevPage = () => {
    if (current_page - 1 >= 1 ) {
      setPage((prevState) => prevState - 1)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div>
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <button className={`flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg ${current_page === 1 ? 'hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white cursor-default' : 'hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white'}`} onClick={handlePrevPage}>
              <span className="sr-only">Previous</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
            </button>
          </li>
          <li>
            <div className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white`}>
              {current_page}
            </div>
          </li>
          <li>
            <button className={`flex items-center justify-center px-4 h-10 rounded-r-lg leading-tight text-gray-500 bg-white border border-gray-300 ${current_page === last_visible_page ? 'hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white cursor-default' : 'hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white'}`} onClick={handleNextPage}>
              <span className="sr-only">Next</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9 4 5 1 1" />
              </svg>
            </button>
          </li>
        </ul>
      </div>
      <div className="mt-2">
        <input
          type="number"
          min="1"
          max={last_visible_page}
          value={currentPageInput}
          onChange={(e) => setCurrentPageInput(e.target.value)}
          className="w-24 px-2 py-1 border border-gray-300 rounded-md text-gray-700 text-center"
        />
        <button onClick={goToPage} className="px-3 py-1 bg-blue-500 text-white rounded-md ml-2">Go</button>
      </div>
      <div className="mt-2">
        Showing page {current_page} of {last_visible_page} pages
      </div>
    </div>
  );
};

export default Pagination;