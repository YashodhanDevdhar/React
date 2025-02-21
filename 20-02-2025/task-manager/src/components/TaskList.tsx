import { useMemo } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from "./TaskItem";

const TaskList = () => {
    const { tasks } = useTaskContext();

    const completedTaskCount = useMemo(()=>{ 
        return tasks.filter((task) => task.completed).length;
    },[tasks]);

    return (
        <div>
            <h2>Task List</h2>
            <p>Completed Tasks: {completedTaskCount}</p>
            <ul>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
        
        </div>
    )
}

export default TaskList