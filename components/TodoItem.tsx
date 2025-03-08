"use client";

import { useState } from "react";
import { Todo, UpdateTodoInput } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, data: UpdateTodoInput) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      await onUpdate(todo.id, { completed: !todo.completed });
    } catch (error) {
      console.error("Failed to update todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!title.trim()) return;

    setIsLoading(true);

    try {
      await onUpdate(todo.id, {
        title,
        description: description || null,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update todo", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this todo?")) return;

    setIsLoading(true);
    try {
      await onDelete(todo.id);
    } catch (error) {
      console.error("Failed to delete todo:", error);
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          required
        />
        <textarea
          value={description || ""}
          onChange={e => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          rows={2}
        />
        <div className="flex space-x-2">
          <button
            onClick={handleSaveEdit}
            disabled={isLoading || !title.trim()}
            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400"
          >
            Save
          </button>
          <button
            onClick={() => {
              setTitle(todo.title);
              setDescription(todo.description || "");
              setIsEditing(false);
            }}
            disabled={isLoading}
            className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            disabled={isLoading}
            className="mt-1"
          />
          <div>
            <h3
              className={`font-medium ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p
                className={`text-sm mt-1 ${
                  todo.completed ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {todo.description}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Created: {new Date(todo.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
            className="px-2 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="px-2 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
