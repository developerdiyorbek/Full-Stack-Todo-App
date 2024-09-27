import { getTodos } from "@/actions/todo.action";
import AddTodo from "./_components/AddTodo";
import { auth } from "@clerk/nextjs/server";

async function Page() {
  const { userId } = auth();
  const todos = await getTodos(userId!);

  console.log(todos);

  return (
    <section>
      <h1 className="text-center text-3xl">Full Stack Todo App</h1>
      <AddTodo />
    </section>
  );
}

export default Page;
