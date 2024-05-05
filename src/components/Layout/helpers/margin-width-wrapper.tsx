import { ReactNode } from 'react';

export default function MarginWidthWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col md:ml-[274px]   min-h-screen">
      {children}
    </div>
  );
}