import axios from "axios";

const ai = axios.create({
  baseURL: "http://localhost:3000",
});

export const onSubmit = async (data) => {
  try {
    let response = await ai.post("/api/formData", data);
    console.log(response);
  } catch (err) {
    console.error(err.message);
  }
};

export const handleGetData = async () => {
  try {
    let response = await ai.get("/api/v1/movies");
    console.log(response);
  } catch (err) {
    console.error(err.message);
  }
};

export const handleGetByIdData = async (id) => {
  try {
    let response = await ai.get(`/api/v1/movies/${id}`);
    console.log(response);
  } catch (err) {
    console.error(err.message);
  }
};

export const handleUpdatePutData = async (id) => {
  try {
    let response = await ai.put(`/api/v1/movies/${id}`, {
      name: "New Film Star",
      release: 2013,
      duration: 10,
    });
    console.log(response);
  } catch (err) {
    console.error(err.message);
  }
};

export const handleUpdatePatchtData = async (id) => {
  try {
    let response = await ai.patch(`/api/v1/movies/${id}`, {
      name: "New Flim Star",
    });
    console.log(response);
  } catch (err) {
    console.error(err.message);
  }
};

export const handleDeleteData = async (id) => {
  try {
    let response = await ai.delete(`/api/v1/movies/${id}`);
    console.log(response);
  } catch (err) {
    console.error(err.message);
  }
};
