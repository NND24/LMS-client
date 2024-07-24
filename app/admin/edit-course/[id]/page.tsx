"use client";
import React from "react";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import EditCourse from "../../../components/Admin/Course/EditCourse";
import AdminProtected from "@/app/hooks/adminProtected";
import DashboardHeader from "@/app/components/Admin/Sidebar/DashboardHeader";

type Props = {};

const page = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
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
            <EditCourse id={id} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
