// app/(login-route-group)/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import { AuthProvider } from '@/components/contexts/AuthContext';  // Ensure the path is correct
import PageWrapper from '@/components/Layout/helpers/page-wrapper';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Login Page',
    description: 'Login to access your account',
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // <AuthProvider>  {/* Wrap children with AuthProvider */}
        <PageWrapper>
            <div className={`bg-white${inter.className}`}>
                {children}

            </div>
        </PageWrapper>
        // </AuthProvider>
    );
}
