import { styles } from "@/app/styles/style";
import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import hero from "../../../../public/assets/hero.png";

type Props = {};

const AllHero = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", { refetchOnMountOrArgChange: true });
  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image.url);
    }
    if (isSuccess) {
      refetch();
      toast.success("Hero updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <>
      <div className='w-[100%] m-auto'>
        <div className='w-full 800px:flex items-center mt-[-20px]'>
          <div className='flex items-center justify-center overflow-hidden mt-[20px] relative'>
            <Image
              src={image}
              alt=''
              width={700}
              height={700}
              className='object-cover max-w-[80%] h-[auto] hero_animation rounded-full'
            />
            <input type='file' name='' id='banner' accept='image/*' onChange={handleUpdate} className='hidden' />
            <label htmlFor='banner' className='absolute bottom-0 right-[40px] z-20'>
              <AiOutlineCamera className='dark:text-white text-black text-[24px] cursor-pointer' />
            </label>
          </div>

          <div className='1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[20px]'>
            <textarea
              className='resize-none bg-transparent dark:text-white text-[#000000c7] text-[30px] px-3 1000px:text-[50px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[55%] 1100px:w-[78%] w-[90%]'
              placeholder='Improve Your Online Learning Experience Better Instantly'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={4}
            />
            <br />
            <textarea
              className='dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:w-[55%] 1100px:w-[78%] w-[90%] resize-none bg-transparent'
              placeholder='We have a lots online course. Find your desired course from them'
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              rows={4}
            />
            <br />
            <div
              className={`${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
                ${
                  data?.layout?.banner?.title !== title ||
                  data?.layout?.banner?.subTitle !== subTitle ||
                  data?.layout?.banner?.image?.url !== image
                    ? "!cursor-pointer !bg-[#42d383]"
                    : "!cursor-not-allowed"
                }
                `}
              onClick={
                data?.layout?.banner?.title !== title ||
                data?.layout?.banner?.subTitle !== subTitle ||
                data?.layout?.banner?.image?.url !== image
                  ? handleEdit
                  : () => null
              }
            >
              Save
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllHero;
