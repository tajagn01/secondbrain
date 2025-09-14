import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import SharedBrain from './shared/SharedBrain.jsx'
import Dashboard from './pages/Dashboard.jsx'

function isAuthed() {
  try {
    return Boolean(localStorage.getItem('token'))
  } catch {
    return false
  }
}

function ProtectedRoute({ children }) {
  if (!isAuthed()) {
    return <Navigate to="/signin" replace />
  }
  return children
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/brain/:shareLink" element={<SharedBrain />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

