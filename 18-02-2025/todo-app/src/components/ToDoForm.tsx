import { useState } from "react"

interface TodoFormProps{
    addTodo : (text: string) => void;
}

const ToDoForm: React.FC<TodoFormProps> = ({addTodo}) => {
    const [input,setInput] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(input.trim()){
            addTodo(input);
            setInput("");
        }
    };

  return (
    <form onSubmit={handleSubmit} className="d-flex mb-3">
        <input 
            type="text"
            name="Todo"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            placeholder="Add new list item"
            className="form-control me-2"
        >
        </input>
        <button type="submit" className="btn btn-primary">Add</button>
    </form>
  );
};

export default ToDoForm