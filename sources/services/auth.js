export class AuthService {
  constructor() {
    this.user = null; // Stores the logged-in user
  }

  async loginUser(credentials) {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Session-based authentication
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      this.user = data.user; // Store user data
      return data;
    } catch (error) {
      console.error("Login Error:", error);
      return null;
    }
  }

  async logoutUser() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout/", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Logout failed");

      this.user = null; // Clear user data
      return await response.json();
    } catch (error) {
      console.error("Logout Error:", error);
      return null;
    }
  }

  isAuthenticated() {
    return this.user !== null; // Check if the user is logged in
  }
}
