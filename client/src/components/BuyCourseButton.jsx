import React, { useState } from "react";
import { Button } from "./ui/button";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function BuyCourseButton({ courseId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.auth || {});

  const navigate = useNavigate();

  const loadRazorpayScript = () =>
    new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve();
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Razorpay script failed to load"));
      document.body.appendChild(script);
      setTimeout(
        () => reject(new Error("Razorpay script load timeout")),
        12000
      );
    });

  const purchaseCourseHandler = async () => {
    if (!user?._id) {
      setError("You need to login first");
      toast.error("You need to login first", {
        position: "bottom-right",
        autoClose: 1000, // 3s
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.post(
        "/purchase/create-checkout-session",
        { courseId }
      );
      if (!res?.data?.success) {
        setError(res?.data?.message || "Failed to start purchase");
        setLoading(false);
        return;
      }

      // for free course
      if (res.data.isFree) {
        window.location.assign(`/course-progress/${courseId}`);
        return;
      }

      // for paid course
      const {
        order_id,
        key_id,
        product_name,
        description,
        contact,
        name,
        email,
      } = res.data;

      if (!order_id || !key_id) {
        setError("Payment gateway initiation failed");
        setLoading(false);
        return;
      }

      await loadRazorpayScript();

      const options = {
        key: key_id,
        order_id: order_id,
        name: product_name,
        description,
        prefill: {
          name,
          email,
          contact,
        },
        handler: async function (response) {
          try {
            const verifyRes = await axiosInstance.post(
              "/purchase/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );
            if (verifyRes?.data?.success) {
              window.location.assign(`/course-progress/${courseId}`);
            } else {
              setError(
                verifyRes?.data?.message || "Payment verification failed"
              );
            }
          } catch (err) {
            setError(err?.response?.data?.message || "Verification error");
            console.error("verify error", err);
          }
        },
        modal: {
          ondismiss: function () {},
        },
        theme: { color: "#2300a3" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        setError(response?.error?.description || "Payment failed");
      });
      rzp.open();
    } catch (err) {
      console.error("BuyCourseButton error:", err);
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        onClick={purchaseCourseHandler}
        className="w-full"
        disabled={loading}
      >
        {loading ? "Processing..." : "Purchase Course"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
