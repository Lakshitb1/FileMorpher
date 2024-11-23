import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

export const convertFile = (formData) =>
  API.post("/convertFile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
