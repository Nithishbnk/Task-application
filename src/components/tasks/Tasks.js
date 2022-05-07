import React, { useState, useEffect } from "react";
import "./Tasks.css";

export default function Tasks(props) {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  const initTask = JSON.parse(getCookie("taskcookie"))?.length
    ? JSON.parse(getCookie("taskcookie"))
    : [];
  const initOngoing = JSON.parse(getCookie("ongoingcookie"))?.length
    ? JSON.parse(getCookie("ongoingcookie"))
    : [];
  const initCompleted = JSON.parse(getCookie("completedcookie"))?.length
    ? JSON.parse(getCookie("completedcookie"))
    : [];

  const [input, setInput] = useState("");
  const [task, setTask] = useState(initTask);
  const [ongoing, setOngoing] = useState(initOngoing);
  const [completed, setCompleted] = useState(initCompleted);

  useEffect(() => {
    setCookie("taskcookie", JSON.stringify(task), 7);
    setCookie("ongoingcookie", JSON.stringify(ongoing), 7);
    setCookie("completedcookie", JSON.stringify(completed), 7);
  }, [task, ongoing, completed]);

  // const addTask = () => {
  //   var today = new Date();
  //   var dd = String(today.getDate()).padStart(2, "0");
  //   var mm = String(today.getMonth() + 1).padStart(2, "0");
  //   var yyyy = today.getFullYear();
  //   today = mm + "/" + dd + "/" + yyyy;

  //   const title = document.getElementById("task-item").value;
  //   if (title) {
  //     const newTask = {
  //       title: document.getElementById("task-item").value,
  //       status: "Not Started",
  //       date: today,
  //     };
  //     setTask((oldArray) => [...oldArray, newTask]);
  //   }
  //   document.getElementById("task-item").value = "";
  // };

  function notify(type, message) {
    (() => {
      let n = document.createElement("div");
      let id = Math.random().toString(36).substr(2, 10);
      n.setAttribute("id", id);
      n.classList.add("notification", type);
      n.classList.add("fade_out");
      n.innerText = message;
      document.getElementById("notification-area").appendChild(n);
      setTimeout(() => {
        var notifications = document
          .getElementById("notification-area")
          .getElementsByClassName("notification");
        for (let i = 0; i < notifications.length; i++) {
          if (notifications[i].getAttribute("id") == id) {
            notifications[i].remove();
            break;
          }
        }
      }, 5000);
    })();
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    if (input.length) {
      var alreadtExist = false;
      task.map((item, index) => {
        if (item.title === input) {
          notify("error", "Task Already Exist");
          alreadtExist = true;
        }
      });
      if (!alreadtExist) {
        const newTask = {
          title: input,
          status: "Yet to Start",
          date: today,
        };
        const allTasks = [...task, newTask];
        setTask(allTasks);
        setInput("");
        notify(
          "success",
          task.length
            ? "Task Added Successfully"
            : "Welcome Onboard! First Task Added Successfully"
        );
      }
    }
  };

  function clearTask() {
    setTask((oldArray) => []);
    setOngoing((oldArray) => []);
    setCompleted((oldArray) => []);
    notify("info", "You just cleared all the tasks");
    notify("success", "Let's Start again!");
  }

  const onGoingTask = (title) => {
    var ongoingindex;
    task.map((item, index) => {
      if (item.title === title) {
        ongoingindex = index;
        item.status = "Ongoing";
        const ongoingTasks = [...ongoing, item];
        setOngoing(ongoingTasks);
      }
    });
    task.splice(ongoingindex, 1);
    notify("success", `Welldone! You Started ${title} :)`);
  };

  const completeTask = (title) => {
    var completeindex;
    ongoing.map((item, index) => {
      if (item.title === title) {
        completeindex = index;
        item.status = "Completed";
        const completedTasks = [...completed, item];
        setCompleted(completedTasks);
      }
    });
    ongoing.splice(completeindex, 1);
    notify("success", `Hurray! Completed ${title} Successfully`);
  };

  const reopenTask = (title) => {
    var deleteindex;
    completed.map((item, index) => {
      if (item.title === title) {
        deleteindex = index;
        item.status = "Yet to Start";
        const newTasks = [...task, item];
        setTask(newTasks);
      }
    });
    const a = completed.splice(deleteindex, 1);
    setCompleted(completed);
    notify("success", `Great that you want to restart ${title}`);
  };

  const deleteTask = () => {
    setCompleted((oldArray) => []);
    notify("info", `Cleared the Task Bucket`);
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light m-5">
        <div id="headertitle" class="effect-shine">
          <div class="dot"></div>Manage your Daily Bucket List
          <div class="dot"></div>
        </div>
        <div id="notification-area"></div>
      </nav>
      <form class="task-form" onSubmit={handleSubmit}>
        <div class="input-form">
          <label for="item-item" class="sr-only input-label">
            Add Items To Your Bucket
          </label>
          <input
            type="text"
            class="form-control"
            id="task-item"
            placeholder="Task Name"
            value={input}
            onChange={handleChange}
          />
        </div>
        <div class="buttons">
          <button
            type="submit"
            class="btn btn-primary"
            // onClick={addTask}
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
      </form>

      <div class="item-group">
        <div class="todo-listing">
          {" "}
          <div class="todo-heading">ToDo Tasks</div>
          {task.length ? (
            <ul class="list-group align-items-center">
              {task.map((item) => (
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <span class="task-title">
                    {item.title.length > 15
                      ? item.title.substring(0, 8)
                      : item.title}
                    {item.title.length > 15 ? "..." : ""}
                  </span>
                  <small>{item.date}</small>
                  <span class="badge badge-danger badge-pill">
                    {item.status}
                  </span>
                  <span
                    onClick={() => {
                      onGoingTask(item.title);
                    }}
                    id={`${item.title} clear-button`}
                    class="completed"
                  >
                    <i className="fa fa-check" id={`${item.title}-check`}></i>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <span class="empty-message"> No Items at this moment</span>
          )}{" "}
        </div>
        <div class="ongoing-listing">
          {" "}
          <div class="todo-heading">Ongoing Tasks</div>
          {ongoing.length ? (
            <ul class="list-group align-items-center">
              {ongoing.map((item) => (
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <span class="task-title">
                    {item.title.length > 15
                      ? item.title.substring(0, 8)
                      : item.title}
                    {item.title.length > 15 ? "..." : ""}
                  </span>
                  <small>{item.date}</small>
                  <span class="badge badge-warning badge-pill">
                    {item.status}
                  </span>
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
          ) : (
            <span class="empty-message"> No Ongoing tasks at this moment</span>
          )}{" "}
        </div>
        <div class="completed-listing">
          <div class="completed-heading">
            Completed Tasks{" "}
            <span
              onClick={() => {
                deleteTask();
              }}
              class="deleteicon"
            >
              <i className="fa fa-times"></i>
            </span>
          </div>
          {completed.length ? (
            <ul class="list-group align-items-center">
              {completed.map((item) => (
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <span class="task-title">
                    {item.title.length > 15
                      ? item.title.substring(0, 8)
                      : item.title}
                    {item.title.length > 15 ? "..." : ""}
                  </span>
                  <small>{item.date}</small>
                  <span class="badge badge-success badge-pill">
                    {item.status}
                  </span>
                  <span
                    onClick={() => {
                      reopenTask(item.title);
                    }}
                    id={`${item.title} clear-button`}
                    class="completed"
                  >
                    Restart
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <span class="empty-message">No Completed Tasks</span>
          )}
        </div>
      </div>
    </>
  );
}
