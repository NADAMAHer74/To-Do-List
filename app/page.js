"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AddTodo from "./component/AddToDo";
import TypingEffect from "./component/TypingEffect";
export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async (title, description) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      fetchTodos();
    }
  };

  const toggleComplete = async (todo) => {
    const res = await fetch(`/api/tasks/${todo._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    if (res.ok) fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  return (
    <div>
      <div className="container">
        <div className="flex flex-row sm:flex-row justify-center items-center  ">
          <div className="h-full  w-[800px] px-6 py-4 overflow-y-auto my-auto">
            {/* Form to add a new todo */}
            <AddTodo addTodo={addTodo} />

            {/* List of todos */}
            <TypingEffect text="Tasks List" speed={100} />

            <div className="bg-customColor rounded-lg shadow-md overflow-hidden p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-4">
              <div className="grid grid-cols-1 gap-4 mb-4">
                <ul>
                  {todos.map((todo) => (
                    <li
                      key={todo._id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b last:border-b-0"
                    >
                      <div className="mb-2 sm:mb-0  flex items-center flex-row">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleComplete(todo)}
                          className="mr-2 cursor-pointer"
                        />
                        <span
                          className={`block text-lg ${
                            todo.completed
                              ? "line-through text-gray-400"
                              : "text-white"
                          }`}
                        >
                          {todo.title}
                        </span>
                        <span className="block text-gray-400 ml-2 ">
                          {todo.description}
                        </span>
                      </div>
                      <div className="flex md:gap-4 gap-32">
                        <Link
                          type="button"
                          href={`/tasks/${todo._id}`}
                          className="text-white border  bg-customColor border border-borderColor  font-medium rounded-lg text-sm px-3 text-center py-2"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => deleteTodo(todo._id)}
                          className="text-white     bg-customColor font-medium rounded-lg text-sm px-3 border border-borderColor   text-center py-2"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
