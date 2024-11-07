
import { use, useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [ todo , setTodo ] =useState([])
  const [ todos , setTodos ] = useState([])
  const [ id , setId ] = useState("")
  const [ title , setTitle ] = useState("")
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

  const editHandler = async()=>{
    const res = await fetch(`/api/todos/${id}`,{
      method:"PATCH",
      body: JSON.stringify({todo:title}),
      headers:{"Content-Type": "application/json"},
    })
    const data = await res.json()
    setTodos(data)
    console.log(data);
  }


  const replaceHandler = async ()=>{
    const res = await fetch("/api/todos",{
      method:"PUT",
      body: JSON.stringify([
        {id:7, todo:"todo N7"},
        {id:8, todo:"todo N8"},
      ]),
      headers: {"Content-Type":"application/json"},
    })
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
      <div className={styles.replace}>
        <button onClick={replaceHandler}>Replace</button>
      </div>
      <div className={styles.Patch}>
        <input placeholder='id'  value={id} onChange={e =>setId(e.target.value)}/>
        <input placeholder='title'  value={title} onChange={e =>setTitle(e.target.value)}/>
        <button onClick={editHandler}>Edit</button>
      </div>
    </div>

  )
}
