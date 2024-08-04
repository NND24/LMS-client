import { styles } from "@/app/styles/style";
import { AddCircle } from "@mui/icons-material";
import React, { FC } from "react";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({ benefits, setBenefits, prerequisites, setPrerequisites, active, setActive }) => {
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = benefits.map((benefit, i) => (i === index ? { ...benefit, title: value } : benefit));
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisiteChange = (index: number, value: string) => {
    const updatedPrerequisites = prerequisites.map((prerequisite, i) =>
      i === index ? { ...prerequisite, title: value } : prerequisite
    );
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields to go to next");
    }
  };

  return (
    <div className='w-[80%] m-auto block'>
      <div>
        <label htmlFor='benefit' className={`${styles.label} text-[20px]`}>
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit, index) => (
          <input
            type='text'
            key={index}
            name='benefit'
            placeholder='You will build a full stack LMS Platform...'
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircle style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }} onClick={handleAddBenefit} />
      </div>

      <div>
        <label htmlFor='prerequisite' className={`${styles.label} text-[20px]`}>
          What are the prerequisites for students in this course?
        </label>
        <br />
        {prerequisites.map((prerequisite, index) => (
          <input
            type='text'
            key={index}
            name='prerequisite'
            placeholder='Basic knowledge of HTML...'
            required
            className={`${styles.input} my-2`}
            value={prerequisite.title}
            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
          />
        ))}

        <AddCircle style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }} onClick={handleAddPrerequisite} />
      </div>

      <div className='w-full flex items-center justify-between'>
        <div
          className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
          onClick={prevButton}
        >
          Prev
        </div>
        <div
          className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff]
          rounded mt-8 cursor-pointer'
          onClick={handleOptions}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
