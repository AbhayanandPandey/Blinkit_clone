import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGlobal } from "../provider/GlobalProvider";
import Divider from "../components/Divider";
import AddAddress from "./AddAddress";
import EditAddress from "../components/EditAddress";
import ConfirmDelete from "../components/ConfirmDelete";
import { MdEdit, MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import Api from "../config/Api";
import AxiosToastError from "../utils/AxiosToastError";

const CheckOutPage = () => {
  const { notDiscountPrice, totoalPrice, fetchAddress } = useGlobal();
  const cartItems = useSelector((state) => state.cartItem.cartProducts);

  const couponDiscount = 0;
  const finalPrice = Math.max(totoalPrice - couponDiscount, 0);

  const getServiceChargeRate = (price) => {
    if (price <= 200) return 0.085;
    if (price > 200 && price <= 400) return 0.07;
    if (price > 400 && price <= 1000) return 0.06;
    return 0.01;
  };

  const [selectedAddress, setSelectedAddress] = useState(0);
  const addressList = useSelector((state) => state.addresses.addressList);

  const [openAddress, setOpenAddress] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [loading, setLoading] = useState(false);

  const serviceCharge = finalPrice * getServiceChargeRate(finalPrice);
  const grandTotal = finalPrice + serviceCharge;

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
        await fetchAddress();
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

  return (
    <section className="bg-white min-h-screen lg:py-8 px-4 sm:px-6 lg:px-12 pb-4">
      <div className="max-w-8xl mx-auto lg:flex lg:gap-15 justify-between w-full">

        <div className="lg:w-[60%] bg-white  rounded-2xl lg:p-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Choose your address
          </h3>

          <div className="mt-4 grid gap-4">
            {addressList.map((a, i) => {
              return (
                <label htmlFor={"address" + i} key={a._id || i}>
                  <div
                    className={`shadow-md rounded-xl px-5 py-4 border flex gap-3 cursor-pointer transition-all 
        ${selectedAddress == i
                        ? "bg-blue-50 border-blue-400 shadow-lg"
                        : "bg-white border-gray-200 hover:border-blue-100 hover:shadow-lg"}`}
                  >
                    <div>
                      <input
                        type="radio"
                        id={"address" + i}
                        value={i}
                        checked={selectedAddress == i}
                        onChange={(e) => setSelectedAddress(Number(e.target.value))}
                        name="address"
                        className="accent-blue-600 cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-between w-full">
                      <div>
                        <p className="font-semibold text-gray-800">{a.address_line}</p>
                        <p className="text-gray-600">
                          {a.city}, {a.state}
                        </p>
                        <p className="text-gray-600">
                          {a.country} - {a.pincode}
                        </p>
                        <p className="text-sm text-gray-500">Mobile: {a.mobile}</p>
                      </div>

                      <div className="flex flex-col justify-between gap-2">
                        <button
                          className="cursor-pointer bg-green-400 text-white hover:bg-green-500 rounded p-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenEdit(true);
                            setEditData(a);
                          }}
                        >
                          <MdEdit size={16} />
                        </button>

                        <button
                          className="cursor-pointer text-white bg-red-400 hover:bg-red-500 rounded p-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDelete(true);
                            setDeleteData(a);
                          }}
                        >
                          <MdDelete size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          <div
            onClick={() => setOpenAddress(true)}
            className="h-16 mt-6 border-2 border-dashed border-gray-300 rounded-xl flex justify-center items-center cursor-pointer hover:border-blue-500 transition"
          >
            <span className="text-blue-600 font-medium">+ Add Address</span>
          </div>
        </div>

        <div className="lg:w-[40%] mt-6 bg-white shadow-lg rounded-2xl p-6 lg:h-fit lg:mt-15">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Total (w/o discount)</span>
              <span className="font-medium">{notDiscountPrice} ₹</span>
            </div>

            <div className="flex justify-between">
              <span>Total Items</span>
              <span className="font-medium">
                {cartItems?.reduce((total, item) => total + item.quantity, 0)} items
              </span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- {(notDiscountPrice - totoalPrice).toFixed(2)} ₹</span>
            </div>

            <div className="flex justify-between text-orange-600">
              <span>Service Charge</span>
              <span>+ {serviceCharge.toFixed(2)} ₹</span>
            </div>

            <div className="flex justify-between text-neutral-600">
              <span>Delivery Charge</span>
              <span className="font-medium text-green-500">Free</span>
            </div>

            <Divider />

            <div className="flex justify-between font-semibold text-lg text-gray-800">
              <span>Final Amount</span>
              <span>{grandTotal.toFixed(2)} ₹</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="w-full sm:w-1/2 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:shadow-lg transition cursor-pointer">
              Online Payment
            </button>
            <button className="w-full sm:w-1/2 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:border-blue-500 hover:text-blue-600 transition cursor-pointer">
              Cash On Delivery
            </button>
          </div>
        </div>
      </div>

      {openAddress && (
        <AddAddress close={() => {
          setOpenAddress(false);
          fetchAddress();
        }} />
      )}

      {openEdit && (
        <EditAddress
          close={() => {
            setOpenEdit(false);
            fetchAddress();
          }}
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

export default CheckOutPage;
