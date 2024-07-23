import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { FC, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./CourseDetails";

type Props = {
  id: string;
};

const CourseDetailPage: FC<Props> = ({ id }) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data.course.name + " - ELearning"}
            description='ELearning is a platform for student to learn'
            keywords={data?.course?.tags}
          />
          <Header route={route} setRoute={setRoute} open={open} setOpen={setOpen} activeItem={1} />
          <CourseDetails data={data.course} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailPage;
