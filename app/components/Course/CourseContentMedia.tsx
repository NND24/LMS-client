import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia: FC<Props> = ({ data, id, activeVideo, setActiveVideo, user, refetch }) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [rating, setRating] = useState(1);
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");

  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const [addNewQuestion, { isLoading: questionCreationLoading, error, isSuccess }] = useAddNewQuestionMutation();
  const [addAnswerInQuestion, { isSuccess: answerSuccess, error: answerError, isLoading: answerCreationLoading }] =
    useAddAnswerInQuestionMutation();
  const [addReviewInCourse, { isSuccess: reviewSuccess, error: reviewError, isLoading: reviewCreationLoading }] =
    useAddReviewInCourseMutation();
  const [addReplyInReview, { isSuccess: replySuccess, error: replyError, isLoading: replyCreationLoading }] =
    useAddReplyInReviewMutation();

  const course = courseData?.course;

  const isReviewExists = data?.reviews?.find((item: any) => item.user._id === user._id);

  const handleQuestionSubmit = async () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      await addNewQuestion({ question, courseId: id, contentId: data[activeVideo]._id });
    }
  };

  const handleAnswerSubmit = async () => {
    await addAnswerInQuestion({ answer, courseId: id, contentId: data[activeVideo]._id, questionId: questionId });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      await addReviewInCourse({ review, rating, courseId: id });
    }
  };

  const handleReviewReplySubmit = async () => {
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Reply can't be empty");
      } else {
        addReplyInReview({ comment: reply, courseId: id, reviewId });
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
      socketId.emit("notification", {
        title: "New Question Received",
        message: `You have a new question in ${data[activeVideo].title}`,
        userId: user._id,
      });
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully");
      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: "New Reply Received",
          message: `You have a new question reply in ${data[activeVideo].title}`,
          userId: user._id,
        });
      }
    }
    if (reviewSuccess) {
      setAnswer("");
      courseRefetch();
      toast.success("Review added successfully");
      socketId.emit("notification", {
        title: "New Review Received",
        message: `You have a new review in ${data[activeVideo].title}`,
        userId: user._id,
      });
    }
    if (replySuccess) {
      setAnswer("");
      courseRefetch();
      toast.success("Reply added successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = replyError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
    replySuccess,
    replyError,
    refetch,
    data,
    activeVideo,
    user._id,
    user.role,
    courseRefetch,
  ]);

  return (
    <div className='w-[95%] 800px:w-[86%] py-4 m-auto'>
      <CoursePlayer title={data[activeVideo]?.title} videoUrl={data[activeVideo]?.videoUrl} />
      <div className='w-full flex items-center justify-between my-3 pt-2'>
        <div
          className={`${styles.button} text-white  !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}
        >
          <AiOutlineArrowLeft className='mr-2' />
          Prev Lesson
        </div>

        <div
          className={`${styles.button} text-white  !w-[unset] !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() => setActiveVideo(data && data.length - 1 === activeVideo ? activeVideo : activeVideo + 1)}
        >
          Next Lesson
          <AiOutlineArrowRight className='ml-2' />
        </div>
      </div>
      <h1 className='pt-2 text-[25px] font-[600] dark:text-white text-black'>{data[activeVideo].title}</h1>
      <br />
      <div className='w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner'>
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer ${
              activeBar === index ? "text-red-500" : "dark:text-white text-black"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className='text-[18px] whitespace-pre-line mb-3 dark:text-white text-black'>
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className='mb-5' key={index}>
              <h2 className='800px:text-[20px] 800px:inline-block dark:text-white text-black'>
                {item.title && item.title + " :"}
              </h2>
              <a href={item.url} className='inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2'>
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className='flex w-full'>
            <Image
              src={
                user.avatar
                  ? user.avatar.url
                  : "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png"
              }
              alt=''
              width={50}
              height={50}
              className='w-[50px] h-[50px] object-cover rounded-full'
            />
            <textarea
              name=''
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=''
              cols={40}
              rows={5}
              placeholder='Write your question...'
              className='outline-none bg-transparent ml-3 border dark:border-[#ffffff57] border-[#00000057] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins'
            ></textarea>
          </div>
          <div className='w-full flex justify-end'>
            <div
              className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading && "cursor-no-drop"
              }`}
              onClick={questionCreationLoading ? () => {} : handleQuestionSubmit}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className='w-full h-[1px] dark:bg-[#ffffff3b] bg-[#00000057]'></div>
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        </>
      )}
      {activeBar === 3 && (
        <div className='w-full'>
          {!isReviewExists && (
            <>
              <div className='flex w-full'>
                <Image
                  src={
                    user.avatar
                      ? user.avatar.url
                      : "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png"
                  }
                  alt=''
                  width={50}
                  height={50}
                  className='w-[50px] h-[50px] object-cover rounded-full'
                />
                <div className='w-full'>
                  <h5 className='pl-3 text-[20px] font-[500] dark:text-white text-black'>
                    Giving a Rating <span className='text-red-500'>*</span>
                  </h5>
                  <div className='flex w-full ml-2 pb-3'>
                    {[1, 2, 3, 4, 5].map((i) =>
                      rating >= i ? (
                        <AiFillStar
                          key={i}
                          className='mr-1 cursor-pointer'
                          color='rgb(246,186,0)'
                          size={25}
                          onClick={() => setRating(i)}
                        />
                      ) : (
                        <AiOutlineStar
                          key={i}
                          className='mr-1 cursor-pointer'
                          color='rgb(246,186,0)'
                          size={25}
                          onClick={() => setRating(i)}
                        />
                      )
                    )}
                  </div>
                  <textarea
                    name=''
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    id=''
                    cols={40}
                    rows={5}
                    placeholder='Write your comment...'
                    className='outline-none bg-transparent ml-3 border dark:border-[#ffffff57] border-[#00000057] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins'
                  ></textarea>
                </div>
              </div>
              <div className='w-full flex justify-end'>
                <div
                  className={`${styles.button} !w-[120px] !h-[40px] text-[18px] 800px:mr-0 mr-2 ${
                    reviewCreationLoading && "cursor-no-drop"
                  } `}
                  onClick={reviewCreationLoading ? () => {} : handleReviewSubmit}
                >
                  Submit
                </div>
              </div>
            </>
          )}
          <br />
          <div className='w-full h-[1px] dark:bg-[#ffffff3b] bg-[#00000057]'></div>
          <div className='w-full'>
            {(course?.reviews && [...course.reviews].reverse())?.map((item: any, index: number) => (
              <div className='w-full my-5 dark:text-white text-black' key={index}>
                <div className='w-full flex'>
                  <div>
                    <Image
                      src={
                        item.user.avatar
                          ? item.user.avatar.url
                          : "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png"
                      }
                      alt=''
                      width={50}
                      height={50}
                      className='w-[50px] h-[50px] object-cover rounded-full'
                    />
                  </div>
                  <div className='pl-3 dark:text-white text-black'>
                    <h1 className='text-[20px]'>{item?.user.name}</h1>
                    <Ratings rating={item.rating} />
                    <p>{item.comment}</p>
                    <small className='text-[#000000b8] dark:text-[#ffffff83]'>
                      {!item.createdAt ? "" : format(item?.createdAt)} •
                    </small>
                  </div>
                </div>
                {user.role === "admin" && (
                  <span
                    className={`800px:pl-16 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2`}
                    onClick={() => {
                      setIsReviewReply(!isReviewReply), setReviewId(item._id);
                    }}
                  >
                    {!isReviewReply ? (item.commentReplies.length !== 0 ? "All Replies" : "Add Reply") : "Hide Replies"}
                  </span>
                )}

                {isReviewReply && (
                  <div className='w-full flex relative'>
                    <input
                      type='text'
                      placeholder='Enter your reply...'
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#000] dark:border-[#fff] p-[5px] w-[95%]`}
                    />
                    <button className='absolute right-0 bottom-1' type='submit' onClick={handleReviewReplySubmit}>
                      Submit
                    </button>
                  </div>
                )}
                {isReviewReply && (
                  <>
                    {item.commentReplies.map((i: any, id: number) => (
                      <div className='w-full flex 800px:ml-12 my-5 text-black dark:text-white' key={id}>
                        <div className='w-[50px] h-[50px]'>
                          <Image
                            src={
                              i.user.avatar
                                ? i.user.avatar.url
                                : "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png"
                            }
                            alt=''
                            width={50}
                            height={50}
                            className='w-[50px] h-[50px] object-cover rounded-full'
                          />
                        </div>
                        <div className='pl-3'>
                          <div className='flex items-center'>
                            <h5 className='text-[20px]'>{item.user.name}</h5>
                            {item.user.role === "admin" && (
                              <VscVerifiedFilled className='text-[#0095F6] ml-2 text-[20px]' />
                            )}
                          </div>
                          <p>{i.comment}</p>
                          <small className='text-[#0000009e] dark:text-[#ffffff83]'>{format(i.createdAt)} •</small>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <>
      <div className='w-full my-3'>
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            item={item}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({ setQuestionId, item, answer, setAnswer, handleAnswerSubmit, answerCreationLoading }: any) => {
  const { theme, setTheme } = useTheme();
  const [replyActive, setReplyActive] = useState(false);

  return (
    <>
      <div className='my-4'>
        <div className='flex mb-2'>
          <div>
            <Image
              src={
                item.user.avatar
                  ? item.user.avatar.url
                  : "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png"
              }
              alt=''
              width={50}
              height={50}
              className='w-[50px] h-[50px] object-cover rounded-full'
            />
          </div>
          <div className='pl-3 dark:text-white text-black'>
            <h5 className='text-[20px]'>{item?.user.name}</h5>
            <p>{item?.question}</p>
            <small className='text-[#000000b8] dark:text-[#ffffff83]'>
              {!item.createdAt ? "" : format(item?.createdAt)} •
            </small>
          </div>
        </div>
        <div className='flex w-full items-center'>
          <span
            className='800px:pl-16 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2'
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive ? (item.questionReplies.length !== 0 ? "All Replies" : "Add Reply") : "Hide Replies"}
          </span>
          <BiMessage className='cursor-pointer' size={20} fill={`${theme === "dark" ? "#ffffff83" : "#000000b8"}`} />
          <span className='pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]'>
            {item.questionReplies ? item.questionReplies.length : 0}
          </span>
        </div>
        {replyActive && (
          <>
            {item.questionReplies.map((item: any) => (
              <div key={item._id} className='w-full flex 800px:ml-16 my-5 text-black dark:text-white'>
                <div>
                  <Image
                    src={
                      item.user.avatar
                        ? item.user.avatar.url
                        : "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png"
                    }
                    alt=''
                    width={50}
                    height={50}
                    className='w-[50px] h-[50px] object-cover rounded-full'
                  />
                </div>
                <div className='pl-3'>
                  <div className='flex items-center'>
                    <h5 className='text-[20px]'>{item.user.name}</h5>
                    {item.user.role === "admin" && <VscVerifiedFilled className='text-[#0095F6] ml-2 text-[20px]' />}
                  </div>{" "}
                  <p>{item.answer}</p>
                  <small className='text-[#ffffffff83]'>{format(item.createdAt)} •</small>
                </div>
              </div>
            ))}
            <div className='w-full flex relative dark:text-white text-black'>
              <input
                type='text'
                placeholder='Enter your answer...'
                value={answer}
                onChange={(e: any) => setAnswer(e.target.value)}
                className={`block 800px:ml-2 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:border-[#fff] dark:text-white text-black p-[5px] w-[95%] ${
                  answer === "" || (answerCreationLoading && "cursor-not-allowed")
                }`}
              />
              <button
                type='submit'
                className='absolute right-0 bottom-1'
                onClick={handleAnswerSubmit}
                disabled={answer === "" || answerCreationLoading}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
