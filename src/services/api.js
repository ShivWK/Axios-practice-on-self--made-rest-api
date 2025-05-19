import axios from "axios";

localStorage.setItem("token", "bearer abc123");

const ai = axios.create({
  baseURL: "http://localhost:3000",
  transformRequest: [
    function (data, headers) {
      if (data && typeof data === "object") {
        data.timestamp = "17/6/2025";
        return JSON.stringify(data);
      }

      return data;
    },
  ],
  transformResponse: [
    function (data, headers) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    },
  ],
  headers: {
    "Content-Type": "application/json",
  },
  onUploadProgress: ({ total, progress, loaded }) => {
    // console.log(
    //   "Upload ",
    //   "progress:" + " " + progress,
    //   "Total: " + total,
    //   loaded
    // );
  },

  onDownloadProgress: ({ total, progress, loaded }) => {
    // console.log(
    //   "download ",
    //   "progress:" + " " + progress,
    //   "Total: " + total,
    //   loaded
    // );
  },
  timeout: 3000,
});

ai.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = "bearer abc123";
    }

    return config;
  },
  (err) => {
    alert("Some error occured", err);
  }
);

ai.interceptors.response.use(
  (response) => response,
  (err) => {
    console.log("error ji", err);

    if (err.response && err.response.status === 403) {
      console.log("Unauthorised, token doesn't match");
    }

    return Promise.reject(err);
  }
);

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

export const handleWaitApi = async () => {
  try {
    let response = await ai.get("/api/waitBaby");
    alert(response.data.message);
  } catch (err) {}
};

// const delay = () => new Promise((res) => setTimeout(res, 2000));

// export const handleUnstableApi = async (retry = 3) => {
//   try {
//     const response = await ai.get("/api/unstable-endpoint");
//     alert(response.data.message);
//   } catch (err) {
//     if (retry > 0) {
//       console.log(`Retrying... attempts left: ${retry - 1}`);
//       await delay();
//       return handleUnstableApi(retry - 1); // 🟢 important: RETURN this
//     }

//     // 🛑 FINAL error if all retries fail
//     throw err;
//   }
// };

const delay = () =>
  new Promise((res, rej) => {
    setTimeout(res, 2000);
  });

export const handleUnstableApi = async (retry = 3) => {
  try {
    const response = await ai.get("/api/unstable-endpoint");
    console.log(response.data.message);
  } catch (err) {
    if (retry > 0) {
      await delay();
      console.log("retring...", "remaining attempts: ", retry - 1);
      return handleUnstableApi(retry - 1);
    }

    throw err;
  }
};
