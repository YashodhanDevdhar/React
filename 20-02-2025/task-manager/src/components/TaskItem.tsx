import React, { useCallback } from "react";
import { useTaskContext } from "../context/TaskContext";

interface TaskProps {
  task: {
    id: number;
    text: string;
    completed: boolean;
  };
}

const TaskItem: React.FC<TaskProps> = ({ task }) => {
  const { dispatch } = useTaskContext();

  const toggleTask = useCallback(()=>{
    dispatch({type: "TOGGLE_TASK", payload:task.id})
  },[dispatch, task.id]);

  return (
    <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>

        {task.text}{" "}
        <button onClick={toggleTask}>
            Toggle
        </button>{" "}
        <button onClick={() => dispatch({ type: "REMOVE_TASK", payload: task.id })}>
            Delete
        </button>
    </li>
  );
};

export default TaskItem;
