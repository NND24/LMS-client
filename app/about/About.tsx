import React from "react";
import { styles } from "../styles/style";

type Props = {};

const About = (props: Props) => {
  return (
    <div className='text-black dark:text-white'>
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        What is <span className='text-gradient'>ELearning?</span>
      </h1>
      <br />
      <div className='w-[95%] 800px:w-[85%] m-auto'>
        <p className='text-[18px] font-Poppins'>
          {`Are you ready to take your programming skills to next level? Look no further than ELearning, the premier
          programming community dedicated to helping new programmers achieve their goals and reach their full potential.`}
          <br />
          <br />
          {`At ELearning, we believe that price should never be a barrier to achieving your dreams. That's why our courses
          are priced low - so that anyone, regardless of their financial situation, can access the tools and knowledge
          they need to succeed.`}
          <br />
          <br />
          {`But ELearning is more than just a community - we're a family. Our supportive community of like - minded
          individuals is here to help you every step of the way, whether you're just starting out or looking to take
          your skills to next level.`}
          <br />
          <br />
          {`With ELearning by your side, there's nothing standing between you and your dream job. Our courses and
          community will provide you with the guidance, support, and motivation you need to unleash your full potential
          and become a skilled programmer.`}
          <br />
          <br />
          {`So what are you waiting for? Join ELearning family today and let's conquer the programming industry together!
          With our affordable courses, informative videos, and supportive community, the sky's the limit.`}
        </p>
      </div>
      <br />
      <br />
    </div>
  );
};

export default About;
