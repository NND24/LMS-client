"use client";

import { redirect } from "next/navigation";
import React, { FC, useEffect } from "react";
import CourseContent from "../../components/Course/CourseContent";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Props = {
  params: any;
};

const Page: FC<Props> = ({ params }) => {
  const id = params.id;

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      redirect("/");
    }

    if (user) {
      const isPurchased = user.courses.find((item: any) => item.courseId === id);
      if (!isPurchased) {
        redirect("/");
      }
    }
  }, [id, user]);

  return (
    <div>
      <CourseContent id={id} user={user} />
    </div>
  );
};

export default Page;
