'use client'; // Client-side rendering

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../app/globals.css'; // Import global styles or other necessary styles

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Adding html and body tags as per Next.js requirements */}
      <html lang="en">
        <body>
          <QueryClientProvider client={queryClient}>
            {children} {/* This renders the child components */}
          </QueryClientProvider>
        </body>
      </html>
    </>
  );
}
