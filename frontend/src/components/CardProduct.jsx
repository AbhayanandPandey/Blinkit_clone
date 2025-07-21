import React from 'react';

const CardProduct = ({ data }) => {
    const { name, image, price, discount, unit } = data;

    const discountedPrice = discount
        ? (price - price * (discount / 100)).toFixed(2)
        : price;

    return (
        <div className="border border-gray-200 p-3 rounded-lg shadow-sm hover:shadow-md transition-all min-w-46 max-w-52 w-full">
            <div className="w-full h-32 rounded bg-white flex items-center justify-center overflow-hidden">
                <img
                    src={image?.[0] || '/default.jpg'}
                    alt={name}
                    className="h-full object-contain scale-110"
                />
            </div>

            <p className="text-sm text-green-600 rounded w-fit bg-green-100 mt-2 p-2 py-[0.5px]">10 Min</p>

            <h3 className="text-sm font-semibold pt-1 text-ellipsis line-clamp-1">{name}</h3>

            <p className="text-sm w-fit py-1 text-gray-600">{unit}</p>

            <div className="mt-1 ">
                <div className="flex items-center gap-2">
                    <span className="text-green-600 font-medium">₹{Math.round(discountedPrice)}</span>
                    {discount > 0 && (
                        <span className="text-sm line-through text-gray-500">₹{Math.round(price)}</span>
                    )}
                </div>
                <div className=" w-full py-1">
                    <button className='rounded cursor-pointer w-full bg-green-300 p-1 hover:bg-green-400 transition-all'>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardProduct;
