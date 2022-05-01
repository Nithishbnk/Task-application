import React, { useState } from "react";
import "./Tasks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BiCheckDouble } from "@fortawesome/free-solid-svg-icons";

export default function Tasks(props) {
  const [task, setTask] = useState([]);
  const [completed, setCompleted] = useState([]);

  const addTask = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;

    const title = document.getElementById("task-item").value;
    if (title) {
      const newTask = {
        title: document.getElementById("task-item").value,
        status: "Not Started",
        date: today,
      };
      setTask((oldArray) => [...oldArray, newTask]);
    }

    document.getElementById("task-item").value = "";
  };

  const clearTask = () => {
    setTask((oldArray) => []);
  };

  function completeTask(title) {
    var completeindex;
    task.map((item, index) => {
      if (item.title === title) {
        completeindex = index;
        item.status='Completed';
        setCompleted((oldArray) => [...oldArray, item]);
      }
    });
    task.splice(completeindex,1);
  }

  return (
    <>
      <div class="task-form">
        <div class="input-form">
          <label for="item-item" class="sr-only input-label">
            Add Items To Your Bucket
          </label>
          <input
            type="text"
            class="form-control"
            id="task-item"
            placeholder="Task Name"
          />
        </div>
        <div class="buttons">
          <button
            type="submit"
            class="btn btn-primary"
            onClick={addTask}
            id="add-button"
          >
            ADD TASK
          </button>
          <button
            type="submit"
            class="btn btn-secondary"
            onClick={clearTask}
            id="clear-button"
          >
            CLEAR TASKS
          </button>
        </div>
      </div>

      <div class="item-group">
        <ul class="list-group">
          {task.map((item) => (
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <span class="task-title">{item.title}</span>
              <small>{item.date}</small>
              <span class="badge badge-primary badge-pill">{item.status}</span>
              <span
                onClick={() => {
                  completeTask(item.title);
                }}
                id={`${item.title} clear-button`}
                class="completed"
              >
                <i className="fa fa-check" id={`${item.title}-check`}></i>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}