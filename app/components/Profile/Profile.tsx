import React, { FC, useState, useEffect } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetUsersAllCourseQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState([]);

  const { data, isLoading } = useGetUsersAllCourseQuery(undefined, {});

  useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) => data.courses.find((course: any) => course._id === userCourse._id))
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data, user.courses]);

  return (
    <div className='w-[85%] flex mx-auto mb-7'>
      <div
        className={`w-[50px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-900 border bg-white dark:border-[#ffffffff1d] border-[#00000016] rounded-[5px] shadow-sm mt-[60px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        }`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>
      {active === 1 && (
        <div className='w-full h-full bg-transparent mt-[60px]'>
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
      {active === 2 && (
        <div className='w-full h-full bg-transparent mt-[60px]'>
          <ChangePassword />
        </div>
      )}
      {active === 3 && (
        <div className='w-full pl-7 px-2 800px:px-10 800px:pl-8 mt-[60px]'>
          <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px]'>
            {courses &&
              courses.map((item: any, index: number) => <CourseCard item={item} key={index} isProfile={true} />)}
          </div>
          {courses.length === 0 && (
            <h1 className='text-center text-[18px] font-Poppins'>{`You don't have any purchased courses!`}</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
