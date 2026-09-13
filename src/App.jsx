import { useState } from "react"
import "./App.css"
import { useRef } from "react"

function TodoInput({ todoList, setTodoList }) {
  const [textInput, setTextInput] = useState("")
  const inputRef = useRef(null)

  function saveInputText(event) {
    setTextInput(event.target.value)
  }

  function addTodoItem() {
    if (!textInput.trim()) return
    // console.log(textInput)
    setTodoList([
      ...todoList,
      { task: textInput, taskDone: false, id: crypto.randomUUID() },
    ])
    setTextInput("")
    inputRef.current.focus()
  }

  return (
    <div className="todo-input-container">
      <input
        placeholder="Task"
        size={30}
        onChange={saveInputText}
        value={textInput}
        ref={inputRef}
        className="todo-input"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodoItem()
          }
        }}
      />
      <button onClick={addTodoItem} className="todo-add-button">
        Add
      </button>
    </div>
  )
}

function TodoItem({ task, taskDone, id }) {
  return (
    <>
      <li className="todo-item">{task}</li>
      <hr />
    </>
  )
}

function TodoList({ todoList }) {
  return (
    <div className="todo-list-container">
      {todoList.map((todoItem) => {
        return (
          <TodoItem
            task={todoItem.task}
            taskDone={todoItem.taskDone}
            key={todoItem.id}
          />
        )
      })}
    </div>
  )
}

function App() {
  const [todoList, setTodoList] = useState([
    { task: "test", taskDone: false, id: crypto.randomUUID },
  ])

  return (
    <>
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
      <TodoList todoList={todoList} />
    </>
  )
}

export default App
