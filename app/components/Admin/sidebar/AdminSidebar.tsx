import React, { FC, useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import defaultAvatar from "../../../../public/assets/avatar.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  ArrowBackIos,
  ArrowForwardIos,
  BarChartOutlined,
  Groups,
  HomeOutlined,
  ManageHistory,
  MapOutlined,
  OndemandVideo,
  PeopleOutline,
  Quiz,
  ReceiptOutlined,
  Settings,
  VideoCall,
  Web,
  Wysiwyg,
} from "@mui/icons-material";
import { RootState } from "@/redux/store";

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <Link href={to}>
      <MenuItem active={selected === title} onClick={() => setSelected(title)} icon={icon}>
        <Typography className='!text-[16px] !font-Poppins'>{title}</Typography>
      </MenuItem>
    </Link>
  );
};

const AdminSidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        "& .ps-menu-button:hover": {
          backgroundColor: `${theme === "dark" && "#142150 !important"}`,
        },
      }}
      className='z-[9999]'
    >
      <Sidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : "16%",
        }}
        className=' text-black dark:text-[#ffffffc1]'
      >
        <Menu className='bg-white dark:bg-[#111c43]'>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIos /> : undefined}
            className='mb-[20px] pt-2'
          >
            {!isCollapsed && (
              <Box display='flex' justifyContent='space-between' alignItems='center' ml='15px'>
                <Link href='/'>
                  <h3 className='text-[25px] font-Poppins dark:text-white text-black'>ELearning</h3>
                </Link>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} className='inline-block cursor-pointer'>
                  <ArrowBackIos className='text-black dark:text-[#ffffffc1]' />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb='25px'>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <Image
                  alt='profile-user'
                  src={user.avatar ? user.avatar.url : defaultAvatar}
                  width={100}
                  height={100}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box textAlign='center'>
                <Typography
                  variant='h4'
                  className='!text-[20px] dark:text-[#ffffffc1] text-dark'
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant='h6'
                  className='!text-[20px] dark:text-[#ffffffc1] text-dark capitalize'
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item title='Dashboard' to='/admin' icon={<HomeOutlined />} selected={selected} setSelected={setSelected} />
            <Typography
              variant='h5'
              sx={{ n: "15px 0 5px 25px" }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item title='Users' to='/admin/users' icon={<Groups />} selected={selected} setSelected={setSelected} />
            <Item
              title='Invoices'
              to='/admin/invoices'
              icon={<ReceiptOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              sx={{ n: "15px 0 5px 25px" }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title='Create Course'
              to='/admin/create-course'
              icon={<VideoCall />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Live Course'
              to='/admin/courses'
              icon={<OndemandVideo />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              sx={{ n: "15px 0 5px 25px" }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && "Customization"}
            </Typography>
            <Item title='Hero' to='/admin/hero' icon={<Web />} selected={selected} setSelected={setSelected} />
            <Item title='FAQ' to='/admin/faq' icon={<Quiz />} selected={selected} setSelected={setSelected} />
            <Item
              title='Categories'
              to='/admin/categories'
              icon={<Wysiwyg />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              sx={{ n: "15px 0 5px 25px" }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title='Mange Team'
              to='/admin/team'
              icon={<PeopleOutline />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              sx={{ n: "15px 0 5px 25px" }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && "Analytics"}
            </Typography>
            <Item
              title='Courses Analytics'
              to='/admin/courses-analytics'
              icon={<BarChartOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Orders Analytics'
              to='/admin/orders-analytics'
              icon={<MapOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Users Analytics'
              to='/admin/users-analytics'
              icon={<ManageHistory />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              sx={{ n: "15px 0 5px 25px" }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <Item
              title='Settings'
              to='/admin/settings'
              icon={<Settings />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default AdminSidebar;
