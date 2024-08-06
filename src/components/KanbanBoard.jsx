import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import "../App.css";

const fetchTasks = async () => {
  const { data } = await api.get("/todos");
  const modifiedData = data.map((task, index) => ({
    ...task,
    id: `task-${index}`,
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
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");
  const addInputRef = useRef(null);
  const editInputRef = useRef(null);

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
    if (isAdding && addInputRef.current) {
      addInputRef.current.focus();
    }
  }, [isAdding]);

  useEffect(() => {
    if (editingTaskId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingTaskId]);

  if (isLoading) return <div>잠시만 기다려주세요...</div>;
  if (error) return <div>문제가 발생했습니다.</div>;

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") {
      alert("내용을 입력해 주세요");
      addInputRef.current.focus();
      return;
    }

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
  };

  const handleAddButtonClick = () => {
    if (isAdding) {
      handleAddTask();
    } else {
      setIsAdding(true);
    }
  };

  const handleEditClick = (taskId) => {
    setEditingTaskId(taskId);
    setEditingTaskTitle(tasks[taskId].content);
  };

  const handleEditTitleChange = (e) => {
    setEditingTaskTitle(e.target.value);
  };

  const handleSaveEdit = () => {
    if (editingTaskTitle.trim() !== "") {
      const updatedTasks = {
        ...tasks,
        [editingTaskId]: {
          ...tasks[editingTaskId],
          content: editingTaskTitle,
        },
      };
      setTasks(updatedTasks);
      setEditingTaskId(null);
      setEditingTaskTitle("");
    }
  };

  const handleDeleteClick = (taskId) => {
    const updatedTasks = { ...tasks };
    delete updatedTasks[taskId];

    const updatedColumns = { ...columns };
    for (const columnId in updatedColumns) {
      const column = updatedColumns[columnId];
      column.taskIds = column.taskIds.filter((id) => id !== taskId);
    }

    setTasks(updatedTasks);
    setColumns(updatedColumns);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newColumns = {
        ...columns,
        [newColumn.id]: newColumn,
      };

      setColumns(newColumns);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newColumns = {
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };

    setColumns(newColumns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-container">
        <h1 className="kanban-title">To-do List ✅</h1>
        <div className="kanban-board">
          {Object.keys(columns).map((columnId) => {
            const column = columns[columnId];

            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                isAdding={isAdding}
                newTaskTitle={newTaskTitle}
                onAddTaskClick={handleAddButtonClick}
                onNewTaskTitleChange={(e) => setNewTaskTitle(e.target.value)}
                onAddTask={handleAddTask}
                onEditClick={handleEditClick}
                onSaveEdit={handleSaveEdit}
                onDeleteClick={handleDeleteClick}
                editingTaskId={editingTaskId}
                editingTaskTitle={editingTaskTitle}
                onEditTitleChange={handleEditTitleChange}
                editInputRef={editInputRef}
                addInputRef={addInputRef}
              />
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
