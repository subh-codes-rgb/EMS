import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { BarChart3, CalendarDays, FileText, LayoutDashboard, Menu, Settings, UserIcon, Users, XIcon } from 'lucide-react'
import { dummyProfileData } from '../assets/assets'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/employees', label: 'Employees', icon: Users },
  { to: '/attendance', label: 'Attendance', icon: CalendarDays },
  { to: '/leave', label: 'Leave', icon: FileText },
  { to: '/payslips', label: 'Pay Slips', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
]

const Sidebar = () => {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const fullName = `${dummyProfileData.firstName} ${dummyProfileData.lastName}`.trim()
    setUserName(fullName)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const role = ''

  const sidebarContent = (
    <>
      <div className='px-5 pt-6 pb-5 border-white/6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <UserIcon className='text-white size-7' />
            <div>
              <p className='font-semibold text-[13px] text-white tracking-wide'>Employee MS</p>
              <p className='text-[11px] text-slate-500 font-medium'>Management System</p>
            </div>
          </div>
          <button onClick={() => setMobileOpen(false)} className='lg:hidden text-slate-400' aria-label='Close navigation'>
            <XIcon size={20} />
          </button>
        </div>
      </div>

      {userName && (
        <div className='mx-3 mt-4 mb-1 p-3 rounded-lg bg-white/3 border border-white/4'>
          <div className='flex items-center gap-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-slate-200 text-xs font-semibold'>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className='min-w-0'>
              <p className='text-[13px] font-medium text-slate-200 truncate'>{userName}</p>
              <p className='text-[11px] text-slate-500 truncate'>{role === 'ADMIN' ? 'Administrator' : 'Employee'}</p>
            </div>
          </div>
        </div>
      )}

      <div className='px-3 pt-5 pb-4'>
        <p className='mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500'>Menu</p>
        <nav className='space-y-1'>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-500/15 text-indigo-200 border border-indigo-400/20'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className='mt-auto px-3 pb-5'>
        <button className='w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-slate-300 transition hover:bg-white/10 hover:text-white'>
          Logout
        </button>
      </div>
    </>
  )

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg border border-white/10'
        aria-label='Open navigation'
      >
        <Menu size={20} />
      </button>
      {mobileOpen && <div onClick={() => setMobileOpen(false)} className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40'></div>}

      <aside className='hidden lg:flex flex-col h-full w-64 bg-linear-to-b from-slate-900 to-slate-950 text-white shrink-0 border-r border-white/10'>
        {sidebarContent}
      </aside>

      <aside className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white z-50 flex flex-col transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebarContent}
      </aside>
    </>
  )
}

export default Sidebar