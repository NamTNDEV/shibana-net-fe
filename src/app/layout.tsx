import { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import AuthProvider from "@/components/providers/auth.providers";
import { userService } from "@/services/user.service";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await userService.getMe();

  return (
    <html lang="vi">
      <body className="antialiased">
        <AuthProvider initialUser={user}>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
