import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../firebase";
import { toastifySuccess, toastifyError } from "./common/Toastify";

const initialState = {
  taskName: "",
  description: "",
  date: "",
};

const CreateTask = () => {
  const [task, setTask] = useState(initialState);

  const handlerSubmitTask = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        taskName: task.taskName,
        description: task.description,
        date: task.date,
        result: false,
        createdAt: serverTimestamp(),
        comments: [],
      });
      toastifySuccess("New Task Created.");
      setTask(initialState);
    } catch (error) {
      toastifyError("Something went wrong");
      console.log(error);
    }
  };

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <>
      <div className="w-full max-w-full">
        <h1 className="text-center text-2xl font-medium mb-6">Create New Task</h1>
        <div className="w-full">
          <form className="flex flex-col relative w-full space-y-4" onSubmit={handlerSubmitTask}>
            <input type="text" placeholder="Task Name" className="input input-bordered w-full bg-secondary text-white placeholder:text-gray-300" name="taskName" value={task.taskName} onChange={handlerChange}/>
            <input type="text" placeholder="Description" className="input input-bordered w-full bg-secondary text-white placeholder:text-gray-300" name="description" value={task.description} onChange={handlerChange}/>
            <input type="date" placeholder="Select Submission Date" className="input input-bordered w-full bg-secondary text-white placeholder:text-gray-300" name="date" value={task.date} onChange={handlerChange}/>
            <button className="btn btn-primary" type="submit">
              Create Task
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTask;
