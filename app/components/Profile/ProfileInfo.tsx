import Image from "next/image";
import React, { FC, useState, useEffect } from "react";
import defaultAvatar from "../../../public/assets/avatar.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/style";
import { useEditProfileMutation, useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: updateSuccess, error: updateError }] = useEditProfileMutation();

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Avatar update successfully");
    }
    if (error || updateError) {
      console.log(error);
    }
    if (updateSuccess) {
      toast.success("Profile update successfully");
    }
  }, [isSuccess, error, updateSuccess, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name != "") {
      await editProfile({
        name,
      });
    }
  };

  return (
    <>
      <div className='w-full flex justify-center'>
        <div className='relative'>
          <Image
            src={user.avatar || avatar ? user.avatar.url || avatar : defaultAvatar}
            alt=''
            width={120}
            height={120}
            className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full'
          />
          <input
            type='file'
            name=''
            id='avatar'
            className='hidden'
            onChange={imageHandler}
            accept='image/jpg,image/png,image/jpeg,image/webp'
          />
          <label htmlFor='avatar'>
            <div className='w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer'>
              <AiOutlineCamera size={20} className='z-1' />
            </div>
          </label>
        </div>
      </div>
      <div className='w-full pl-6 800px:pl-10'>
        <form onSubmit={handleSubmit}>
          <div className='800px:w-[70%] m-auto block pb-4'>
            <div className='w-[100%]'>
              <label className='block text-black dark:text-[#fff]'>Full Name</label>
              <input
                type='text'
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='w-[100%] pt-3'>
              <label className='block text-black dark:text-[#fff]'>Email Address</label>
              <input
                type='text'
                readOnly
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={user?.email}
              />
            </div>
            <input
              type='submit'
              value='Update'
              required
              className='w-[40%] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer'
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
