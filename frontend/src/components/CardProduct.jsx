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

            <h4 className="text-sm font-semibold mt-2 truncate">10 Min</h4>
            <h3 className="text-sm font-semibold mt-2 truncate">{name}</h3>

            <div className="mt-1">
                <div className="flex items-center gap-2">
                    <span className="text-green-600 font-medium">₹{Math.round(discountedPrice)}</span>
                    {discount > 0 && (
                        <span className="text-sm line-through text-gray-500">₹{Math.round(price)}</span>
                    )}
                </div>
                <p className="text-xs text-gray-600">{unit}</p>
            </div>

            <div className="flex items-center justify-between gap-2 mt-3">
                <button className="bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-700 w-full">
                    Add to Cart
                </button>
                <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700 w-full">
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default CardProduct;
