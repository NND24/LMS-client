import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrderAnalytics from "../Analytics/OrderAnalytics";
import AllInvoices from "../Order/AllInvoices";
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant='determinate'
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open, value }) => {
  const [orderComparePercentage, setOrderComparePercentage] = useState<any>();
  const [userComparePercentage, setUserComparePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      const usersLastTwoMonths = data?.users.last12Months.slice(-2);
      const ordersLastTwoMonths = ordersData?.orders.last12Months.slice(-2);

      if (usersLastTwoMonths?.length === 2 && ordersLastTwoMonths?.length === 2) {
        const usersCurrentMonth = usersLastTwoMonths[1].count;
        const usersPreviousMonth = usersLastTwoMonths[0].count;
        const ordersCurrentMonth = ordersLastTwoMonths[1].count;
        const ordersPreviousMonth = ordersLastTwoMonths[0].count;

        const usersPercentChange =
          usersPreviousMonth !== 0 ? ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) * 100 : 100;
        const ordersPercentChange =
          ordersPreviousMonth !== 0 ? ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) * 100 : 100;

        setUserComparePercentage({
          currentMonth: usersCurrentMonth,
          previousMonth: usersPreviousMonth,
          percentChange: usersPercentChange,
        });
        setOrderComparePercentage({
          currentMonth: ordersCurrentMonth,
          previousMonth: ordersPreviousMonth,
          percentChange: ordersPercentChange,
        });
      }
    }
  }, [data, isLoading, ordersData, ordersLoading]);

  return (
    <div className='min-h-screen'>
      <div className='grid grid-cols-[75%,25%]'>
        <div className='px-8 pb-8'>
          <UserAnalytics isDashboard={true} />
        </div>

        <div className=' pr-8'>
          <div className='w-full dark:bg-[#111c43] rounded-sm shadow'>
            <div className='flex items-center p-[10px] justify-between'>
              <div className=''>
                <BiBorderLeft className='dark:text-[#45cba0] text-[#000] text-[25px]' />
                <h5 className='pt-[5px] font-Poppins dark:text-white text-black text-[18px]'>
                  {" "}
                  {orderComparePercentage?.currentMonth}
                </h5>
                <h5 className='py-[5px] font-Poppins dark:text-[#45cba0] text-black text-[16px] font-[400]'>
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={orderComparePercentage?.percentChange > 0 ? 100 : 0} open={open} />
                <h5 className='text-center pt-4'>
                  {orderComparePercentage?.percentChange > 0
                    ? "+" + orderComparePercentage?.percentChange.toFixed(2)
                    : "-" + orderComparePercentage?.percentChange.toFixed(2)}
                  %
                </h5>
              </div>
            </div>
          </div>

          <div className='w-full dark:bg-[#111c43] rounded-sm shadow-sm my-8'>
            <div className='flex items-center p-[10px] justify-between'>
              <div className=''>
                <PiUsersFourLight className='dark:text-[#45cba0] text-[#000] text-[25px]' />
                <h5 className='pt-[5px] font-Poppins dark:text-white text-black text-[18px]'>
                  {userComparePercentage?.currentMonth}
                </h5>
                <h5 className='py-[5px] font-Poppins dark:text-[#45cba0] text-black text-[16px] font-[400]'>
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={userComparePercentage?.percentChange > 0 ? 100 : 0} open={open} />
                <h5 className='text-center pt-4'>
                  {userComparePercentage?.percentChange > 0
                    ? "+" + userComparePercentage?.percentChange.toFixed(2)
                    : "-" + userComparePercentage?.percentChange.toFixed(2)}
                  %
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-[65%,35%] mt-[-20px]'>
        <div className='dark:bg-[#111c43] w-[94%] mt-[30px] ml-[30px] h-[35vh] shadow-sm m-auto'>
          <OrderAnalytics isDashboard={true} />
        </div>
        <div className='py-4 pr-[30px] pl-4'>
          <h5 className='dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins'>Recent Transaction</h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
