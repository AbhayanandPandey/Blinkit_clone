import React, { useEffect, useState } from 'react'
import SearchSkeleton from '../Skeleton/SearchSkeleton'
import Api from '../config/Api'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import CardProduct from '../components/CardProduct'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import NoDataImage from '../assets/nothing_here_yet.webp'

const SearchPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const loadingCard = new Array(10).fill(null)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const params = useLocation()
  const searchText = params?.search?.slice(3)

  const fetchData = async () => {
    try {
      setLoading(true)

      const response = await Axios({
        ...Api.searchProducts,
        data: {
          search: searchText,
          page:page,
        }
      })

      const { data: responseData } = response
      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData((preve) => {
            return [
              ...preve,
              ...responseData.data
            ]
          })
        }
        setTotalPage(responseData.totalPage)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page,searchText])

  const handleFetch = ()=>{
    if(totalPage>page){
      setPage(preve=> preve+1)
    }
  }
  return (
    <section className='bg-white lg:min-h-[79vh]  md:min-h-[81vh] min-h-[78vh]'>
      <div className=' mx-auto p-4 md:px-6'>
        <p className='font-semibold'>Search Results: {data.length}</p>
        <InfiniteScroll 
          dataLength={data.length}
          hasMore={true}
          next={handleFetch}
        >
        <div className='py-4 grid grid-cols-2 place-items-center md:grid-cols-3  lg:grid-cols-4 grid-c gap-5'>
          
          {
            data.map((p, i) => {
              return (
                <CardProduct data={p} key={p._id + 'searct'} />
              )
            })
          }
          
          {
            loading && (
              loadingCard.map((_, i) => {
                return (
                  <SearchSkeleton key={i} />
                )
              })
            )
          }

        </div>
      </InfiniteScroll>
      {
            !data[0] && !loading && (
              <div className='flex justify-center items-center'>
                <div className=''>
                <img 
                  src={NoDataImage}
                  alt='NoData'
                  className='w-full h-full md:w-90 md:h-80 lg:w-120 lg:h-100'
                />
                <p className='text-center font-semibold'>No Data Found !!!</p>
              </div>
              </div>
            )
          }
    </div>
    </section >
  )
}

export default SearchPage
