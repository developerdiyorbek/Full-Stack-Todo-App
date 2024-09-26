import { model, models, Schema } from "mongoose";

const TodoSchema = new Schema(
  {
    title: String,
    userId: String,
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Todo = models.Todo || model("Todo", TodoSchema);

export default Todo;
