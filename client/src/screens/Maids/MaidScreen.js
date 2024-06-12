import React from "react";
import { useEffect } from "react";
import Maid from "../../components/maid/Maid";
import { useGetMaidsQuery } from "../../slices/maidsApiSlice";
import Spinner from "../../components/spinner/Spinner";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import { setCredentials } from "../../slices/userSlice";

export default function MaidScreen() {
  const dispatch = useDispatch();
  const { data: maids, isLoading, error } = useGetMaidsQuery();

  // Function to fetch user data from backend
  const getUser = async () => {
    try {
      // Send request to backend to check if user is authenticated
      const res = await axios.get(`${BACKEND_URL}/auth/login/success`, {
        withCredentials: true,
      });
      // Dispatch user credentials to Redux store if authenticated
      dispatch(
        setCredentials({
          ...res.data.user._json,
          _id: res.data._id,
          isAdmin: res.data.user.isAdmin,
        })
      );
    } catch (error) {
      // Handle errors
      toast.error(error?.data?.message || error?.error);
    }
  };

  // Fetch user data when component mounts
  useEffect(() => {
    getUser();
  }, []); 

  // Show loading spinner while fetching maids
  if (isLoading) {
    return <Spinner />;
  }

  // Show error message if there's an error fetching maids
  if (error) {
    toast.error(error?.data?.message || error?.error);
  }

  // Render maids once data is loaded
  return (
    <div>
      {maids.map((maid, i) => (
        <Maid key={i} maid={maid} />
      ))}
    </div>
  );
}
