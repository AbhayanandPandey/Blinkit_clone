import React from 'react';
import { IoClose } from 'react-icons/io5';

const AddField = ({ close, value, onChange, submit }) => {
    return (
        <section className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg relative">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-lg">Add More Fields</h2>
                    <button onClick={close} className="text-gray-700 hover:text-black transition cursor-pointer">
                        <IoClose size={24} />
                    </button>
                </div>

                <div className="grid gap-3">
                    <div>
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Field Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={value}
                            onChange={onChange}
                            name="name"
                            placeholder="e.g. Fabric Type"
                            className="p-2 border border-blue-200 rounded bg-blue-50 outline-none w-full"
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={submit}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                        >
                            Add Field
                        </button>
                    </div>
                </div>
            </div>
        </section> 
    );
};

export default AddField;
