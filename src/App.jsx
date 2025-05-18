import { useForm } from "react-hook-form";
import { useRef } from "react";
import axios from "axios";

const App = () => {
  const formRef = useRef(null);
  const inputRef1 = useRef(null);

  const ai = axios.create({
    baseURL: "http://localhost:3000",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await ai.post("/api/formData", data);
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleGetData = async () => {
    try {
      let response = await ai.get("/api/v1/movies");
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleGetByIdData = async () => {
    const id = inputRef1.current.value;
    try {
      let response = await ai.get(`/api/v1/movies/${id}`);
      inputRef1.current.value = "";
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdatePutData = async () => {
    const id = inputRef1.current.value;
    try {
      let response = await ai.put(`/api/v1/movies/${id}`, {
        name: "New Film Star",
        release: 2013,
        duration: 10,
      });
      inputRef1.current.value = "";
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdatPatchtData = async () => {
    const id = inputRef1.current.value;
    try {
      let response = await ai.patch(`/api/v1/movies/${id}`, {
        name: "New Flim Star",
      });
      inputRef1.current.value = "";
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteData = async () => {
    const id = inputRef1.current.value;
    try {
      let response = await ai.delete(`/api/v1/movies/${id}`);
      inputRef1.current.value = "";
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1 className="text-lg font-bold">
        Form Handling in React by React Hook Form
      </h1>
      <form
        ref={formRef}
        className="flex flex-col gap-6 px-10 py-6 border-2 mx-auto w-fit mt-20"
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="">
          <span className="font-medium mb-0.5">First Name</span>
          <input
            className="border-2 p-1 ml-2"
            style={{
              color: errors.first_name ? "red" : "black",
              borderColor: errors.first_name ? "red" : "black",
            }}
            type="text"
            {...register("first_name", {
              required: { value: true, message: "Field is reqiured" },
              minLength: { value: 3, message: "Give more than 3 letters" },
              maxLength: { value: 10, message: "Not more than 8" },
            })}
          />
        </label>
        {errors.first_name && <span>{errors.first_name.message}</span>}
        <label className="">
          <span className="font-medium mb-0.5 ">Last Name</span>
          <input
            className="border-2 p-1 ml-2"
            type="text"
            {...register("last_name")}
          />
        </label>
        <label className="">
          <span className="font-medium mb-0.5 ">Email</span>
          <input
            className="border-2 p-1 ml-2"
            type="email"
            {...register("email")}
          />
        </label>
        <label className="">
          <span className="font-medium mb-0.5 ">Password</span>
          <input
            className="border-2 p-1 ml-2"
            style={{ color: errors.password ? "red" : "black" }}
            type="password"
            {...register("password", {
              pattern: {
                value:
                  /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}/,
                message:
                  "Should have atleast one aplhabets, number, special charcter",
              },
            })}
          />
        </label>
        {errors.password && <span>{errors.password.message}</span>}

        <label className="">
          <span className="font-medium mb-0.5 ">Phone Number</span>
          <input
            className="border-2 p-1 ml-2"
            type="tel"
            {...register("phone_number")}
          />
        </label>
        <button
          disabled={isSubmitting}
          className="mx-auto px-4 py-1 bg-green-400 text-black font-medium border-2 rounded cursor-pointer active:scale-95"
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>

      <div>
        <input ref={inputRef1} className="border-2 p-1 ml-2" type="text" />
        <button
          onClick={handleGetData}
          className="px-4 py-1 bg-green-400 text-black font-medium border-2 rounded cursor-pointer active:scale-95"
        >
          Get Data
        </button>

        <button
          onClick={handleGetByIdData}
          className="px-4 py-1 bg-green-400 text-black font-medium border-2 rounded cursor-pointer active:scale-95"
        >
          Get single data by id
        </button>

        <button
          onClick={handleUpdatePutData}
          className="px-4 py-1 bg-green-400 text-black font-medium border-2 rounded cursor-pointer active:scale-95"
        >
          Update by put
        </button>

        <button
          onClick={handleUpdatPatchtData}
          className="px-4 py-1 bg-green-400 text-black font-medium border-2 rounded cursor-pointer active:scale-95"
        >
          Update by patch
        </button>

        <button
          onClick={handleDeleteData}
          className="px-4 py-1 bg-green-400 text-black font-medium border-2 rounded cursor-pointer active:scale-95"
        >
          Delete data by id
        </button>
      </div>
    </>
  );
};

export default App;
