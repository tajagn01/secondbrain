import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-3">
      <div className="w-full max-w-md">
        <Card title="Create account" subtitle="Start building your second brain">
          {error && <div className="mb-3 text-red-600 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
            <Input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <Button className="w-full" type="submit">Sign Up</Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account? <Link to="/signin" className="text-purple-700 underline">Sign In</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}