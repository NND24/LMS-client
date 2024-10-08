"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetUsersAllCourseQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";

type Props = {};

const CourseContent = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");

  const [category, setCategory] = useState("All");
  const [courses, setCourses] = useState([]);

  const { data } = useGetUsersAllCourseQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});

  console.log(categoriesData);

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses);
    } else {
      setCourses(data?.courses.filter((item: any) => item.categories === category));
    }

    if (search) {
      setCourses(data?.courses.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase())));
    }
  }, [data, category, search]);

  return (
    <>
      <div className='w-full flex items-center flex-wrap'>
        <div
          className={`h-[35px] ${
            category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
          } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
          onClick={() => setCategory("All")}
        >
          All
        </div>
        {categoriesData?.layout?.categories &&
          categoriesData?.layout?.categories.map((item: any, index: number) => (
            <div key={index}>
              <div
                className={`h-[35px] ${
                  category === item.title ? "bg-[crimson]" : "bg-[#5050cb]"
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory(item.title)}
              >
                {item.title}
              </div>
            </div>
          ))}
      </div>
      {courses && courses.length === 0 && (
        <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}>
          {search ? "No courses found!" : "No courses found in this category. Please try another one"}
        </p>
      )}
      <br />
      <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0'>
        {courses && courses.map((item: any, index: number) => <CourseCard item={item} key={index} />)}
      </div>
    </>
  );
};

const Page = (props: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

  const { isLoading } = useGetUsersAllCourseQuery(undefined, {});

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header route={route} setRoute={setRoute} open={open} setOpen={setOpen} activeItem={1} />
          <div className='w-[95%] 800px:w-[85%] m-auto min-h-[70vh]'>
            <Heading
              title='All courses - ELearning'
              description='ELearning is a programming community'
              keywords='Programs community, coding skills, expert insights, collaboration, growth'
            />
            <br />
            <Suspense fallback={<Loader />}>
              <CourseContent />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
