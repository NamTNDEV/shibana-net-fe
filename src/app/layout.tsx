import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | ShibaNa Net",
    default: "ShibaNa Net - Kết nối đam mê, Chia sẻ khoảnh khắc",
  },
  description: "Mạng xã hội hiện đại dành cho cộng đồng yêu thích kết nối. Tham gia ngay để chia sẻ câu chuyện của bạn cùng ShibaNa.",
  icons: {
    icon: "/icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
