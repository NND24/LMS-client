"use client";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AllInvoices from "../../components/Admin/Order/AllInvoices";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className='overflow-hidden h-[100vh]'>
      <AdminProtected>
        <Heading
          title='ELearning - Admin'
          description='ELearning is a platform for student to learn'
          keywords='FrontEnd, MERN, Redux'
        />
        <div className='flex h-screen'>
          <div className='1500px:w-[16%] w-1/5'>
            <AdminSidebar />
          </div>
          <div className='w-[85%]'>
            <DashboardHero />
            <AllInvoices />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
