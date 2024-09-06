"use client";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import React, { useEffect } from "react";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' className={`${poppins.variable} ${josefin.variable}`}>
      <body className='bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black transition-colors duration-300'>
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              <ContentLoader>{children}</ContentLoader>
              <Toaster position='top-center' reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
};

const ContentLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    socketId.on("connection", () => {});
  }, []);

  return <>{children}</>;
};

export default RootLayout;
