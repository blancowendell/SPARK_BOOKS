import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/ActionsCenter/Alerts/Toast";
import FloatingInput from "../../../components/Forms/FloatingInput";

import SecurityAPI from "../../../api/private/security/securityAPI";

const SecurityPage = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showErrorToast("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // 🔥 Call your API here
      const response = await SecurityAPI.editUsernamePassword(
        username,
        currentPassword,
        password,
        confirmPassword
      );

      if (response.msg === "success") {
        showSuccessToast("Credentials updated successfully!");
        navigate("/index");
      } else {
        showErrorToast(response.msg || "Failed to update credentials");
      }
    } catch (err) {
      showErrorToast(
        err.response?.data?.msg ||
          "Failed to update credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Mock devices (replace later with API call)
  const devices = [
    {
      id: 1,
      type: "desktop",
      name: "Dell 24”",
      location: "London, UK",
      date: "May 12, 2023 at 2:30 AM",
    },
    {
      id: 2,
      type: "laptop",
      name: "Macbook Air",
      location: "London, UK",
      date: "May 12, 2023 at 2:30 AM",
    },
    {
      id: 3,
      type: "mobile",
      name: "iPhone 14 Pro Max",
      location: "London, UK",
      date: "May 12, 2023 at 2:30 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit}>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--main-color)" }}
          >
            Change Password
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            To change your password, please fill in the fields below. <br />
            Your password must contain at least 8 characters, including an
            uppercase letter, lowercase letter, number, and special character.
          </p>

          <div className="space-y-4">
            <div>
              <FloatingInput
                id="username"
                label="New Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={false}
              />
            </div>
            <div>
              <FloatingInput
                id="currentPassword"
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required={true}
              />
            </div>
            <div>
              <FloatingInput
                id="password"
                label="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>
            <div>
              <FloatingInput
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={true}
              />
            </div>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full mt-6 h-12 rounded-lg"
            style={{
              backgroundColor: "var(--main-color)",
              border: "none",
              color: "var(--main-text-color)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--main-hover-color)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--main-color)")
            }
          >
            {loading ? "Updating..." : "Change Password"}
          </Button>
        </form>

        {/* Right side - Devices */}
        <div className="flex flex-col h-full">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--main-color)" }}
          >
            Your Devices
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            These devices are linked to your account.
          </p>

          <Button
            type="default"
            className="mb-6 w-full h-11 rounded-lg font-semibold"
            style={{
              borderColor: "var(--main-color)",
              color: "var(--main-color)",
            }}
          >
            Log Out From All Devices
          </Button>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {devices.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between border p-3 rounded-lg hover:shadow-md transition"
              >
                <div>
                  <p className="font-medium text-gray-800">{device.name}</p>
                  <p className="text-xs text-gray-500">
                    {device.location} • {device.date}
                  </p>
                </div>
                <Button size="small" type="text" className="text-blue-600">
                  Log Out
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
