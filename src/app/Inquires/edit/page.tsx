"use client"
import React, { useState, useEffect } from 'react';

interface Inquiry {
    name: string;
    email: string;
    productName: string;
    productId: string;
    inquiryText: string;
    createdAt: string;
}

const EditInquires: React.FC<{ inquiry: Inquiry }> = ({ inquiry }) => {
    // State to manage form data
    const [formData, setFormData] = useState<Inquiry>({
        name: '',
        email: '',
        productName: '',
        productId: '',
        inquiryText: '',
        createdAt: ''
    });

    // Update form data when inquiry prop changes
    useEffect(() => {
        if (inquiry) {
            setFormData({
                name: inquiry.name,
                email: inquiry.email,
                productName: inquiry.productName,
                productId: inquiry.productId,
                inquiryText: inquiry.inquiryText,
                createdAt: inquiry.createdAt
            });
        }
    }, [inquiry]);

    // Handle changes to form fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement your logic to update the inquiry data
        console.log(formData);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-center my-6">Edit Inquiry</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="productName">Product Name:</label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="productId">Product ID:</label>
                    <input
                        type="text"
                        id="productId"
                        name="productId"
                        value={formData.productId}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="inquiryText">Inquiry Text:</label>
                    <textarea
                        id="inquiryText"
                        name="inquiryText"
                        value={formData.inquiryText}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded py-2 px-3"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="createdAt">Created At:</label>
                    <input
                        type="text"
                        id="createdAt"
                        name="createdAt"
                        value={formData.createdAt}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded py-2 px-3"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditInquires;
