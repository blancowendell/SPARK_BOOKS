import React, { useState } from "react";
import Brand from "../../../assets/images/brand2.png";
import LogInCover from "../../../assets/images/login_cover2.png";
import FloatingInput from "../../../components/Forms/FloatingInput";
import authAPI from "../../../api/public/auth/authAPI";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../api/public/auth/parts/authContext";
import {
  showErrorToast,
  showWarningToast,
} from "../../../components/ActionsCenter/Alerts/Toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await authAPI.login(username, password);
      localStorage.setItem("APK", data.token);
      localStorage.setItem("lastRole", data.access_type);
      setSession(data.user || { token: data.token, fullname: data.fullname });
      navigate("/index", { state: { justLoggedIn: true } });
    } catch (err) {
      let msg = "Login failed";

      if (err && typeof err === "object" && "msg" in err) {
        msg = err.msg;
      } else if (typeof err === "string") {
        msg = err;
      } else if (err && err.message) {
        msg = err.message;
      }

      setError(msg);

      if (typeof msg === "string" && msg.toLowerCase().includes("incorrect")) {
        showWarningToast(msg);
      } else {
        showErrorToast(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login form */}
      <div className="flex flex-col justify-center items-center md:w-1/2 w-full bg-gray-100 p-8 sm:p-10">
        <img src={Brand} alt="Brand" className="w-40 mb-3" />

        <h2
          className="text-2xl md:text-3xl font-semibold mb-8 text-center"
          style={{ color: "var(--main-color)" }}
        >
          Admin Login
        </h2>

        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-6">
            <FloatingInput
              id="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <FloatingInput
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

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
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Forgot your password?{" "}
              <a
                href="/forgotpassword"
                className="font-medium"
                style={{ color: "var(--main-color)" }}
              >
                Click here!
              </a>
            </span>
          </div>
        </form>
      </div>

      {/* Right side - Responsive Image */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-6 sm:p-10">
        <div
          className="w-full h-64 sm:h-80 md:h-[90%] rounded-3xl overflow-hidden shadow-lg"
        >
          <img
            src={LogInCover}
            alt="Login Cover"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
