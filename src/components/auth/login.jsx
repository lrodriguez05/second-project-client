import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../../services/auth_services";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-4 py-6 h-screen">
        <div className="w-full bg-white rounded-lg shadow max-w-md">
          <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold text-center">
              Welcome to the best chat room in the world
            </h1>
            <form className="space-y-4 mt-6" onSubmit={handleLogin}>
              <div className="flex flex-col">
                <label className="text-lg mb-2">Username</label>
                <input
                  required
                  value={username}
                  type="text"
                  className="border p-3 rounded-lg"
                  onChange={(e) => (setUsername(e.target.value), setError(""))}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg mb-2">Password</label>
                <input
                  required
                  value={password}
                  type="password"
                  className="border p-3 rounded-lg"
                  onChange={(e) => (setPassword(e.target.value), setError(""))}
                />
              </div>
              <button className="bg-blue-500 w-full p-3 rounded-lg text-white mt-2 hover:bg-blue-600">
                Log in your account
              </button>
              <div className="flex justify-center">
                <label className="text-red-500">{error}</label>
              </div>
              <p>
                Don’t have an account yet?{" "}
                <Link
                  className="text-blue-500 hover:underline cursor-pointer"
                  to="/register"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
