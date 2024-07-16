import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { useDeleteUserMutation, useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const { isLoading, data, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteUserMutation({});

  useEffect(() => {
    if (deleteSuccess) {
      setOpen(false);
      toast.success("User Deleted Successfully");
      refetch();
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [deleteSuccess, deleteError]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            setOpen(!open);
            setUserId(params.row.id);
          }}
        >
          <AiOutlineDelete className='dark:text-white text-black' size={20} />
        </Button>
      ),
    },

    {
      field: "sendEmail",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => (
        <a href={`mailto:${params.row.email}`}>
          <AiOutlineMail className='dark:text-white text-black' size={20} />
        </a>
      ),
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData = data && data.users.filter((item: any) => item.role === "admin");

    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
    setOpen(false);
  };

  return (
    <div className='mt-[120px]'>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m='20px'>
          <div className='w-full flex justify-end'>
            <div
              className={`${styles.button} !w-[200px] dark:bg-[#57c7a3] !h-[35px] dark:border dark:border-[#ffffff6c] `}
              onClick={() => setActive(!active)}
            >
              Add New Member
            </div>
          </div>
          <Box
            m='40px 0 0 0'
            height='66vh'
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
                alignItems: "center",
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
              <Box className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-4'>
                <h1 className={`${styles.title}`}>Are you sure you want to delete this user?</h1>
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

export default AllUsers;
