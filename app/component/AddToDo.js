"use client"; // If using Next.js, this should be at the top
import React from "react";
import { useForm } from "react-hook-form";

const AddTodo = ({ addTodo }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await addTodo(data.title, data.description);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 my-4 p-6 rounded-lg shadow-md w-full bg-customColor"
    >
      {/* Title Input */}
      <input
        type="text"
        {...register("title", { required: "Title is required" })}
        className={`border p-3 rounded-md focus:outline-none focus:ring-2 bg-customColor text-white ${
          errors.title
            ? "border-red-500 focus:ring-red-500"
            : "focus:ring-black"
        }`}
        placeholder="Task Title"
      />
      {errors.title && (
        <span className="text-red-500 text-sm">{errors.title.message}</span>
      )}

      {/* Description Input */}
      <input
        {...register("description", {
          required: "Description is required",
          minLength: {
            value: 5,
            message: "Description must be at least 10 characters",
          },
        })}
        className={`border p-3 rounded-md focus:outline-none focus:ring-2 bg-customColor text-white  ${
          errors.description
            ? "border-red-500 focus:ring-red-500"
            : "focus:ring-black"
        }`}
        placeholder="Task Description"
        rows={4}
      />
      {errors.description && (
        <span className="text-red-500 text-sm">
          {errors.description.message}
        </span>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-customColor border border-borderColore text-white  p-2  transition duration-200  self-center  w-[10%] rounded-lg"
      >
        +
      </button>
    </form>
  );
};

export default AddTodo;
