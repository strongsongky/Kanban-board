import React from "react";
import Task from "./Task";
import AddTask from "./AddTask";
import { Droppable } from "react-beautiful-dnd";

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
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          className={`kanban-column ${column.title.toLowerCase().replace(" ", "-")} ${
            snapshot.isDraggingOver ? "dragging-over" : ""
          }`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>{column.title}</h2>
          <div className="droppable-area">
            {column.taskIds.map((taskId, index) => {
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
                  index={index}
                />
              );
            })}
            {provided.placeholder}
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
                <button
                  aria-label="Add Task"
                  className="add-task-button"
                  onClick={onAddTaskClick}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
