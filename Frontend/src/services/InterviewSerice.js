import apiClient from "./apiClient";

const interviewService = {
  postInterviewSetup: () => apiClient.post("/interviews/setup"),
  getInterviews: () => apiClient.get("/interviews"),
  getInterviewById: (id) => apiClient.get(`/interviews/${id}`),
  createInterview: (data) => apiClient.post("/interviews", data),
  updateInterview: (id, data) => apiClient.put(`/interviews/${id}`, data),
  deleteInterview: (id) => apiClient.delete(`/interviews/${id}`),
};

export default interviewService;
