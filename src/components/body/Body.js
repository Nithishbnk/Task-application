import React from "react";
import Tasks from "../tasks/Tasks";
import Header from "../header/Header";
import "./Body.css";

export default function Body(props) {
  return (
    <>
      <Header />
      <div class="parent-div">
        <div class="widgets"></div>
        <div class="tasks">
          <Tasks />
        </div>
        <div class="completed-tasks"></div>
      </div>
    </>
  );
}
