'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { cn } from '@/lib/utils';

const Header = () => {
  const selectedLayout = useSelectedLayoutSegment();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        window.location.href = '/login';
      } else {
        console.error('Error logging out:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        `sticky top-0 left-0 z-10 w-full transition-all bg-background px-8`,
        {
          'bg-background ': selectedLayout,
        },
      )}
    >
      <div className="flex py-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <h2 className="text-buttonColor font-semibold tracking-tight text-xl">Sewing - Bazar</h2>
          </Link>
        </div>

        <div className="hidden md:block">
          {selectedLayout !== 'login' && (
            <div className="h-8 w-8 py-2 rounded-full bg-zinc-300 flex items-center justify-center text-center">
              <button
                type="button"
                className="text-md bg-buttonColor text-white py-1 px-2 rounded-lg"
                onClick={handleLogout}
                disabled={loading}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;