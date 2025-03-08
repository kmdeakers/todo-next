import Image from "next/image";
import styles from "./page.module.css";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <TodoList />
    </div>
  );
}
