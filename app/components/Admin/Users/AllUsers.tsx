import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMail } from "react-icons/ai";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const { user } = useSelector((state: any) => state.auth);
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [updateUserRole, { error: updateError, isSuccess }] = useUpdateUserRoleMutation();
  const { isLoading, data, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteUserMutation({});

  useEffect(() => {
    if (deleteSuccess) {
      setOpen(false);
      toast.success("User Deleted Successfully");
      refetch();
    }

    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setActive(false);
    }

    if (deleteSuccess) {
      refetch();
      toast.success("Delete user successfully");
      setOpen(false);
    }

    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [deleteSuccess, deleteError, isSuccess]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.7 },
    { field: "role", headerName: "Role", flex: 0.2 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            setActive(!active);
            setEmail(params.row.email);
            setRole(params.row.role);
          }}
        >
          <AiOutlineEdit className='dark:text-white text-black' size={20} />
        </Button>
      ),
    },
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
    const newData = data && data.users.filter((item: any) => item.role === "admin" && item._id !== user._id);

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
      data.users
        .filter((u: any) => u._id !== user._id)
        .forEach((item: any) => {
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

  const handleSubmit = async () => {
    setActive(!active);
    await updateUserRole({ email, role });
  };

  const handleDelete = async () => {
    await deleteUser(userId);
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
            height='80vh'
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
          {active && (
            <Modal
              open={active}
              onClose={() => setActive(false)}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#101525] p-4'>
                <h1 className={`${styles.title}`}>Change User Role</h1>
                <div className='mt-4'>
                  <input
                    type='email'
                    name='email'
                    required
                    id='email'
                    placeholder='Enter email...'
                    className={`${styles.input}`}
                    readOnly
                    value={email}
                  />
                  <select
                    name='role'
                    id='role'
                    className={`${styles.input} dark:bg-[#101525] bg-[#EEEEEE]`}
                    value={role}
                    onChange={(e: any) => setRole(e.target.value)}
                  >
                    <option value='admin'>Admin</option>
                    <option value='user'>User</option>
                  </select>
                </div>
                <div className='flex justify-center mt-4'>
                  <div className={`${styles.button} !w-full h-[30px] bg-[#57c7e5] mx-2`} onClick={handleSubmit}>
                    Submit
                  </div>
                </div>
              </Box>
            </Modal>
          )}

          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#101525] p-4'>
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
