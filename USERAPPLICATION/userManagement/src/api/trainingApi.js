import axios from "axios";

const API_URL = "http://localhost:8081/trainings";

export const createTraining = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const getTrainingById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getAllTrainings = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateTraining = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteTraining = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};