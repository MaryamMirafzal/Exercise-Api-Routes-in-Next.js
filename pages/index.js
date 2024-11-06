
import { use, useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [ todo , setTodo ] =useState([])
  const [ todos , setTodos ] = useState([])
  useEffect(()=>{
    async function fetchData(params) {
      const res = await fetch("/api/todos")
      const data = await res.json()
      console.log(data);     
      setTodos(data) 
    }
    fetchData()
  },[])

  const deleteHandler = async ()=>{
    const res = await fetch("/api/todos", {
      method: "DELETE",
    });
    const data = await res.json()
    setTodos(data.data)
  }

  const clickHandler = async ()=>{
    const res = fetch("/api/todos",{
      method: "POST",
      body: JSON.stringify({todo}),
      headers:{"Content-Type":"application/json"},
    });
    const data = await( await res).json();
    console.log(data);
  }
  return (
    <div className={styles.container}>
      <ul>
        {todos.map(item => <li key={item.id}>{item.todo}</li>)}
      </ul>
      <div className={styles.post}>
        <input value={todo} onChange={e => setTodo(e.target.value)} />
        <button onClick={clickHandler}>Create Todo</button>
      </div>
      <div className={styles.delete}>
        <button onClick={deleteHandler}>Delete All</button>
      </div>
    </div>

  )
}
