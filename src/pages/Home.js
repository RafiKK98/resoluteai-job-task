import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import CreateTask from "../components/CreateTask";
import TaskCard from "../components/Tasks/TaskCard";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import db from "../firebase";

const Home = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [postData, setPostsData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const queryRef = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
  const getData = async () => {
    const docRef = await onSnapshot(queryRef, (querySnapshot) => {
      setPostsData(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
  };

  return (
    <>
      {/* <div> */}
        <div className="w-full px-8 pt-11 relative min-h-screen bg-secondary pb-10">
          <div className="grid mt-3 w-full md:grid-cols-10  gap-4 ">
            <div className=" max-w-full col-span-full md:col-span-6">
              <div className="text-center text-2xl font-medium pb-2 bg-gray-800 py-1 mb-2 rounded text-white shadow">
                To Do List
              </div>
              <div className="flex flex-col space-y-4">
                {postData?.map((item, index) => (
                  <TaskCard key={index} post={item} />
                ))}
              </div>
              {postData?.length === 0 && (
                <div className="text-center text-lg font-medium border border-gray-300 p-2">
                  No Task Found
                </div>
              )}
            </div>
            <div className="p-4 col-span-full md:col-span-4 rounded-lg h-fit sticky top-[50px] text-white shadow-md bg-gray-800 w-full">
              <CreateTask />
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default Home;
