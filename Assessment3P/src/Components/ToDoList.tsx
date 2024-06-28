import { useEffect, useState } from "react";
import apiClient from "../services/apiClient"
import todoService from "../services/todoService"

export interface Todo{
  id:number;
  title:string;
}


const ToDoList = () => {

  const [list, setList] = useState<Todo[]>([])
  const [error,setError] = useState("");

  const FetchData = () => {
    const {request} = todoService.getAll<Todo>() 
    request
    .then(response => {
      setList(response.data)
    })
    .catch(error => {
      setError(error.message)

    })
  }
    
    useEffect(() => {
      FetchData();

    }, [])
    

    const addItem = () => {
      const originalList = [...list];
      const newItem = {id:0, title:"Wash the Dishes"};
      setList([newItem,...list]);

      todoService
      .create(newItem)
      .then((response) => setList([response.data, ...list]))
      .catch((error) => {
        setError(error.message)
        setList(originalList);
      })
    }

    const deleteItem = (item:Todo) => {
      setList(list.filter(i => i.id != item.id))

    }

    const updateItem = (item: Todo) => {
      const originalList = [...list];
      const updatedItem = {...list, title:item.title + " IS DONE!"};
      setList(list.map(i => i.id === item.id ? updatedItem : i))
    }

  return (
    <>
      <div>
        <ul>
          <button onClick={addItem}>Add</button>
          {list.map(item => 
          <>
          <li key={item.id}>{item.title}</li>
            <button onClick={updateItem(item)}>Update</button>
          <button onClick={() => deleteItem(item)} >Delete</button>
          </>
          )}
        </ul>
      </div>
      {error && <p className="text-danger">{error}</p>}
    </>
  )
}

export default ToDoList