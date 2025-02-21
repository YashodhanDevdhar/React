import React, { createContext, useReducer, ReactNode, useContext } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
}

type Action =
  | { type: "ADD_TASK"; payload: string }
  | { type: "REMOVE_TASK"; payload: number }
  | { type: "TOGGLE_TASK"; payload: number };

const taskReducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case "REMOVE_TASK":
      return state.filter(task => task.id !== action.payload);
    case "TOGGLE_TASK":
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
};

interface TaskContextType {
  tasks: Task[];
  dispatch: React.Dispatch<Action>;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context){ 
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};
