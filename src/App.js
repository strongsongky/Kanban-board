import React from "react";
import "./App.css";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "임시" },
    "task-2": { id: "task-2", content: "임시" },
    "task-3": { id: "task-3", content: "임시" },
    "task-4": { id: "task-4", content: "임시" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: ["task-2"],
    },
    "column-3": {
      id: "column-3",
      title: "On Hold",
      taskIds: ["task-3"],
    },
    "column-4": {
      id: "column-4",
      title: "Done",
      taskIds: ["task-4"],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};

const App = () => {
  return (
    <div className="kanban-container">
      <h1 className="kanban-title">To-do List</h1>
      <div className="kanban-board">
        {initialData.columnOrder.map((columnId) => {
          const column = initialData.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId) => initialData.tasks[taskId]
          );

          return (
            <div className="kanban-column" key={column.id}>
              <h2>{column.title}</h2>
              {tasks.map((task) => (
                <div className="kanban-card" key={task.id}>
                  {task.content}
                </div>
              ))}
              {column.id === "column-1" && (
                <div className="add-task">
                  <div className="add-task-button">+</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
