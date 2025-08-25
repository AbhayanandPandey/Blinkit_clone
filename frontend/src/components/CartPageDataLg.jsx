import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useGlobal } from "../provider/GlobalProvider";
import { FaCaretRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Divider from "./Divider";
import AddToCart from "./AddToCart";
import { Link, useNavigate } from "react-router-dom";  
const CartPageDataLg = ({ close }) => {
    const { notDiscountPrice, totoalPrice } = useGlobal();
    const cartItems = useSelector((state) => state.cartItem.cartProducts);

    const [coupon, setCoupon] = useState("");
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [showCouponBox, setShowCouponBox] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();  
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [cartItems.length]);

    const applyCoupon = () => {
        setLoading(true);
        setTimeout(() => {
            if (coupon.toLowerCase() === "new10") {
                setCouponDiscount(200);
                setShowCouponBox(false);
            } else {
                setCouponDiscount(0);
                alert("Invalid Coupon");
            }
            setLoading(false);
        }, 800);
    };

    const finalPrice = Math.max(totoalPrice - couponDiscount, 0);

    return (
        <section className="bg-black/50 z-50 fixed inset-0 ">
            <div className="bg-white w-full lg:w-[22rem] h-screen ml-auto flex flex-col">
                <div className="p-4 flex items-center shadow-md justify-between">
                    <h2 className="font-semibold text-lg">Cart</h2>
                    <Link to="/" className="lg:hidden">
                        <button className="cursor-pointer" onClick={close}>
                            <IoClose size={25} />
                        </button>
                    </Link>
                    <button className="hidden lg:block cursor-pointer" onClick={close}>
                        <IoClose size={25} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-hidden scrollbar-hide px-3 min-h-[75vh] max-h-[100vh-150px] py-2">
                    {loading ? (
                        Array(10).fill("").map((_, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm animate-pulse">
                                <div className="w-16 h-16 bg-gray-200 rounded" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                                </div>
                                <div className="w-[90px] h-8 bg-gray-200 rounded" />
                            </div>
                        ))
                    ) : cartItems.length > 0 ? (
                        cartItems.map((item, i) => {
                            const price = item?.productId?.price || 0;
                            const discount = item?.productId?.discount || 0;
                            const final = price - (price * discount) / 100;

                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm"
                                >
                                    <div
                                        className="w-16 h-16 flex-shrink-0 shadow-md rounded overflow-hidden cursor-pointer"
                                        onClick={() => {
                                            if (window.innerWidth >= 1024) {
                                                close();
                                            }
                                            navigate(
                                                `/product/${item?.productId?.name?.split(" ").join("-")}-${item?.productId?._id}`
                                            );
                                        }}
                                    >
                                        <img
                                            src={item?.productId?.image?.[0]}
                                            alt={item?.productId?.name}
                                            className="object-contain w-full h-full"
                                        />
                                    </div>

                                    <div
                                        className="flex flex-col flex-1 cursor-pointer"
                                        onClick={() => {
                                            if (window.innerWidth >= 1024) {
                                                close(); 
                                            }
                                            navigate(
                                                `/product/${item?.productId?.name?.split(" ").join("-")}-${item?.productId?._id}`
                                            );
                                        }}
                                    >
                                        <p className="font-medium text-gray-800 line-clamp-1">
                                            {item?.productId?.name}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-green-600 font-semibold">{final} ₹</span>
                                            {discount > 0 && (
                                                <span className="text-gray-400 line-through text-xs">{price} ₹</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500">Qty: {item?.quantity}</p>
                                    </div>


                                    <div className="w-[90px] flex-shrink-0">
                                        <AddToCart data={item.productId} setLoading={setLoading} />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                            <p>Your cart is empty</p>
                        </div>
                    )}
                    <Divider />
                    {cartItems.length > 0 && !loading && (
                        <div className=" bg-white">
                            <div className="px-4 py-3 space-y-2 text-sm text-gray-700">
                                <div className="flex justify-between">
                                    <span>Total (w/o discount)</span>
                                    <span>{notDiscountPrice} ₹</span>
                                </div>
                                <div className="flex justify-between text-green-600">
                                    <span>Discount</span>
                                    <span>- {(notDiscountPrice - totoalPrice).toFixed(2)} ₹</span>
                                </div>
                                {couponDiscount > 0 && (
                                    <div className="flex justify-between text-blue-600">
                                        <span>Coupon Applied</span>
                                        <span>- {couponDiscount} ₹</span>
                                    </div>
                                )}
                                <Divider />
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Final Amount</span>
                                    <span>{finalPrice} ₹</span>
                                </div>
                            </div>

                            <div className="px-4 pb-3">
                                {!showCouponBox ? (
                                    <button
                                        onClick={() => setShowCouponBox(true)}
                                        className="flex items-center justify-between w-full text-blue-600 font-medium text-sm"
                                    >
                                        <span>Have a Coupon?</span>
                                        <FaCaretRight />
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={coupon}
                                            onChange={(e) => setCoupon(e.target.value)}
                                            placeholder="Enter Coupon"
                                            className="border rounded px-3 py-2 flex-1 text-sm outline-none"
                                        />
                                        <button
                                            onClick={applyCoupon}
                                            className="bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <Divider />
                <div className="p-3 sticky bottom-1 md:bottom-3">
                    <div className="flex items-center justify-between bg-green-700 text-white p-4 font-bold rounded-lg text-lg">
                        <span>{loading ? "..." : `${finalPrice} ₹`}</span>
                        <button className="flex items-center gap-1 cursor-pointer hover:gap-2 transition-all" disabled={loading}>
                            Proceed <FaCaretRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartPageDataLg;
