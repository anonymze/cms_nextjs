import axios from "axios";

// axios instance
export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 90 * 1000, // 90 seconds because mobile can have slow connexion
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
});


