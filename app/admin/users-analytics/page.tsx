"use client";
import React from "react";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import UserAnalytics from "../../components/Admin/Analytics/UserAnalytics";
import DashboardHeader from "@/app/components/Admin/Sidebar/DashboardHeader";
import AdminProtected from "@/app/hooks/adminProtected";

type Props = {};

const page = (props: Props) => {
  return (
    <div className='overflow-hidden h-[100vh]'>
      <AdminProtected>
        <Heading
          title='ELearning - Admin'
          description='ELearing is a platform for students to learn'
          keywords='Programming'
        />
        <div className='flex'>
          <div className='1500px:w-[16%] w-1/5'>
            <AdminSidebar />
          </div>
          <div className='w-[85%]'>
            <DashboardHeader />
            <UserAnalytics />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
