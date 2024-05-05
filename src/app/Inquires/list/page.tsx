'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

interface Inquiry {
  user_id: number;
  name: string;
  email: string;
  product_name: string;
  product_id: string;
  inquiry_text: string;
  created_at: string;
}

const Inquires: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/Inquiry', {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch inquiries');
      }

      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };


  return (
    <div className="flex flex-col mx-auto px-4 w-full">
      <h1 className="text-2xl font-bold text-center my-6">Inquiries List</h1>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-auto w-[900px]">
            <table className=" text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    ID
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Product Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Product ID
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Inquiry Text
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Created At
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr
                    key={inquiry.user_id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 py-2"
                  >
                    <td className="py-4 px-6">{inquiry.user_id}</td>
                    <td className="py-4 px-6">{inquiry.name}</td>
                    <td className="py-4 px-6">{inquiry.email}</td>
                    <td className="py-4 px-6">{inquiry.product_name}</td>
                    <td className="py-4 px-6">{inquiry.product_id}</td>
                    <td className="py-4 px-6">{inquiry.inquiry_text}</td>
                    <td className="py-4 px-6">{inquiry.created_at}</td>
                    <td className="py-4 px-6 flex gap-5">
                      <Link href="/Inquires/edit">
                        <CiEdit className='text-gray-500 text-lg' />
                      </Link>
                      <MdDelete className='text-red-500 text-lg' />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquires;
