"use client";
import React from "react";
import CourseDetailPage from "../../components/Course/CourseDetailPage";

type Props = {};

const page = ({ params }: any) => {
  return (
    <div>
      <CourseDetailPage id={params.id} />
    </div>
  );
};

export default page;
