// config.ts

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : "https://emailtracking.onrender.com/";

export default API_URL;
