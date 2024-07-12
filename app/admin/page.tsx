"use client";
import React, { FC } from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import DashboardHero from "../components/Admin/sidebar/DashboardHero";

type Props = {};

const page: FC<Props> = (props) => {
  return (
    <div>
      <Heading
        title='ELearning - Admin'
        description='ELearning is a platform for student to learn'
        keywords='FrontEnd, MERN, Redux'
      />
      <div className='flex h-[200vh]'>
        <div className='1500px:w-[16%] w-1/5'>
          <AdminSidebar />
        </div>
        <div className='w-[85%]'>
          <DashboardHero />
        </div>
      </div>
    </div>
  );
};

export default page;
