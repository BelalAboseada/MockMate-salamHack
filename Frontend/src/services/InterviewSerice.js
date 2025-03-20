import apiClient from "./apiClient";

const interviewService = {
  postInterviewSetup: (data) =>
    apiClient.post("/interview/get-questions", data),
  submitInterview: (id, data) =>
    apiClient.post(`/interview/submit-interview/${id}`, data),
  getInterviewHistory: () => apiClient.get("/interview/get-interviews/"),
};

export default interviewService;
