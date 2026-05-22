import { motion } from 'framer-motion'
import { LogOut, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Nav() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-30 border-b border-ink-800/80 bg-ink-950/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          {/* <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 shadow-glow">
            <Sparkles className="h-4 w-4 text-ink-950" />
          </span> */}
          <span className="text-base font-bold tracking-tight text-ink-50 group-hover:text-brand-300 transition">
            Skills Matrix
          </span>
        </Link>

        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden sm:flex flex-col items-end leading-tight">
                <span className="text-sm font-medium text-ink-100">{user.full_name}</span>
                <span className="text-xs text-ink-400">
                  {user.email}
                  {user.is_admin && (
                    <span className="ml-2 rounded bg-brand-500/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-300">
                      Admin
                    </span>
                  )}
                </span>
              </div>
              <button onClick={handleLogout} className="btn-ghost">
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-ink-300 hover:text-ink-50 transition">
                Login
              </Link>
              <Link to="/register" className="btn-primary text-sm">
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  )
}
