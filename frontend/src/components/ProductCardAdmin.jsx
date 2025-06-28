import React from 'react';
import { MdOutlineEdit, MdOutlineDelete } from 'react-icons/md';

const ProductCardAdmin = ({ data, onEdit, onDelete }) => {
  const { name, image, price, discount, unit } = data;

  const discountedPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;

  return (
    <div className="lg:w-36 w-40 h-[290px] bg-white rounded shadow-md flex flex-col justify-between overflow-hidden">
      <div className="w-full h-40 bg-gray-50 flex items-center justify-center">
        <img
          src={image?.[0]}
          alt={name}
          className="h-full w-full object-contain p-2"
        />
      </div>

      <div className="px-2 py-1 text-sm">
        <p
          className="font-medium truncate text-black"
          title={name}
        >
          {name}
        </p>
        <p className="text-gray-600 text-xs">Unit: {unit}</p>

        {discount ? (
          <div className="flex gap-1 items-center">
            <p className="text-green-600 font-semibold">₹{discountedPrice}</p>
            <p className="line-through text-xs text-gray-500">₹{price}</p>
          </div>
        ) : (
          <p className="text-green-600 font-semibold">₹{price}</p>
        )}
      </div>

      <div className="flex justify-between items-center px-6 pt-0 pb-3">
        <button
          onClick={onEdit}
          className="p-1 bg-green-200 hover:bg-green-300 rounded cursor-pointer"
        >
          <MdOutlineEdit size={20} />
        </button>
        <button
          onClick={onDelete}
          className="p-1 bg-red-200 hover:bg-red-300 rounded cursor-pointer"
        >
          <MdOutlineDelete size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductCardAdmin;
