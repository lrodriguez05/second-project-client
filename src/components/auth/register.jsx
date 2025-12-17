import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { register } from "../../services/auth_services";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      const data = await register(username, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-4 py-6 h-screen">
        <div className="w-full bg-white rounded-lg shadow max-w-md">
          <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="flex flex-col">
                <label className="text-lg mb-2">Username</label>
                <input
                  type="text"
                  className="border p-3 rounded-lg"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg mb-2">Password</label>
                <input
                  type="password"
                  className="border p-3 rounded-lg"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg mb-2">Confirm Password</label>
                <input
                  type="password"
                  className="border p-3 rounded-lg"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="text-center">
                <label className="text-red-500">{error}</label>
              </div>
              <button
                disabled={loading}
                className="bg-blue-500 w-full p-3 rounded-lg text-white mt-3 hover:bg-blue-600"
              >
                {loading ? "Creating..." : "Create an account"}
              </button>
              <p>
                Already have an account?{" "}
                <Link
                  className="text-blue-500 hover:underline cursor-pointer"
                  to="/login"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
