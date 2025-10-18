import axios from "axios";

const API_URL = "http://localhost:8080/api/skills";

export const getAllSkills = () => axios.get(API_URL);
export const getUserSkills = (userId) => axios.get(`${API_URL}/user/${userId}`);
export const addSkill = (skill) => axios.post(API_URL, skill);
export const updateSkill = (id, skill) => axios.put(`${API_URL}/${id}`, skill);
export const deleteSkill = (id) => axios.delete(`${API_URL}/${id}`);