import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col pt-2 px-4 space-y-2 bg-gradient-to-br from-gray-200 to-indigo-200 flex-grow pb-4">
      {children}
    </div>
  );
}