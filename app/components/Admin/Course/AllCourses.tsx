"use client";

import { useDeleteCourseMutation, useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import Link from "next/link";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");

  const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      toast.success("Course Deleted Successfully");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, refetch]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => (
        <Link href={`/admin/edit-course/${params.row.id}`}>
          <FiEdit2 className='dark:text-white text-black' size={20} />
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            setOpen(true);
            setCourseId(params.row.id);
          }}
        >
          <AiOutlineDelete className='dark:text-white text-black' size={20} />
        </Button>
      ),
    },
  ];

  const rows: any = [];

  if (data) {
    data.courses.forEach((item: any) => {
      rows.push({
        id: item._id,
        title: item.name,
        purchased: item.purchased,
        ratings: item.ratings,
        created_at: format(item.createdAt),
      });
    });
  }

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
    setOpen(false);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m='20px'>
          <Box
            m='30px 0 0 0'
            height='83vh'
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom: theme === "dark" ? "1px solid #ffffff30 !important" : "1px solid #ccc !important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
                display: "flex",
                alignItems: "center !important",
                justifyContent: "center !important",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-container--top [role=row]": {
                backgroundColor: theme === "dark" ? "#3e4396 !important" : "#a4a9fc !important",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaderTitleContainer": {
                justifyContent: "center",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
              },
              "& .MuiCheckbox-root": {
                color: theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolBarContainer .MuiButton-text": {
                color: "#fff !important",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#101525] p-4'>
                <h1 className={`${styles.title}`}>Are you sure you want to delete this course?</h1>
                <div className='flex justify-center mt-4'>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7e5] mx-2`}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </div>
                  <div className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f] mx-2`} onClick={handleDelete}>
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
