"use client";
import React, { FC } from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/Sidebar/AdminSidebar";
import DashboardHero from "../components/Admin/Sidebar/DashboardHero";
import AdminProtected from "../hooks/adminProtected";

type Props = {};

const page: FC<Props> = (props) => {
  return (
    <div>
      <AdminProtected>
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
      </AdminProtected>
    </div>
  );
};

export default page;
