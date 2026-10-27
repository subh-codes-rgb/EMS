import { format } from 'date-fns'
import { Check, Loader2, X } from 'lucide-react'
import React, { useState } from 'react'

const LeaveHistory = ({ leaves, isAdmin, onUpdate }) => {
  const [processing, setProcessing] = useState(null)

  const handleStatusUpdate = async (id, status) => {
    try {
      setProcessing(id)
      if (onUpdate) {
        await onUpdate(id, status)
      }
    } catch (error) {
      console.error('Failed to update leave status:', error)
    } finally {
      setProcessing(null)
    }
  }

  return (
    <div className='card overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='table-modern w-full text-left border-collapse'>
          <thead>
            <tr>
              {isAdmin && <th className='p-4'>Employee</th>}
              <th className='p-4'>Type</th>
              <th className='p-4'>Dates</th>
              <th className='p-4'>Reason</th>
              <th className='p-4'>Status</th>
              {isAdmin && <th className='p-4 text-center'>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 6 : 4} className='text-center py-12 text-slate-400'>
                  No Leave applications found
                </td>
              </tr>
            ) : (
              leaves.map((leave) => {
                const leaveId = leave._id || leave.id
                const isItemProcessing = processing === leaveId

                return (
                  <tr key={leaveId} className='border-b border-slate-100 hover:bg-slate-50/50'>
                    {isAdmin && (
                      <td className='p-4 text-slate-900 font-medium'>
                        {leave.employee?.firstName} {leave.employee?.lastName}
                      </td>
                    )}
                    
                    <td className='p-4'>
                      <span className='badge bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-semibold'>
                        {leave.type}
                      </span>
                    </td>

                    <td className='p-4 text-xs text-slate-500'>
                      {format(new Date(leave.startDate), "MMM dd")} - {format(new Date(leave.endDate), "MMM dd, yyyy")}
                    </td>

                    <td className='p-4 max-w-xs truncate text-slate-500' title={leave.reason}>
                      {leave.reason}
                    </td>

                    <td className='p-4'>
                      <span className={`badge px-2.5 py-1 rounded-full text-xs font-semibold ${
                        leave.status === "APPROVED" 
                          ? "bg-emerald-100 text-emerald-700" 
                          : leave.status === "REJECTED" 
                          ? "bg-rose-100 text-rose-700" 
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {leave.status}
                      </span>
                    </td>

                    {isAdmin && (
                      <td className='p-4'>
                        {leave.status === "PENDING" && (
                          <div className='flex justify-center gap-2'>
                            <button 
                              onClick={() => handleStatusUpdate(leaveId, "APPROVED")} 
                              disabled={!!processing}   
                              className='p-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors disabled:opacity-50'
                              title="Approve"
                            >
                              {isItemProcessing ? <Loader2 className='w-4 h-4 animate-spin'/> : <Check className='w-4 h-4'/>}
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(leaveId, "REJECTED")} 
                              disabled={!!processing} 
                              className='p-1.5 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors disabled:opacity-50'
                              title="Reject"
                            >
                              {isItemProcessing ? <Loader2 className='w-4 h-4 animate-spin'/> : <X className='w-4 h-4'/>}
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeaveHistory