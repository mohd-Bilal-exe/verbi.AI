import { useForm } from "react-hook-form";
import { m } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";
import { rememberMe } from "../Api/aiApi";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isDarkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get the navigate function

  const onSubmit = (data) => {
    dispatch(addUser(data.username, data.nickname, data.email, data.password));
    rememberMe(
      data.password,
      data.username,
      data.nickname,
      "im a software engineer"
    );
    navigate("/profile");
  };

  return (
    <m.section
      key={"LoginPage"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`w-screen h-screen absolute top-0 left-0 z-50 backdrop-blur-sm backdrop-brightness-25 flex justify-center items-center ${
        isDarkMode ? "bg-bg1/10 text-black" : "text-bg1"
      }`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md flex flex-row gap-4"
        style={{ width: "400px" }}
      >
        <input
          type="text"
          {...register("username", { required: "Username is required" })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.username && (
          <span className="text-red-500 text-sm">
            {errors.username.message}
          </span>
        )}
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
        <input
          type="text"
          {...register("nickname")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}

        <div>
          <button type="sumbit">Submit</button>
        </div>
        <div className="mt-4 flex justify-between">
          <button className="w-1/2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Back
          </button>
          <button className="w-1/2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Next
          </button>
        </div>
      </form>
    </m.section>
  );
}
