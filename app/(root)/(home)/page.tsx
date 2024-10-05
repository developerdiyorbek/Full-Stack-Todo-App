import { getTodos } from "@/actions/todo.action";
import AddTodo from "./_components/AddTodo";
import { auth } from "@clerk/nextjs/server";
import TodoItem from "./_components/TodoItem";
import { ITodo } from "@/types";

async function Page() {
  const { userId } = auth();
  const todos = await getTodos(userId!);

  return (
    <section className="max-w-2xl mx-auto w-full max-md:px-2">
      <h1 className="text-center max-md:text-2xl text-3xl mb-4">
        Full Stack Todo App
      </h1>
      <AddTodo />
      <ul className="flex flex-col gap-y-2">
        {todos.map((todo: ITodo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}

export default Page;
