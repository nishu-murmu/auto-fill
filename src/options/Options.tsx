import Layout from './components/Layout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Register } from './pages/SignUp'
import Login from './pages/Login'

function App() {
  return (
    <main className="font-Inter">
      <HashRouter>
        <Routes>
          <Route index={true} path="/" element={<Layout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </HashRouter>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        limit={1}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </main>
  )
}

export default App
