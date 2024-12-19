import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'Sự kiện',
    description: 'Tạo thiệp mời sự kiện Nhà Phố Việt Nam',
    openGraph: {
        title: 'Sự kiện',
        description: 'Tạo thiệp mời sự kiện Nhà Phố Việt Nam',
        images: [
            {
                url: '/images/05012025.png',
                width: 1200,
                height: 630,
                alt: 'Ảnh demo sự kiện',
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
        </html>
    );
}
