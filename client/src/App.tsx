import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import PrivateRoute from '@/components/auth/PrivateRoute'
import HomePage from '@/pages/HomePage'
import PostDetailPage from '@/pages/PostDetailPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import SettingsPage from '@/pages/SettingsPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
