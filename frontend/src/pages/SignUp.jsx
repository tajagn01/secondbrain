import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/v1/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).message);
      navigate("/signin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-400 to-purple-700">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Sign Up</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <input
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="w-full bg-purple-600 text-white py-3 rounded font-semibold hover:bg-purple-700 transition" type="submit">
          Sign Up
        </button>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/signin" className="text-purple-700 underline">Sign In</Link>
        </p>
      </form>
    </div>
  );
}