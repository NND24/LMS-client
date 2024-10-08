"use client";

import React, { useState } from "react";
import avatar from "../../../public/assets/person.jpg";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

type Props = {};

const Hero = (props: Props) => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='w-[90%] 800px:w-[85%] m-auto'>
          <div className='w-full 800px:flex items-center'>
            <div className='flex items-center justify-center overflow-hidden mt-[20px]'>
              <Image
                src={data?.layout?.banner?.image?.url}
                alt=''
                width={700}
                height={700}
                className='object-cover max-w-[80%] h-[auto] hero_animation rounded-full'
              />
            </div>

            <div className='1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[20px]'>
              <h2 className='dark:text-white text-[#000000c7] text-[30px] px-3 1000px:text-[50px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[55%] 1100px:w-[78%] w-[90%]'>
                {data?.layout?.banner?.title}
              </h2>
              <br />
              <p className='dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:w-[55%] 1100px:w-[78%] w-[90%]'>
                {data?.layout?.banner?.subTitle}
              </p>
              <br />
              <br />
              <div className='1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative'>
                <input
                  type='search'
                  placeholder='Search Course...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#000000e4] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin'
                />
                <div
                  className='absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]'
                  onClick={handleSearch}
                >
                  <BiSearch className='text-white' size={30} />
                </div>
              </div>
              <br />
              <br />
              <div className='1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center'>
                <Image src={avatar} alt='' className='rounded-full w-[30px] h-[30px]' />
                <Image src={avatar} alt='' className='rounded-full ml-[-20px] w-[30px] h-[30px]' />
                <Image src={avatar} alt='' className='rounded-full ml-[-20px] w-[30px] h-[30px]' />
                <p className='font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]'>
                  500K+ People already trusted us{" "}
                  <Link href='/courses' className='dark:text-[#46e256] text-[crimson]'>
                    View Course
                  </Link>
                </p>
              </div>
              <br />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
