import { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './types';
import ToDoForm from './components/ToDoForm';


function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [newText, setNewText] = useState<string>("");


  useEffect(()=>{
    const savedTodos = localStorage.getItem('todos');
    if(savedTodos){
      setTodos(JSON.parse(savedTodos));
    }
  },[]);

  const handleAddTodo = (text : string) => {
    const newTodo = {id: Date.now().toString(), text};
    const updatedTodos = [...todos,newTodo]
    setTodos(updatedTodos);
    localStorage.setItem('todos',JSON.stringify(updatedTodos));
  };

  const handleDelete = (id:string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos',JSON.stringify(updatedTodos));
  };

  const handleEdit = (todo : Todo) => {
    setEditingTodo(todo.id);
    setNewText(todo.text);
  }

  const handleSaveEdit = (id:string) => {
    
    const updatedTodos = todos.map((todo) => 
      todo.id === id ? {...todo, text:newText} : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos',JSON.stringify(updatedTodos));
    setEditingTodo(null);
    setNewText("");
    
  };
  

  return (
    <div>

      <ToDoForm addTodo={handleAddTodo}/>

      <ul className="list-group">
        {todos.map((todo)=>(
          <li 
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >

            {editingTodo === todo.id ? (
              <>
                <input
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="form-control me-2"
                />
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleSaveEdit(todo.id)}
                >
                  Save
                </button>
              </>
              ) : (
              <>
                {todo.text}
                <div>
                  <button
                    className="btn btn-warning btn-sm me-1"
                    onClick={()=> handleEdit(todo)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={()=>handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}

            
          </li>

        ))}

      </ul>

    </div>
    
  )
}

export default App