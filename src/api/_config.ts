
import { ENV_CLIENT } from "@/env/client";
import axios from "axios";

// axios instance
export const api = axios.create({
  baseURL: ENV_CLIENT.NEXT_PUBLIC_API_URL,
  timeout: 90 * 1000, // 90 seconds because mobile can have slow connexion
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
