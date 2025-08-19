import React from "react";

const ProductsSkeleton = () => {
    return (
        <>
            <section className="bg-white mx-auto lg:px-8 md:px-8 p-4 px-4 grid lg:grid-cols-2 h-screen gap-6">
                <div className="col-span-1 sticky top-0 self-start">
                    <div className="bg-gray-200 animate-pulse rounded w-full flex items-center justify-center aspect-square md:aspect-[4/3]">
                        
                    </div>

                    <div className="pt-4 flex items-center justify-center gap-3">
                        {Array(3)
                            .fill("")
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className="rounded-full w-4 h-4 bg-gray-200 animate-pulse"
                                ></div>
                            ))}
                    </div>

                    <div className="flex gap-4 justify-center py-3 overflow-x-auto scrollbar-hidden">
                        {Array(4)
                            .fill("")
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className="h-20 w-20 rounded bg-gray-200 animate-pulse"
                                ></div>
                            ))}
                    </div>
                </div>

                <div className="col-span-1 p-4 px-0 pt-3 lg:pt-4 lg:pl-6 text-base md:text-lg overflow-y-auto">
                    <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>

                    <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse mb-2"></div>

                    <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-4"></div>

                    <div className="h-[1px] w-full bg-gray-200 mb-4"></div>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-8 w-28 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    <div className="h-10 w-24 bg-gray-300 rounded animate-pulse mb-6"></div>

                    <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse mb-4"></div>
                    {Array(3)
                        .fill("")
                        .map((_, i) => (
                            <div key={i} className="flex items-center gap-4 my-4">
                                <div className="h-20 w-20 bg-gray-200 rounded animate-pulse"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                </div>
            </section>

            <section className="bg-white mx-auto md:px-8 p-4 px-4">
                <div className="my-4 grid gap-4 text-base md:text-xl">
                    <div>
                        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mt-1"></div>
                    </div>

                    <div>
                        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    {Array(3)
                        .fill("")
                        .map((_, i) => (
                            <div key={i}>
                                <div className="h-5 w-28 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        ))}
                </div>
            </section>
        </>
    );
};

export default ProductsSkeleton;
