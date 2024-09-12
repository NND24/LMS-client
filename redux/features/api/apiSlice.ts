import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, userLoggedOut } from "../auth/authSlice";
import { RootState } from "@/redux/store";

interface RefreshResponse {
  accessToken: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    let token = (getState() as RootState).auth.token;
    if (!token) {
      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      token = parsedUser?.accessToken || null;
    }
    console.log(token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    if (refreshResult.data) {
      const refreshData = refreshResult.data as RefreshResponse;
      const { accessToken } = refreshData;
      const user = (api.getState() as RootState).auth.user;

      await localStorage.setItem("user", JSON.stringify({ user, accessToken }));
      api.dispatch(setCredentials({ user, accessToken }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(userLoggedOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: (data) => ({
        url: "refreshToken",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    loadUser: builder.query({
      query: (data) => ({
        url: "me",
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            setCredentials({
              accessToken: result.data.activationToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {}
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
