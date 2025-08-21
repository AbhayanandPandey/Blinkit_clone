// src/components/ViewImage.jsx
import React from 'react'
import { IoClose } from 'react-icons/io5'

const ViewImage = ({ url, close }) => {
  return (
    <section className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative max-w-5xl w-full flex justify-center items-center">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-white bg-black/40 rounded-full p-2 hover:bg-black/70 transition"
        >
          <IoClose size={28} />
        </button>

        <img
          src={url}
          alt="fullscreen"
          className="w-full h-auto max-h-[85vh] object-scale-down bg-none rounded-lg"
        />
      </div>
    </section>
  )
}

export default ViewImage
