import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { setUser, userLoggedOut } from "../redux/authSlice";

function useAuthCheck() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const verifyToken = useCallback(async () => {
    if (!user) return;

    try {
      const res = await axiosInstance.get("/user/profile");
      if (res.data?.success && res.data?.user) {
        dispatch(setUser(res.data.user));
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        dispatch(userLoggedOut());
      }
    }
  }, [user, dispatch]);

  // On app load
  useEffect(() => {
    verifyToken();
  }, []);

  // On tab visibility change
  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden && user) verifyToken();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [user, verifyToken]);

  // On window focus
  useEffect(() => {
    const handleFocus = () => {
      if (user) verifyToken();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [user, verifyToken]);

  // Check token every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (user) verifyToken();
    }, 10000);

    return () => clearInterval(interval);
  }, [user, verifyToken]);

  return null;
}

export default useAuthCheck;
