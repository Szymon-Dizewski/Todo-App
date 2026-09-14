import { useState, useRef } from "react"
import "./App.css"

// Keep list editing in one place add/delete
function useTodos(initialTodos = []) {
  const [todoList, setTodoList] = useState(initialTodos)

  function addTodo(task) {
    if (!task.trim()) return
    setTodoList([
      ...todoList,
      { task, taskDone: false, id: crypto.randomUUID() },
    ])
  }

  function toggleTodo(id) {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, taskDone: !item.taskDone } : item
      )
    )
  }

  return { todoList, addTodo, toggleTodo }
}

function TodoInput({ addTodo }) {
  const [textInput, setTextInput] = useState("")
  const inputRef = useRef(null)

  function handleAdd() {
    addTodo(textInput)
    setTextInput("")
    inputRef.current.focus()
  }

  return (
    <div className="todo-input-container">
      <input
        placeholder="Task"
        size={30}
        onChange={(e) => setTextInput(e.target.value)}
        value={textInput}
        ref={inputRef}
        className="todo-input"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd()
        }}
      />
      <button onClick={handleAdd} className="todo-add-button">
        Add
      </button>
    </div>
  )
}

function TodoItem({ task, taskDone, id, onToggle }) {
  return (
    <>
      <div className="todo-item-container">
        <input
          onChange={() => onToggle(id)}
          type="checkbox"
          checked={taskDone}
        />
        <li className={taskDone ? "todo-item todo-item-done" : "todo-item"}>
          {task}
        </li>
      </div>
      <hr />
    </>
  )
}

function TodoList({ todoList, onToggle }) {
  return (
    <ul className="todo-list-container">
      {todoList.map((todoItem) => (
        <TodoItem
          task={todoItem.task}
          taskDone={todoItem.taskDone}
          id={todoItem.id}
          onToggle={onToggle}
          key={todoItem.id}
        />
      ))}
    </ul>
  )
}

function App() {
  const { todoList, addTodo, toggleTodo } = useTodos([
    { task: "test", taskDone: true, id: crypto.randomUUID() },
  ])

  return (
    <>
      <TodoInput addTodo={addTodo} />
      <TodoList todoList={todoList} onToggle={toggleTodo} />
    </>
  )
}

export default App
