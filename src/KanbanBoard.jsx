import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "./api/api";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
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

  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [tasks, setTasks] = useState({});
  const [columns, setColumns] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    if (data) {
      const initialTasks = data.reduce((acc, task) => {
        acc[task.id] = { id: task.id, content: task.title };
        return acc;
      }, {});

      initialTasks["temp-in-progress"] = {
        id: "temp-in-progress",
        content: "진행 중인 카드",
      };
      initialTasks["temp-on-hold"] = {
        id: "temp-on-hold",
        content: "보류 중인 카드",
      };
      initialTasks["temp-done"] = { id: "temp-done", content: "완료된 카드" };

      setTasks(initialTasks);

      setColumns({
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
      });
    }
  }, [data]);

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  if (isLoading) return <div>잠시만 기다려주세요...</div>;
  if (error) return <div>문제가 발생했습니다.</div>;

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== "") {
      const newTaskId = `temp-${Date.now()}`;
      const updatedTasks = {
        ...tasks,
        [newTaskId]: { id: newTaskId, content: newTaskTitle },
      };
      const updatedColumns = { ...columns };
      updatedColumns["column-1"].taskIds.push(newTaskId);

      setTasks(updatedTasks);
      setColumns(updatedColumns);
      setNewTaskTitle("");
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleAddButtonClick = () => {
    if (isAdding) {
      handleAddTask();
    } else {
      setIsAdding(true);
    }
  };

  return (
    <div className="kanban-container">
      <h1 className="kanban-title">To-do List ✅</h1>
      <div className="kanban-board">
        {Object.keys(columns).map((columnId) => {
          const column = columns[columnId];
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
              {columnId === "column-1" && isAdding && (
                <div className="kanban-card">
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="내용을 입력해 주세요"
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                  />
                  <div className="card-buttons">
                    <button className="complete-button" onClick={handleAddTask}>
                      <FaCheck />
                    </button>
                  </div>
                </div>
              )}
              {columnId === "column-1" && (
                <div className="add-task">
                  <button
                    className="add-task-button"
                    onClick={handleAddButtonClick}
                  >
                    {isAdding ? "+" : "+"}
                  </button>
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
