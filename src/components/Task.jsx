import React, { useEffect, useRef } from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

const EditInput = React.forwardRef(
  ({ value, onChange, onSaveEdit, onKeyDown }, ref) => (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={ref}
      />
      <button
        onClick={onSaveEdit}
        className="complete-button"
        aria-label="Complete Task"
      >
        <FaCheck />
      </button>
    </div>
  )
);

const ActionButtons = ({ onEditClick, onDeleteClick, taskId }) => (
  <div className="card-buttons">
    <button className="edit-button" onClick={() => onEditClick(taskId)}>
      <FaEdit />
    </button>
    <button className="delete-button" onClick={() => onDeleteClick(taskId)}>
      <FaTrash />
    </button>
  </div>
);

const Task = ({
  task,
  isEditing,
  editingTaskTitle,
  onEditClick,
  onSaveEdit,
  onDeleteClick,
  onEditTitleChange,
}) => {
  const localInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && localInputRef.current) {
      localInputRef.current.focus();
    }
  }, [isEditing]);

  if (!task) return null;
  return (
    <div className="kanban-card">
      {isEditing ? (
        <EditInput
          value={editingTaskTitle}
          onChange={onEditTitleChange}
          onSaveEdit={onSaveEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSaveEdit();
          }}
          ref={localInputRef}
        />
      ) : (
        <div>
          {task.content}
          <ActionButtons
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            taskId={task.id}
          />
        </div>
      )}
    </div>
  );
};

export default Task;
