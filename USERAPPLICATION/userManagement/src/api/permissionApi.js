import axios from "axios";

const API_URL = "http://localhost:8081/permissions";

export const getPermissions = (page = 0, size = 10) =>
  axios.get(`${API_URL}?page=${page}&size=${size}`);

export const createPermission = (data) =>
  axios.post(API_URL, data);

export const updatePermission = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deletePermission = (id) =>
  axios.delete(`${API_URL}/${id}`);