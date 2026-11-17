
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Admin login

export const loginAdmin = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Login API response:", data);
      throw new Error(data.message || `Login failed: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Login request failed:", error);
    throw error;
  }
};


// Check logged-in admin
export const getAdminProfile = async () => {
  const response = await fetch(`${API_URL}/api/admin/profile`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Authentication required");
  }

  return data.admin;
};

// Admin logout
export const logoutAdmin = async () => {
  const response = await fetch(`${API_URL}/api/admin/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Logout failed");
  }

  return data;
};
