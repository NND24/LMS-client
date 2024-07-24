import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
  const [dragging, setDragging] = useState(false);
  const [categories, setCategories] = useState([]);
  const { data } = useGetHeroDataQuery("Categories", {});

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='w-[80%] m-auto mt-24'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name' className={`${styles.label}`}>
            Course Name
          </label>
          <input
            type='text'
            name='name'
            required
            value={courseInfo.name}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, name: e.target.value })}
            id='name'
            placeholder='HTML, CSS, Javascript,...'
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className='mt-5'>
          <label htmlFor='description' className={`${styles.label}`}>
            Course Description
          </label>
          <textarea
            name='description'
            id='description'
            cols={30}
            rows={8}
            placeholder='...'
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, description: e.target.value })}
          ></textarea>
        </div>
        <br />
        <div className='w-full flex justify-between'>
          <div className='w-[45%]'>
            <label htmlFor='price' className={`${styles.label}`}>
              Course Price
            </label>
            <input
              type='number'
              name='price'
              required
              value={courseInfo.price}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, price: e.target.value })}
              id='price'
              placeholder='20'
              className={`${styles.input}`}
            />
          </div>
          <div className='w-[50%]'>
            <label htmlFor='estimatedPrice' className={`${styles.label}`}>
              Estimated Price (optional)
            </label>
            <input
              type='number'
              name='estimatedPrice'
              required
              value={courseInfo.estimatedPrice}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })}
              id='estimatedPrice'
              placeholder='50'
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className='w-full flex justify-between'>
          <div className='w-[45%]'>
            <label htmlFor='tags' className={`${styles.label}`}>
              Course Tags
            </label>
            <input
              type='text'
              name='tags'
              required
              value={courseInfo.tags}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
              id='tags'
              placeholder='MERN, Next, Tailwind, CSS,...'
              className={`${styles.input}`}
            />
          </div>
          <div className='w-[50%]'>
            <label htmlFor='categories' className={`${styles.label}`}>
              Course Categories
            </label>
            <select
              name='categories'
              id='categories'
              className={`${styles.input} dark:bg-[#080C14] bg-[#EEEEEE]`}
              value={courseInfo.categories}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, categories: e.target.value })}
            >
              <option value=''>Select Category</option>
              {categories.map((item: any) => (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <div className='w-full flex justify-between'>
          <div className='w-[45%]'>
            <label htmlFor='level' className={`${styles.label}`}>
              Course Level
            </label>
            <input
              type='text'
              name='level'
              required
              value={courseInfo.level}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, level: e.target.value })}
              id='level'
              placeholder='Beginner/Intermediate/Expert'
              className={`${styles.input}`}
            />
          </div>
          <div className='w-[50%]'>
            <label htmlFor='demoUrl' className={`${styles.label}`}>
              Demo Url
            </label>
            <input
              type='text'
              name='demoUrl'
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
              id='demoUrl'
              placeholder='...'
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className='w-full'>
          <input type='file' accept='image/*' id='file' className='hidden' onChange={handleFileChange} />
          <label
            htmlFor='file'
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <Image
                src={courseInfo.thumbnail}
                alt='Course Thumbnail'
                width={500}
                height={300}
                className='max-h-full w-full object-cover'
              />
            ) : (
              <span className='text-black dark:text-white'>Drag and drop your thumbnail here or click to browse</span>
            )}
          </label>
        </div>
        <br />
        <div className='w-full flex items-center justify-end'>
          <input
            type='submit'
            value='Next'
            className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
          />
        </div>
      </form>
      <br />
      <br />
    </div>
  );
};

export default CourseInformation;
