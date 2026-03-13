import axios from "axios";

const API_URL = "http://localhost:8081/organizations";

export const createOrganization = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const getOrganizationById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getAllOrganizations = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateOrganization = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteOrganization = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};