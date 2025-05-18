import { useForm } from "react-hook-form";
import { useRef } from "react";

import {
  onSubmit,
  handleGetData,
  handleGetByIdData,
  handleUpdatePutData,
  handleUpdatePatchtData,
  handleDeleteData
} from "./services/api";

const App = () => {
  const inputRef1 = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();


  return (
    <>
      <h1 className="text-lg font-bold">
        Form Handling in React by React Hook Form
      </h1>
      <form
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
          onClick={() => handleGetByIdData(inputRef1.current.value)}
          className="px-4 py-1 bg-green-400 text-black font-medium border-2 rounded cursor-pointer active:scale-95"
        >
          Get single data by id
        </button>

        <button
          onClick={() => handleUpdatePutData(inputRef1.current.value)}
          className="px-4 py-1 bg-green-400 text-black font-medium border-2 rounded cursor-pointer active:scale-95"
        >
          Update by put
        </button>

        <button
          onClick={() => handleUpdatePatchtData(inputRef1.current.value)}
          className="px-4 py-1 bg-green-400 text-black font-medium border-2 rounded cursor-pointer active:scale-95"
        >
          Update by patch
        </button>

        <button
          onClick={() => {
            handleDeleteData(inputRef1.current.value)
          }}
          className="px-4 py-1 bg-green-400 text-black font-medium border-2 rounded cursor-pointer active:scale-95"
        >
          Delete data by id
        </button>
      </div>
    </>
  );
};

export default App;
