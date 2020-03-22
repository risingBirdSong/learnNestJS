import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TaskI, TaskStatus } from "./types";

let arrayedEnum = Object.keys(TaskStatus);

function taskArrayAssertion(thing: unknown): thing is TaskI[] {
  return Array.isArray(thing) && thing.every(item =>
    item !== null &&
    typeof thing === "object" &&
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.description == "string" &&
    arrayedEnum.includes(item.status)
  )
}

function App() {

  let [tasks, setTasks] = useState<TaskI[]>([])
  let [showTasks, setShowTasks] = useState<boolean>(true)

  const getTasks = () => {
    fetch("/tasks")
      .then(res => res.json())
      .then((data: unknown) => {

        if (taskArrayAssertion(data)) {
          let copy: TaskI[] = [...data];
          setTasks(copy);
        }
        else { throw Error("the data was not an array of tasks!"); }

      });
  }
  getTasks();
  const renderTasks = () => {
    return <ul className="tasksList">
      {tasks.map(task => {
        return <li>
          <h3>{task.title}</h3>
            status : <h4>{task.status}</h4>
            description : <p>{task.description}</p>
        </li>
      })}
    </ul>
  }

  return (
    <div className="App">
      <button onClick={() => {
        setShowTasks(!showTasks);
      }}>toggle tasks</button>
      {showTasks ? renderTasks() : ""}
    </div>
  );
}

export default App;
