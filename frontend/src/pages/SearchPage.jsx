import React, { useState } from 'react'
import SearchSkeleton from '../Skeleton/SearchSkeleton'

const SearchPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const loadingCard = new Array(12).fill(null)
  return (
    <section className='bg-white lg:min-h-[79vh]  md:min-h-[81vh] min-h-[78vh]'>
      <div className=' mx-auto p-4 md:px-6'>
        <p className='font-semibold'>Search Results: {data.length}</p>
        <div className='py-4 grid grid-cols-2 place-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-c gap-5'>
          {
            !loading && (
              loadingCard.map((_, i) => {
                return (
                  <SearchSkeleton key={i} />
                )
              })
            )
          }

        </div>
      </div>
    </section>
  )
}

export default SearchPage
