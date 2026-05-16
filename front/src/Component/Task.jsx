import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Base_URL } from "../server";

const Task = () => {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);

    

    const token = localStorage.getItem("token");

    const storedUser = localStorage.getItem("user");

    const user = storedUser ? JSON.parse(storedUser) : null;

    const userId = user?._id;

    console.log("TOKEN =>", token);
    console.log("USER =>", user);
    console.log("USER ID =>", userId);



    const headers = {
        Authorization: `Bearer ${token}`
    };

  

    const getAllTasks = async () => {

        if (!userId) {
            return toast.error("User ID not found");
        }

        try {

            setLoading(true);

            const res = await axios.get(
                `${Base_URL}/task/getall/${userId}`,
                { headers }
            );

            console.log("GET TASKS =>", res.data);

            if (res.data.success) {
                setTasks(res.data.tasks);
            }

        } catch (error) {

            console.log("GET TASK ERROR =>", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch tasks"
            );

        } finally {
            setLoading(false);
        }
    };

   

    const createTask = async () => {

        if (!title.trim()) {
            return toast.error("Please enter task title");
        }

        if (!userId) {
            return toast.error("User ID missing");
        }

        try {

            const res = await axios.post(
                `${Base_URL}/task/create`,
                {
                    title,
                    userid: userId
                },
                { headers }
            );

            console.log("CREATE TASK =>", res.data);

            if (res.data.success) {

                toast.success("Task Created Successfully");

                setTitle("");

                getAllTasks();
            }

        } catch (error) {

            console.log("CREATE TASK ERROR =>", error);

            toast.error(
                error.response?.data?.message ||
                "Task creation failed"
            );
        }
    };

    

    const updateTask = async (id) => {

        if (!title.trim()) {
            return toast.error("Please enter updated title");
        }

        try {

            const res = await axios.put(
                `${Base_URL}/task/update/${id}`,
                {
                    title
                },
                { headers }
            );

            console.log("UPDATE TASK =>", res.data);

            if (res.data.success) {

                toast.success("Task Updated Successfully");

                setEditId(null);

                setTitle("");

                getAllTasks();
            }

        } catch (error) {

            console.log("UPDATE TASK ERROR =>", error);

            toast.error(
                error.response?.data?.message ||
                "Task update failed"
            );
        }
    };

    // ================= DELETE TASK =================

    const deleteTask = async (id) => {

        try {

            const res = await axios.delete(
                `${Base_URL}/task/delete/${id}`,
                { headers }
            );

            console.log("DELETE TASK =>", res.data);

            if (res.data.success) {

                toast.success("Task Deleted Successfully");

                getAllTasks();
            }

        } catch (error) {

            console.log("DELETE TASK ERROR =>", error);

            toast.error(
                error.response?.data?.message ||
                "Task delete failed"
            );
        }
    };

   

    useEffect(() => {

        if (token && userId) {
            getAllTasks();
        } else {
            toast.error("Please Login First");
        }

    }, []);

   

    return (

        <div
            style={{
                width: "500px",
                margin: "50px auto"
            }}
        >

            <h1>Task Manager</h1>

            {/* INPUT SECTION */}

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px"
                }}
            >

                <input
                    type="text"
                    placeholder="Enter Task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        flex: 1,
                        padding: "10px"
                    }}
                />

                {
                    editId ? (
                        <button
                            onClick={() => updateTask(editId)}
                        >
                            Update
                        </button>
                    ) : (
                        <button
                            onClick={createTask}
                        >
                            Add
                        </button>
                    )
                }

            </div>

            {/* TASK LIST */}

            {
                loading ? (

                    <h3>Loading...</h3>

                ) : tasks?.length > 0 ? (

                    tasks.map((task) => (

                        <div
                            key={task._id}
                            style={{
                                border: "1px solid gray",
                                padding: "10px",
                                marginBottom: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >

                            <h3>{task.title}</h3>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px"
                                }}
                            >

                                <button
                                    onClick={() => {
                                        setEditId(task._id);
                                        setTitle(task.title);
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteTask(task._id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))

                ) : (

                    <h3>No Tasks Found</h3>

                )
            }

        </div>
    );
};

export default Task;

