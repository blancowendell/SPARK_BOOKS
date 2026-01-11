import React, { useState } from "react";
import Brand from "../../../assets/images/brand.png";
import FloatingInput from "../../../components/Forms/FloatingInput";
import ForgotPassCover from "../../../assets/images/forgot_password_cover.png";
import authAPI from "../../../api/public/auth/authAPI";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast, showWarningToast } from "../../../components/ActionsCenter/Alerts/Toast";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!email) {
      showWarningToast("Please enter your email.");
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.forgotPassword(email);
      setMessage("Password reset link sent! Check your email.");
      showSuccessToast("Password reset link sent! Check your email.");
    } catch (err) {
      let msg = "Failed to send reset link.";

      if (err && typeof err === "object" && "msg" in err) {
        msg = err.msg;
      } else if (typeof err === "string") {
        msg = err;
      } else if (err && err.message) {
        msg = err.message;
      }

      setMessage(msg);
      showErrorToast(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Forgot Password Form */}
      <div className="flex flex-col justify-center items-center md:w-1/2 w-full bg-gray-100 p-8 sm:p-10">
        <img src={Brand} alt="Brand" className="w-40 mb-3" />

        <h2
          className="text-2xl md:text-3xl font-semibold mb-8 text-center"
          style={{ color: "var(--main-color)" }}
        >
          Forgot Password
        </h2>

        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-6">
            <FloatingInput
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {message && <p className="text-green-500 mb-4">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{ backgroundColor: "var(--main-color)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--main-hover-color)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--main-color)")
            }
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Remember your password?{" "}
              <a
                href="/"
                className="font-medium"
                style={{ color: "var(--main-color)" }}
              >
                Log in here
              </a>
            </span>
          </div>
        </form>
      </div>

      {/* Right side - Optional Image */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-6 sm:p-10">
        <div
          className="w-full h-64 sm:h-80 md:h-[90%] rounded-3xl overflow-hidden shadow-lg"
        >
          <img
            src={ForgotPassCover}
            alt="Forgot Password Cover"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
