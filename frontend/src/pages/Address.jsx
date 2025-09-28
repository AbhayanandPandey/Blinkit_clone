import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGlobal } from "../provider/GlobalProvider";
import AddAddress from "./AddAddress";
import { MdEdit, MdDelete } from "react-icons/md";
import ConfirmDelete from "../components/ConfirmDelete";
import toast from "react-hot-toast";
import EditAddress from "../components/EditAddress";
import Axios from "../utils/Axios";
import Api from "../config/Api";
import AxiosToastError from "../utils/AxiosToastError";

const Address = () => {
  const dispatch = useDispatch();
  const { fetchAddress } = useGlobal();
  const { addressList } = useSelector((state) => state.addresses);

  const [openAddress, setOpenAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({});
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
    if (!deleteData?._id) return;

    try {
      setLoading(true);
      const response = await Axios({
        ...Api.deleteAddress,
        data: { _id: deleteData._id },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await loadAddresses();
      } else {
        toast.error(response.data.message || "Failed to delete");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
      setOpenDelete(false);
      setDeleteData(null);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, [dispatch]);

  return (
    <section>
      <div className="p-2 pl-8 bg-white shadow-md flex items-center justify-between pr-8">
        <h2 className="font-semibold text-lg">My Addresses</h2>
        <button
          onClick={() => setOpenAddress(true)}
          className="text-sm hover:bg-blue-600 hover:text-white cursor-pointer px-3 py-1 rounded shadow border border-neutral-200"
        >
          Add Address
        </button>
      </div>

      <div className="bg-white min-h-fit py-8 pb-4 px-1 sm:px-1 mt-2 lg:px-12">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl xs:p-6 py-6">
          <div className="grid gap-4">
            {addressList && addressList.length > 0 ? (
              addressList.map((a) => (
                <div
                  key={a._id}
                  className="shadow-md rounded-xl bg-white px-5 py-4 border border-gray-200 hover:border-blue-100 hover:shadow-lg transition-all flex gap-2 justify-between"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {a.address_line}
                    </p>
                    <p className="text-gray-600">
                      {a.city}, {a.state}
                    </p>
                    <p className="text-gray-600">
                      {a.country} - {a.pincode}
                    </p>
                    <p className="text-sm text-gray-500">Mobile: {a.mobile}</p>
                  </div>

                  <div className="flex flex-col justify-between">
                    <button
                      className="cursor-pointer bg-green-400 text-white hover:bg-green-500 rounded p-2"
                      onClick={() => {
                        setOpenEdit(true);
                        setEditData(a);
                      }}
                    >
                      <MdEdit size={20} />
                    </button>

                    <button
                      className="cursor-pointer text-white bg-red-400 hover:bg-red-500 rounded p-2"
                      onClick={() => {
                        setOpenDelete(true);
                        setDeleteData(a);
                      }}
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No addresses found.</p>
            )}
          </div>
        </div>
      </div>

      {openAddress && (
        <AddAddress
          close={() => {
            setOpenAddress(false);
            loadAddresses();
          }}
        />
      )}

      {openEdit && (
        <EditAddress
          close={() => setOpenEdit(false)}
          data={editData}
        />
      )}

      {openDelete && (
        <ConfirmDelete
          close={() => setOpenDelete(false)}
          cancle={() => setOpenDelete(false)}
          confirm={handleDeleteAddress}
        />
      )}
    </section>
  );
};

export default Address;
