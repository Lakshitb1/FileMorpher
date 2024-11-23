import axios from "axios";

const API = axios.create({ baseURL: "https://file-morpher.vercel.app" });

export const convertFile = (formData) =>
  API.post("/convertFile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
