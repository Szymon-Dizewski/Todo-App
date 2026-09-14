import { useState } from "react"
import "./App.css"
import { useRef } from "react"
import { createContext } from "react"
import { useContext } from "react"

const TodoContext = createContext()

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
  const { todoList, setTodoList } = useContext(TodoContext)
  function toggleTask() {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, taskDone: !item.taskDone } : item
      )
    )
  }
  return (
    <>
      <div className="todo-item-container">
        <input onChange={toggleTask} type="checkbox" checked={taskDone} />
        <li className={taskDone ? "todo-item todo-item-done" : "todo-item"}>
          {task}
        </li>
      </div>
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
            id={todoItem.id}
            key={todoItem.id}
          />
        )
      })}
    </div>
  )
}

function App() {
  const [todoList, setTodoList] = useState([
    { task: "test", taskDone: true, id: crypto.randomUUID() },
  ])

  return (
    <>
      <TodoContext value={{ todoList, setTodoList }}>
        <TodoInput todoList={todoList} setTodoList={setTodoList} />
        <TodoList todoList={todoList} />
      </TodoContext>
    </>
  )
}

export default App
