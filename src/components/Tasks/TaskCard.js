import React, { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import db from "../../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { toastifySuccess, toastifyError } from "../common/Toastify";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { updateTask } from "../../feature/taskSlice";
import { useDispatch } from "react-redux";
import UpdateModal from "../Modal/UpdateModal";
import { PencilIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

const TaskCard = ({ post }) => {
  const [inputVal, setInputVal] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const convertDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  const handlerDeletePost = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      toastifySuccess("Task deleted successfully");
    } catch (error) {
      toastifyError("Something went wrong");
      console.log(error);
    }
  };

  const handleAddComment = async (e, id) => {
    e.preventDefault();
    const finalComments = [
      { userName: "Rafi Khan", comment: inputVal },
      ...post?.comments,
    ];
    try {
      const docRef = await doc(db, "tasks", id);
      const docSnap = await updateDoc(docRef, {
        comments: finalComments,
      });
      setInputVal("");
    } catch (error) {
      console.log(error);
    }
  };
  const handlerUpdate = async (e, item) => {
    dispatch(
      updateTask({
        id: item.id,
        taskName: item?.taskName,
        description: item?.description,
        date: item?.date,
        status: true,
      })
    );
    setOpenModal(true);
  };

  const handlerComplete = async (e) => {
    e.preventDefault();
    if (post?.result) {
      return;
    }
    const docRef = await doc(db, "tasks", post?.id);
    await updateDoc(docRef, {
      result: true,
    });
    toastifySuccess('Task completed!')
  };

  return (
    <>
      {openModal && <UpdateModal setOpenModal={setOpenModal} />}
      <div className="shadow-xl p-4 rounded-lg bg-gray-800 text-white">
        <div className="flex items-center justify-between">
          <h1>Task Name: {post?.taskName}</h1>
          <div className="cursor-pointer relative shadow-lg" onClick={(e) => handlerDeletePost(post.id)}>
            <TrashIcon className="h-6 w-6 text-red-500 hover:text-red-700" />
          </div>
        </div>
        <div>
          <p>Task Description: </p>
          <p className="font-normal text-gray-300 text-sm line-clamp-3">
            {post?.description}
          </p>
        </div>
        <div className="pt-1 ">
          <p className="text-right">Due Date: {convertDate(post?.date)}</p>
          {post?.result ? (
            <p className="text-right">
              Status:{" "}
              <span className="text-green-500">Completed <CheckCircleIcon className="h-5 w-5 inline-block" /></span>
            </p>
          ) : (
            <p className="text-right">
              Status:{" "}
              <span className="text-red-500 ">
                Pending
                <PencilIcon className="h-5 w-5 inline-block" />
              </span>
            </p>
          )}
        </div>
        <div className="flex justify-between items-center pt-1">
          <button onClick={handlerComplete} className="btn bg-green-500 hover:bg-green-600 border-0 disabled:bg-slate-400 disabled:text-black" disabled={post?.result}>
            { post?.result ? "Completed" : "Mark as Complete"}
          </button>
          <button onClick={(e) => handlerUpdate(e, post)} className="btn bg-blue-600 hover:bg-blue-700 border-0 disabled:bg-slate-400 disabled:text-black" disabled={post?.result}>
            Update
          </button>
        </div>
        <div className="">
          {post?.comments?.map((item, index) => (
              <div key={index} className="rounded-md bg-gray-200 w-full py-2 px-3 mt-2 mb-2">
                <p className="text-lg text-gray-500 font-medium">{item?.userName}</p>
                <p className="text-black text-sm font-normal">
                  {item?.comment}
                </p>
              </div>
          ))}
        </div>
        <div className="flex items-center w-full bg-gray-100  rounded-full px-2 mt-3">
          <form onSubmit={(e) => handleAddComment(e, post?.id)} className="flex items-center w-full rounded-full">
            <input type="text" placeholder="Write a comment..." className="flex ml-2 items-center bg-transparent h-9 p-3 outline-none placeholder-gray-500 w-full focus:border-none focus:outline-none text-gray-800" value={inputVal} onChange={(e) => setInputVal(e.target.value)}/>
            <button type="submit"><PaperAirplaneIcon className="text-gray-700 h-6 w-6 hover:text-gray-950" /></button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
