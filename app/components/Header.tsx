"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "./utils/NavItems";
import ThemeSwitcher from "./utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModel from "../components/CustomModel";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import Image from "next/image";
import avatar from "../../public/assets/avatar.png";
import { useSession } from "next-auth/react";
import { useLogOutQuery, useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ open, setOpen, activeItem, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user: userData } = useSelector((state: RootState) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);

  useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!userData) {
      if (data) {
        socialAuth({
          email: data?.user?.email ?? "",
          name: data?.user?.name ?? "",
          avatar: data?.user?.image ?? "",
        });
      }

      if (data === null && isSuccess) {
        toast.success("Login Successfully!");
      }
      if (data === null && !userData) {
        setLogout(true);
      }
    }
  }, [data, userData, isSuccess, socialAuth]);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 80);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className='w-full relative'>
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className='w-[95%] 800px:w-[92%] m-auto h-full'>
          <div className='w-full h-[80px] flex items-center justify-between'>
            <div>
              <Link href={"/"} className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
                ELearning
              </Link>
            </div>
            <div className='flex items-center'>
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />

              <div className='800px:hidden'>
                <HiOutlineMenuAlt3
                  size={25}
                  className='cursor-pointer dark:text-white text-black'
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {userData ? (
                <Link href='/profile'>
                  <Image
                    src={userData.avatar ? userData.avatar.url : avatar}
                    alt='avatar'
                    width={30}
                    height={30}
                    className='w-[30px] h-[30px] rounded-full cursor-pointer'
                    style={{ border: activeItem === 5 ? "2px solid #ffc107" : "none" }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className='hidden 800px:block cursor-pointer dark:text-white text-black'
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {openSidebar && (
          <div
            className='fixed w-full h-screen top-0 left-0 z-[9999] dark:bg-[unset] bg-[#00000024]'
            onClick={handleClose}
            id='screen'
          >
            <div className='w-[70%] fixed z-[9999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0'>
              <NavItems activeItem={activeItem} isMobile={true} />
              {userData ? (
                <Link href='/profile'>
                  <Image
                    src={userData.avatar ? userData.avatar.url : avatar}
                    alt='avatar'
                    width={30}
                    height={30}
                    className='ml-[20px] w-[30px] h-[30px] rounded-full cursor-pointer'
                    style={{ border: activeItem === 5 ? "2px solid #ffc107" : "none" }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className='ml-[20px] 800px:block cursor-pointer dark:text-white text-black'
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        )}
      </div>
      {route === "Login" && open && (
        <CustomModel open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={Login} />
      )}
      {route === "Sign-Up" && open && (
        <CustomModel open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={SignUp} />
      )}
      {route === "Verification" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </div>
  );
};

export default Header;
