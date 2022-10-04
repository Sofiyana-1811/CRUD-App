import React from "react"
import './App.css';

const url= "http://localhost:3004/todos"



const TodoApp = () => {
  const [data, setData] = React.useState([])
  const [editID, setEditID] = React.useState(null)
  const [input, setInput] = React.useState('')
  const [editInput, setEditInput] = React.useState('')
  React.useEffect(() => {
    getTodos()
  }, [])
  const postTodo=(input)=>{
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: input
      })
    }).then(response=>getTodos())
  }
  const getTodo=()=>{}
  const getTodos=()=>{
    fetch(url)
      .then(response => response.json())
      .then(json => setData([...json]))
  }
  const putTodo=(id, editInput)=>{
    fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: editInput
      })
    }).then(response=>getTodos())
  }
  const deleteTodo=(id)=>{
    fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      
    }).then(response=>getTodos())
  }

  const onChangeInput=evt=>{setInput(evt.currentTarget.value)}
  const onSubmit=()=>{
    postTodo(input)
    document.getElementById('input-field').value = ''
  }
  const onDelete=(id)=>()=>{
    if (window.confirm("Are you sure you want to delete this entry?")){
    deleteTodo(id)
    }
  }
  const onEditInput=evt=>{setEditInput(evt.currentTarget.value)}
  const onEdit=(entry)=>()=>{
    setEditID(entry.id)
    setEditInput(entry.title)
  }
  const onCancel=()=>{
    setEditID(null)
    setEditInput('')
  }
  const onClear=()=>{
    document.getElementById('input-field').value = ''
  }
  const onSave=(id)=>()=>{
    putTodo(id, editInput)
    onCancel()
  }
  return (
    <div class="all">
      <div class="input">
        <input type="text" placeholder="Enter name" onChange={onChangeInput} id="input-field"></input>
        <div class="top-btns">
          <button onClick={onSubmit}>SUBMIT</button>
          <button onClick={onClear}>CLEAR</button>
        </div>
      </div>
      <hr></hr>
      <ul>
        {data.map((entry, index) => entry.id==editID?<li key={index}>
          <div><input type="text" defaultValue={entry.title} onChange={onEditInput}></input></div>
          <div class='edit-btns'>
            <button onClick={onSave(entry.id)}>
              SAVE
            </button>
            <button onClick={onCancel}>
              CANCEL
            </button>
          </div>
        </li>:<li key={index}>
          <div>{entry.title}</div>
          <div class='btns'>
            <div onClick={onDelete(entry.id)}>
              <i class="fa fa-trash" aria-hidden="true"></i>
            </div>
            <div onClick={onEdit(entry)}>
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </div>
          </div>
        </li>)}
      </ul>
    </div>)
};

export default TodoApp;
