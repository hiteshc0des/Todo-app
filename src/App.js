import { useEffect, useState } from "react";

import "./App.css";
import { v4 as uuidv4 } from "uuid";

import List from "./components/List/List";

// to get the data from Localstoreage

const getLocalItems = () => {
  let list = localStorage.getItem("lists");

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

function App() {
  const [text, setText] = useState("");
  const [todolist, setTodolist] = useState(getLocalItems());

  const addItem = () => {
    const newTodoItem = {
      id: uuidv4(),
      item: text,
      done: false,
    };
    setTodolist([...todolist, newTodoItem]);
    setText("");
  };

  const handleToggle = (itemId) => {
    const newTodolist = todolist.map((listItem) => {
      if (listItem.id === itemId) {
        return { ...listItem, done: !listItem.done };
      }
      return listItem;
    });
    setTodolist(newTodolist);
  };

  const handleDelete = (itemId) => {
    const newTodolist = todolist.filter((listItem) => listItem.id !== itemId);
    setTodolist(newTodolist);
  };

  // add data to localstorage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(todolist));
  }, [todolist]);

  function removeAll() {
    setTodolist([]);
  }

  return (
    <div className="App">
      <h1 className="header">To Do List</h1>
      <div className="adder">
        <input
          type="text"
          placeholder="Add Activity..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <span onClick={addItem}>+</span>
      </div>
      {todolist.length > 0 && (
        <List
          todolist={todolist}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
        />
      )}
      <div className="centered-button-container">
        {todolist.length >= 1 && (
          <button className="removeall" onClick={removeAll}>
            Remove All
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
