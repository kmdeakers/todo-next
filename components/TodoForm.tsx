"use client";

import { useState } from "react";
import { CreateTodoInput } from "@/types/todo";

interface TodoformProps {
  onSubmit: (data: CreateTodoInput) => Promise<void>;
}

export default function TodoForm({ onSubmit }: TodoformProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    await onSubmit({ title, description });
    try {
      await onSubmit({ title, description });
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Failed to create todo", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <h2>Add New Todo</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter todo title"
          className=""
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <textarea
          value={description}
          id="description"
          name="description"
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          className=""
          rows={3}
          disabled={isSubmitting}
        />
      </div>
      <div>
        <button
          type="submit"
          className=''
          disabled={isSubmitting || !title.trim()}
        >
          {isSubmitting ? "Creating..." : "Create Todo"}
        </button>
      </div>
    </form>
  );
}
