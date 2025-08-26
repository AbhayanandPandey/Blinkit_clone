import React from "react";
import { useSelector } from "react-redux";
import { useGlobal } from "../provider/GlobalProvider";
import Divider from "../components/Divider";

const CheckOutPage = () => {
  const { notDiscountPrice, totoalPrice } = useGlobal();
  const cartItems = useSelector((state) => state.cartItem.cartProducts);

  const couponDiscount = 0;
  const finalPrice = Math.max(totoalPrice - couponDiscount, 0);

  const getServiceChargeRate = (price) => {
    if (price <= 200) return 0.085;
    if (price > 200 && price <= 400) return 0.07;
    if (price > 400 && price <= 1000) return 0.06;
    return 0.01;
  };

  const serviceCharge = finalPrice * getServiceChargeRate(finalPrice);
  const grandTotal = finalPrice + serviceCharge;

  return (
    <section className="bg-white min-h-screen lg:py-8 px-4 sm:px-6 lg:px-12">
      <div className="max-w-8xl mx-auto lg:flex lg:gap-15 justify-between w-full">
        
        <div className="lg:w-[60%] bg-white  rounded-2xl lg:p-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Choose your address
          </h3>
          <div className="h-16 mt-6 border-2 border-dashed border-gray-300 rounded-xl flex justify-center items-center cursor-pointer hover:border-blue-500 transition">
            <span className="text-blue-600 font-medium">+ Add Address</span>
          </div>
        </div>

        <div className="lg:w-[40%] mt-6 lg:mt-0 bg-white shadow-lg rounded-2xl p-6">
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
                {cartItems?.reduce((total, item) => total + item.quantity, 0)}{" "}
                items
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
    </section>
  );
};

export default CheckOutPage;
