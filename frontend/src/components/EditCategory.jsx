import React from 'react'

const EditCategory = () => {
    return (
        <section className="px-3 lg:px-0 fixed inset-0 bg-neutral-800 bg-opacity-90 z-50 flex items-center justify-center">
            <div className="bg-white rounded max-w-4xl p-5 w-full shadow-lg relative">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-lg">Add New Category</h2>
                    <button onClick={close} className="text-gray-700 hover:text-black transition cursor-pointer">
                        <IoClose size={24} />
                    </button>
                </div>

                <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label htmlFor="categoryName" className="font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="categoryName"
                            value={data.name}
                            placeholder="Enter category name"
                            onChange={handleOnchange}
                            className="bg-blue-50 border border-blue-100 p-2 rounded outline-none focus:ring-2 focus:ring-amber-300"
                            required
                            autoComplete='off'
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="font-medium">Image</label>
                        <div className="flex gap-4 flex-col lg:flex-row items-center">
                            <div className="border bg-blue-50 border-blue-100 h-36 w-full lg:w-36 flex items-center justify-center rounded overflow-hidden">
                                {data.image ? (
                                    <img src={data.image} alt="category" className="w-full h-full object-scale-down" />
                                ) : (
                                    <p className="text-sm text-neutral-500">No image</p>
                                )}
                            </div>

                            <label htmlFor="uploadImage">
                                <div
                                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded font-medium transition ${!data.name || loading.upload || loading.submit
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-amber-400 text-white hover:bg-amber-500 cursor-pointer'
                                        }`}
                                >
                                    {loading.upload && (
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    )}
                                    {loading.upload ? 'Uploading...' : 'Upload Image'}
                                </div>
                                <input
                                    disabled={!data.name || loading.upload || loading.submit}
                                    onChange={handleUplaod}
                                    type="file"
                                    id="uploadImage"
                                    className="hidden"
                                    accept="image/*"
                                />
                            </label>
                        </div>
                    </div>


                    <button
                        type="submit"
                        disabled={!data.name || !data.image || loading.upload || loading.submit}
                        className={`px-5 py-2 rounded text-white font-medium transition cursor-pointer ${data.name && data.image && !loading.upload && !loading.submit
                                ? 'bg-amber-400 hover:bg-amber-500'
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {loading.submit ? 'Submitting...' : 'Add Category'}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default EditCategory
