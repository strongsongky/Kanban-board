import React from "react";
import Task from "./Task";
import AddTask from "./AddTask";

const Column = ({
  column,
  tasks,
  isAdding,
  newTaskTitle,
  onAddTaskClick,
  onNewTaskTitleChange,
  onAddTask,
  onEditClick,
  onSaveEdit,
  onDeleteClick,
  editingTaskId,
  editingTaskTitle,
  onEditTitleChange,
  editInputRef,
  addInputRef,
}) => {
  return (
    <div
      className={`kanban-column ${column.title
        .toLowerCase()
        .replace(" ", "-")}`}
    >
      <h2>{column.title}</h2>
      {column.taskIds.map((taskId) => {
        const task = tasks[taskId];
        if (!task) {
          return null;
        }

        const isEditing = editingTaskId === task.id;

        return (
          <Task
            key={task.id}
            task={task}
            isEditing={isEditing}
            editingTaskTitle={editingTaskTitle}
            onEditClick={onEditClick}
            onSaveEdit={onSaveEdit}
            onDeleteClick={onDeleteClick}
            onEditTitleChange={onEditTitleChange}
            editInputRef={editInputRef}
          />
        );
      })}
      {column.id === "column-1" && isAdding && (
        <AddTask
          newTaskTitle={newTaskTitle}
          onNewTaskTitleChange={onNewTaskTitleChange}
          onAddTask={onAddTask}
          addInputRef={addInputRef}
        />
      )}
      {column.id === "column-1" && (
        <div className="add-task">
          <button className="add-task-button" onClick={onAddTaskClick}>
            {isAdding ? "+" : "+"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Column;
