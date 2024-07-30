import React from "react";
import { FaCheck } from "react-icons/fa";

const AddTask = ({
  newTaskTitle,
  onNewTaskTitleChange,
  onAddTask,
  addInputRef,
}) => {
  return (
    <div className="kanban-card">
      <input
        type="text"
        value={newTaskTitle}
        onChange={onNewTaskTitleChange}
        placeholder="내용을 입력해 주세요"
        onKeyDown={(e) => {
          if (e.key === "Enter") onAddTask();
        }}
        ref={addInputRef}
      />
      <div className="card-buttons">
        <button className="complete-button" onClick={onAddTask}>
          <FaCheck />
        </button>
      </div>
    </div>
  );
};

export default AddTask;
