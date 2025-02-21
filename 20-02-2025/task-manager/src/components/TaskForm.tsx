import { useCallback, useState } from 'react'
import { useTaskContext } from '../context/TaskContext';

const TaskForm = () => {
    const { dispatch } = useTaskContext();
    const [taskText, setTaskText] = useState("");

    const handleAddTask = useCallback(() => {
        if (taskText.trim() !== "") {
            dispatch({ type: "ADD_TASK", payload: taskText });
            setTaskText("");
        }
    },[taskText, dispatch]);

    return (
        <div>
            <div>
        <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Enter task..."
        />
        <button onClick={handleAddTask}>Add Task</button>
        </div>
        </div>
    )
}

export default TaskForm