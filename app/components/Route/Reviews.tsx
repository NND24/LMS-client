import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";
import hero from "../../../public/assets/hero.png";

type Props = {};

export const reviews: any = [
  {
    name: "Nguyen Hoang Nam",
    avatar: "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png",
    profession: "Student",
    comment:
      "The ELearning is incredibly user-friendly and easy to navigate. I love how all the resources are well-organized and accessible anytime!",
    ratings: 5,
  },
  {
    name: "Tran Thi My Linh",
    avatar: "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png",
    profession: "Student",
    comment:
      "The platform makes online learning so smooth. I can track my progress, submit assignments, and interact with my instructors all in one place.",
    ratings: 5,
  },
  {
    name: "Le Thanh Binh",
    avatar: "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png",
    profession: "Student",
    comment:
      "What I appreciate the most about the ELearning is its flexibility. I can learn at my own pace, and the mobile access makes studying on the go super convenient.",
    ratings: 5,
  },
  {
    name: "Pham Quang Hieu",
    avatar: "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png",
    profession: "Student",
    comment:
      "This LMS has great features like discussion forums and quizzes that really keep me engaged. It has definitely enhanced my learning experience!",
    ratings: 5,
  },
  {
    name: "Nguyen Thuy Dung",
    avatar: "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png",
    profession: "Student",
    comment:
      "The seamless integration of video lessons makes it a great platform for both self-study and interactive learning. Highly recommended!",
    ratings: 5,
  },
];

const Reviews = (props: Props) => {
  return (
    <div className='w-[90%] 800px:w-[85%] m-auto'>
      <div className='w-full 800px:flex items-center'>
        {/* <div className='800px:w-[50%] w-full'>
          <Image src={hero} alt='business' width={700} height={700} />
        </div> */}
        <div className=' w-full'>
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are <span className='text-gradient'>Ore Strength</span> <br />
            See What They Say About Us
          </h3>
          <br />
          <p className={styles.label}>
            {
              "Our students are the heart of everything we do. Their achievements and experiences speak volumes about the quality of our education and the supportive environment we strive to create. Whether it's personal growth, academic success, or career advancement, we are proud to be part of their journey."
            }
          </p>
        </div>
      </div>
      <br />
      <br />
      <div className='grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*nth-child(6)]:!mt-[-60px]'>
        {reviews && reviews.map((i: any, index: number) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;
