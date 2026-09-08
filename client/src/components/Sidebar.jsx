import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BarChart3, CalendarDays, FileText, LayoutDashboard, Menu, Settings, Users, X } from 'lucide-react'

const Sidebar = () => {
    const [mobileOpen, setMobileOpen] = useState(false)

    const sidebarContent = (
        <div className="flex h-full flex-col p-4">
            <div className="mb-8 flex items-center justify-between px-2">
                <div>
                    <p className="text-lg font-semibold">EMS</p>
                    <p className="text-xs text-slate-400">Employee management</p>
                </div>
                <button className="lg:hidden rounded-md p-2 text-slate-300 hover:bg-white/10" onClick={() => setMobileOpen(false)} aria-label="Close navigation">
                    <X size={18} />
                </button>
            </div>
            <nav className="space-y-1">
                {[
                    ['/dashboard', 'Dashboard', LayoutDashboard],
                    ['/employees', 'Employees', Users],
                    ['/attendance', 'Attendance', CalendarDays],
                    ['/leave', 'Leave', FileText],
                    ['/payslips', 'Pay slips', BarChart3],
                    ['/settings', 'Settings', Settings],
                ].map(([to, label, Icon]) => (
                    <NavLink
                        key={to}
                        to={to}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${isActive ? 'bg-indigo-500 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
                    >
                        <Icon size={18} />
                        {label}
                    </NavLink>
                ))}
            </nav>
        </div>
    )

  return (
    <>
        {/* Mobile hamburger button*/}
        <button onClick={() => setMobileOpen(true)} className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg border border-white/10' aria-label="Open navigation">
            <Menu size={20}/>
        </button>
        {mobileOpen && <div onClick={() => setMobileOpen(false)} className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40'></div>}

        {/* Sidebar desktop */}
        <aside className='hidden lg:flex flex-col h-full w-64 bg-linear-to-b from-slate-900 to-slate-950 text-white shrink-0 border-r border-white/10'>
            {sidebarContent}
        </aside>

        {/* Sidebar mobile */}
        <aside className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white z-50 flex flex-col transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {sidebarContent}
        </aside>
    </>
  )
}

export default Sidebar