import axios from "axios";

const API_URL = "http://localhost:8081/roles";

export const createRole = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const getRoleById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getAllRoles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateRole = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteRole = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getRolesWithPagination = async (page, size) => {
  const response = await axios.get(`${API_URL}/pagination?page=${page}&size=${size}`);
  return response.data;
};

export const assignPermission = async (roleId, permissionId) => {
  const response = await axios.post(`${API_URL}/${roleId}/permissions/${permissionId}`);
  return response.data;
};

export const assignRoleToUser = async (roleId, userId) => {
  const response = await axios.post(`${API_URL}/${roleId}/users/${userId}`);
  return response.data;
};