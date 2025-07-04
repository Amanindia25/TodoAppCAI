import { useState } from "react";
import './App.css'
import Todo from "./components/Todo";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { Button } from "./components/ui/button";
import { Toaster, toast } from "sonner";

interface User {
  email: string;
  name: string;
}

function App() {
  const [view, setView] = useState<"login" | "register" | "todo">("register");
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<{ email: string; password: string; name: string; }[]>([]);

  const handleRegistration = (data: { email: string; password: string; name: string; }) => {
    setRegisteredUsers([...registeredUsers, data]);
    setView("login");
  };

  const handleLogin = (data: { email: string; password: string; }) => {
    const foundUser = registeredUsers.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (foundUser) {
      setUser({ email: foundUser.email, name: foundUser.name });
      setView("todo");
      toast.success(`Welcome back, ${foundUser.name}!`);
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView("login");
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 py-8">
      <div className="container mx-auto px-4">
        {user ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div className="text-lg font-medium text-gray-700">
                Welcome, {user.name}!
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
            <Todo name={user.name} />
          </div>
        ) : (
          <>
            <div className="flex justify-center gap-4 mb-8">
              <Button
                onClick={() => setView("register")}
                variant={view === "register" ? "default" : "outline"}
              >
                Register
              </Button>
              <Button
                onClick={() => setView("login")}
                variant={view === "login" ? "default" : "outline"}
                disabled={registeredUsers.length === 0}
              >
                Login
              </Button>
            </div>

            {view === "register" && <Registration onRegister={handleRegistration} />}
            {view === "login" && <Login onLogin={handleLogin} />}
          </>
        )}
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App
