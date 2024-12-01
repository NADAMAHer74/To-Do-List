"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

const EditTask = () => {
  const router = useRouter();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    const response = await fetch(`/api/tasks/${id}`);
    if (response.ok) {
      const data = await response.json();
      // Set the fetched task data as default values for the form
      setValue("title", data.title);
      setValue("description", data.description);
    } else {
      console.error("Failed to fetch task");
    }
  };

  const onSubmit = async (data) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/"); // Redirect after successful edit
    }
  };

  return (
    <div className="container  my-32  ">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Task</h1>
      <div className="flex justify-center ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mb-4 p-6 rounded-lg shadow-md w-[300px] md:w-[400px] bg-customColor "
        >
          <div className="mb-4">
            <label
              className=" text-sm font-medium text-gray-400 mb-3"
              htmlFor="title"
            >
              Task Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })} // Register the input with react-hook-form
              placeholder="Task Title"
              className={`bg-customColor  w-full p-2 border rounded-md focus:border-black focus:outline-none focus:ring-1 text-white  ${
                errors.title ? "border-red-500" : ""
              }`}
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className=" text-sm font-medium text-gray-400 mb-3"
              htmlFor="description"
            >
              Task Description
            </label>
            <input
              id="description"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 5,
                  message: "Description must be at least 10 characters",
                },
              })}
              placeholder="Task Description"
              className={`bg-customColor w-full p-2 border  rounded-md focus:border-black focus:outline-none focus:ring-1 text-white  ${
                errors.description ? "border-red-500" : ""
              }`}
              rows={4}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="bg-customColor text-white px-6 py-2 text-nowrap transition duration-200 border border-borderColor self-center w-[50%] rounded-lg"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
