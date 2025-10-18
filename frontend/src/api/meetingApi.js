import axios from "axios";

const API_URL = "http://localhost:8080/api/meetings";

export const createMeeting = (meeting) => axios.post(`${API_URL}/meetings`, meeting);
export const getUserMeetings = (userId) => axios.get(`${API_URL}/user/${userId}`);
export const updateMeetingStatus = (id, status) => axios.put(`${API_URL}/${id}/status?status=${status}`);
export const rescheduleMeeting = (id, data) => axios.put(`${API_URL}/${id}/reschedule`, data);
export const cancelMeeting = (id) => axios.put(`${API_URL}/${id}/cancel`);
export const searchMeetings = (params) => axios.get(`${API_URL}/search`, { params });
