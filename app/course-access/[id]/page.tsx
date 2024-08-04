"use client";

import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { FC, useEffect } from "react";
import CourseContent from "../../components/Course/CourseContent";

type Props = {
  params: any;
};

const Page: FC<Props> = ({ params }) => {
  const id = params.id;

  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (error) {
      redirect("/");
    }

    if (data) {
      const isPurchased = data.user.courses.find((item: any) => item.courseId === id);
      if (!isPurchased) {
        redirect("/");
      }
    }
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContent id={id} user={data.user} />
        </div>
      )}
    </>
  );
};

export default Page;
