import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface TodoItem {
  id: number;
  text: string;
}

interface TodoProps {
  name: string;
}

export default function Todo({ name }: TodoProps) {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") {
      toast.error("Please enter a task!");
      return;
    }
    setTodos([...todos, { id: Date.now(), text: newTodo.trim() }]);
    setNewTodo("");
    toast.success("Task added successfully!");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Task deleted successfully!");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <Card className="max-w-[600px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {name}'s Todo List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={addTodo}>
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-3 border rounded-md"
            >
              <span>{todo.text}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTodo(todo.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 