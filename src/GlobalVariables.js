global.apiUrl = "http://127.0.0.1:8000/api";
global.token = localStorage.getItem("token")
  ? "Bearer " + localStorage.getItem("token").replace(/['"]+/g, "")
  : "";
global.websiteUrl = "http://127.0.0.1:8000/";
