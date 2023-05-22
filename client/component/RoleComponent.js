import React, { useEffect, useState } from "react";
import {
  setData as setDataStore,
  setError as setStoreError,
  setLoading as setStoreLoading,
} from "@/store/slices/storesSlice";
import { useRouter } from "next/router";
import StoreService from "@/service/StoreService";
import { useDispatch, useSelector } from "react-redux";
import Admin from "@/layout/Profile/Admin";
import User from "@/layout/Profile/User";
import Clinic from "@/layout/Profile/Clinic";
import Loader from "./Loader";

export default function RoleComponent() {
  const RoleComponentMap = {
    1: Admin,
    2: User,
    3: Clinic,
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector((state) => state.users);

  const RoleComponent = RoleComponentMap[data.role_id] || Admin;

  useEffect(() => {
    async function fetchProfile() {
      try {
        dispatch(setStoreLoading(true));
        const getStore = await StoreService.Search();
        if (getStore) {
          dispatch(setDataStore(getStore.data));
        } else {
          dispatch(setStoreError("An error occurred while fetching the data."));
        }
        // console.log(getStore);
      } finally {
        dispatch(setStoreLoading(false));
      }
    }
    fetchProfile();
  }, [router.pathname]);

  return (
    isLoading?(
      <>
        <Loader></Loader>
      </>):(<RoleComponent/>)
  );
}
