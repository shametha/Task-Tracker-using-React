import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect} from "react";

function App() {
  const [showAddTask, setShowAddTask] = useState (false)
  const [tasks, setTasks] = useState([ ]);

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])
    // const id = Math.floor(Math.random * 10000) +1
    // const newTask = {id, ...task}
    // console.log(task)
    // setTasks([...tasks,newTask])
  }

  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
    console.log("delete", id);
  };

  const toggleReminder = (id) => {
    console.log("toggle reminder", id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  const fetchTasks = async() => {
    const response = await fetch('http://localhost:5000/tasks')
    const data = response.json( )
    console.log(data)
    return data
  }

  useEffect(()=>{
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

  return (
    <div className="container">
      <Header title= 'Shametha' buttonText= {showAddTask} onAdd={ () => setShowAddTask( !showAddTask )}/>
      {showAddTask?<AddTask onAdd={addTask}/>:''}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Tasks to show"
      )}
    </div>
  );
}

export default App;
