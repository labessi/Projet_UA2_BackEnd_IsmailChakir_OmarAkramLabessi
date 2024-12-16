import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Vérifiez que cela correspond à votre backend
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Erreur API :", error.response.data);
      if (error.response.status === 401) {
        alert("Session expirée, veuillez vous reconnecter.");
        window.location.href = "/login";
      }
    } else {
      console.error("Erreur réseau :", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
