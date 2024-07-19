import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "./api/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./App.css";

const fetchTasks = async () => {
  const { data } = await api.get("/todos");
  const modifiedData = data.map((task, index) => ({
    ...task,
    title: `임시 데이터 ${index + 1}`,
  }));

  return modifiedData;
};

const KanbanBoard = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading) return <div>잠시만 기다려주세요...</div>;
  if (error) return <div>Error loading tasks</div>;

  const initialData = {
    columns: {
      "column-1": {
        id: "column-1",
        title: "To Do",
        taskIds: data
          .filter((task) => !task.completed)
          .slice(0, 3)
          .map((task) => task.id),
      },
      "column-2": {
        id: "column-2",
        title: "In Progress",
        taskIds: ["temp-in-progress"],
      },
      "column-3": {
        id: "column-3",
        title: "On Hold",
        taskIds: ["temp-on-hold"],
      },
      "column-4": {
        id: "column-4",
        title: "Done",
        taskIds: ["temp-done"],
      },
    },
    columnOrder: ["column-1", "column-2", "column-3", "column-4"],
  };

  const tasks = data.reduce((acc, task) => {
    acc[task.id] = { id: task.id, content: task.title };
    return acc;
  }, {});

  tasks["temp-in-progress"] = {
    id: "temp-in-progress",
    content: "진행 중인 카드",
  };
  tasks["temp-on-hold"] = { id: "temp-on-hold", content: "보류 중인 카드" };
  tasks["temp-done"] = { id: "temp-done", content: "완료된 카드" };

  return (
    <div className="kanban-container">
      <h1 className="kanban-title">To-do List ✅</h1>
      <div className="kanban-board">
        {initialData.columnOrder.map((columnId) => {
          const column = initialData.columns[columnId];
          const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

          return (
            <div
              className={`kanban-column ${column.title
                .toLowerCase()
                .replace(" ", "-")}`}
              key={column.id}
            >
              <h2>{column.title}</h2>
              {columnTasks.map((task) => (
                <div className="kanban-card" key={task.id}>
                  {task.content}
                  <div className="card-buttons">
                    <button className="edit-button">
                      <FaEdit />
                    </button>
                    <button className="delete-button">
                      <FaTrash />
                    </button>
                  </div>
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

export default KanbanBoard;
