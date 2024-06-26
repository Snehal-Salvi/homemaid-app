import React, { useEffect, useState } from "react";
import Maid from "../../components/maid/Maid";
import Spinner from "../../components/spinner/Spinner";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../constants"; // Ensure this points to your backend URL

export default function MaidScreen() {
  const [maids, setMaids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch maids data from the backend
  const fetchMaids = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/maids`);
      setMaids(response.data);
    } catch (err) {
      setError(err);
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch maids data when component mounts
  useEffect(() => {
    fetchMaids();
  }, []);

  // Show loading spinner while fetching maids
  if (isLoading) {
    return <Spinner />;
  }

  // Show error message if there's an error fetching maids
  if (error) {
    return <p>Error loading maids. Please try again later.</p>;
  }

  // Check if maids data is valid before rendering
  if (!maids || maids.length === 0) {
    return <p>No maids available at the moment.</p>;
  }

  // Render maids once data is loaded
  return (
    <div>
      {maids.map((maid, i) => (
        <Maid key={maid._id || i} maid={maid} />
      ))}
    </div>
  );
}
