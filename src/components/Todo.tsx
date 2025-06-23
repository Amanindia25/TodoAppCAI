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
  username: string;
}

export default function Todo({ username }: TodoProps) {
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
    <Card className="w-[90%] max-w-[600px] mx-auto mt-10 bg-gradient-to-r from-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text animate-gradient">
          {username}'s Todo List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            className="border-2 border-purple-200 focus:border-purple-400"
          />
          <Button 
            onClick={addTodo}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            Add
          </Button>
        </div>

        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-gray-700">{todo.text}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-500 hover:text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 