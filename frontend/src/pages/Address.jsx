import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGlobal } from "../provider/GlobalProvider";
import AddAddress from "./AddAddress";
import NoData from "../components/NoData";
import { MdOutlineEdit, MdOutlineDelete, MdDelete, MdEdit } from "react-icons/md";
import ConfirmDelete from "../components/ConfirmDelete";
import toast from "react-hot-toast";

const Address = () => {
  const dispatch = useDispatch();
  const { fetchAddress } = useGlobal();
  const { addressList } = useSelector((state) => state.addresses);

  const [openAddress, setOpenAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      await fetchAddress();
    } catch (error) {
      toast.error("Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async () => {
    try {
      setLoading(true);
      toast.success("Address deleted successfully");
      await loadAddresses();
      setOpenDelete(false);
      setDeleteData(null);
    } catch (error) {
      toast.error("Failed to delete address");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, [dispatch]);

  return (
    <section className="">
      {/* Header */}
      <div className="p-2 pl-8 bg-white shadow-md flex items-center justify-between pr-8">
        <h2 className="font-semibold text-lg">My Addresses</h2>
        <button
          onClick={() => setOpenAddress(true)}
          className="text-sm hover:bg-blue-600 hover:text-white cursor-pointer px-3 py-1 rounded shadow border border-neutral-200"
        >
          Add Address
        </button>
      </div>

      <div className="bg-white min-h-screen py-8 px-4 sm:px-6 mt-2 lg:px-12">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl  p-6">
          <div className="grid gap-4">
            {addressList && addressList.length > 0 ?
              (
                addressList.map((a) => (
                  <div key={a._id} className="shadow-md rounded-xl bg-white px-5 py-4 border border-gray-200 hover:border-blue-100 hover:shadow-lg transition-all flex gap-2 justify-between" >

                    <div>
                      <p className="font-semibold text-gray-800">
                        {a.address_line}
                      </p>
                      <p className="text-gray-600"> {a.city}, {a.state} </p> <p className="text-gray-600"> {a.country} - {a.pincode} </p>
                      <p className="text-sm text-gray-500">Mobile: {a.mobile}</p>
                    </div>
                    <div className="flex flex-col justify-around">
                      <span className="cursor-pointer text-red-500">
                        <MdDelete size={25} />
                      </span>

                      <span className="cursor-pointer text-green-600">
                        <MdEdit size={25} />
                      </span>
                    </div>
                  </div>))) :
              (<p className="text-gray-500">No addresses found.</p>)} </div> </div> </div>

      {openAddress && (
        <AddAddress
          close={() => {
            setOpenAddress(false);
            loadAddresses();
          }}
        />
      )}

    </section>
  );
};

export default Address;
