export async function loginUser(credentials) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Ensures session-based authentication
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Login Error:", error);
    return null;
  }
}

export async function logoutUser() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/logout/", {
      method: "POST",
      credentials: "include", // Ensures session-based logout
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Logout Error:", error);
    return null;
  }
}
