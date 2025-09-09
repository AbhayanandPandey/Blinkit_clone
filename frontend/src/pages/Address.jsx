import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGlobal } from "../provider/GlobalProvider";
import AddAddress from "./AddAddress";

const Address = () => {
  const dispatch = useDispatch();
  const { fetchAddress } = useGlobal();
  const { addressList } = useSelector((state) => state.addresses);
  const [openAddress, setOpenAddress] = useState(false);

  useEffect(() => {
    fetchAddress();
  }, [dispatch, fetchAddress]);

  return (
    <section className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Addresses</h2>

        <div className="grid gap-4">
          {addressList && addressList.length > 0 ? (
            addressList.map((a) => (
              <div
                key={a._id}
                className="shadow-md rounded-xl bg-white px-5 py-4 border border-gray-200 
                          hover:border-blue-100 hover:shadow-lg transition-all cursor-pointer"
              >
                <p className="font-semibold text-gray-800">{a.address_line}</p>
                <p className="text-gray-600">
                  {a.city}, {a.state}
                </p>
                <p className="text-gray-600">
                  {a.country} - {a.pincode}
                </p>
                <p className="text-sm text-gray-500">Mobile: {a.mobile}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No addresses found. Add one below 👇</p>
          )}
        </div>

        <div
          onClick={() => setOpenAddress(true)}
          className="h-16 mt-6 border-2 border-dashed border-gray-300 rounded-xl 
                     flex justify-center items-center cursor-pointer 
                     hover:border-blue-500 transition"
        >
          <span className="text-blue-600 font-medium">+ Add Address</span>
        </div>
      </div>

      {openAddress && (
        <AddAddress
          close={() => {
            setOpenAddress(false);
            fetchAddress(); 
          }}
        />
      )}
    </section>
  );
};

export default Address;
