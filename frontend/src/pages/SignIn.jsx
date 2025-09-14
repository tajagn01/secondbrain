import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { setAuth } from "../utils/auth";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function SignIn() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/v1/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setAuth(data.token, form.username);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-3">
      <div className="w-full max-w-md">
        <Card title="Welcome back" subtitle="Sign in to continue">
          {error && <div className="mb-3 text-red-600 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
            <Input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <Button className="w-full" type="submit">Sign In</Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="text-purple-700 underline">Sign Up</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}