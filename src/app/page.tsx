import Link from 'next/link';
import React from 'react';

export default function Home() {

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Add Teams */}
      <Link href={'/Inquires/list'}>
        <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="mt-2 text-xl font-semibold text-white">Total Inquires</h3>
            <p className="text-white text-opacity-80 mt-1">See and manage Inquires efficiently.</p>
          </div>
        </div>
      </Link>
      <Link href={'/Inquires/list'}>
        {/* View Profile */}
        <div className="cursor-pointer bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className=" mt-2 text-xl font-semibold text-white">View All Inquires</h3>
            <p className="text-white text-opacity-80 mt-1">See All Inquires and update them.</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
