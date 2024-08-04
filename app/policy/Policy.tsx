import React from "react";
import { styles } from "../styles/style";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div className='dark:text-white text-black'>
      <div className={"w-[95%] 800px:w-[92%] m-auto py-2  px-3"}>
        <h1 className={`${styles.title} !text-start pt-2`}>Platform Terms and Condition</h1>
      </div>
      <ul style={{ listStyle: "unset", marginLeft: "25px", paddingLeft: "55px", paddingRight: "55px" }}>
        <p className='py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae voluptatum odio repellendus aliquid
          adipisci, cumque unde dicta dolorum ipsum blanditiis amet voluptas pariatur debitis nobis ad! Rem ea
          doloremque nostrum.
        </p>
        <br />
        <p className='py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae voluptatum odio repellendus aliquid
          adipisci, cumque unde dicta dolorum ipsum blanditiis amet voluptas pariatur debitis nobis ad! Rem ea
          doloremque nostrum.
        </p>
        <br />
        <p className='py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae voluptatum odio repellendus aliquid
          adipisci, cumque unde dicta dolorum ipsum blanditiis amet voluptas pariatur debitis nobis ad! Rem ea
          doloremque nostrum.
        </p>
        <br />
        <p className='py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae voluptatum odio repellendus aliquid
          adipisci, cumque unde dicta dolorum ipsum blanditiis amet voluptas pariatur debitis nobis ad! Rem ea
          doloremque nostrum.
        </p>
        <br />
        <p className='py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae voluptatum odio repellendus aliquid
          adipisci, cumque unde dicta dolorum ipsum blanditiis amet voluptas pariatur debitis nobis ad! Rem ea
          doloremque nostrum.
        </p>
        <br />
      </ul>
    </div>
  );
};

export default Policy;
