import { Pencil, Trash2 } from "lucide-react"

const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  const employeeId = employee._id || employee.id
  const initials = `${employee.firstName?.[0] || ""}${employee.lastName?.[0] || ""}`

  const handleDelete = () => {
    if (window.confirm(`Delete ${employee.firstName} ${employee.lastName}?`)) {
      onDelete(employeeId)
    }
  }

  return (
    <div className="group relative card card-hover overflow-hidden">
        <div className="flex items-center gap-4 bg-slate-50 p-5">
            {employee.image ? (
              <img
                src={employee.image}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-lg font-semibold text-indigo-700">
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <h3 className="truncate font-semibold text-slate-900">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="truncate text-xs text-slate-500">{employee.department}</p>
            </div>
        </div>
        <div className="p-5">
            <p className="text-sm text-slate-600">{employee.position}</p>
            <p className="mt-1 text-xs text-slate-400">{employee.email}</p>
            <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => onEdit(employee)}
                className="btn-secondary flex flex-1 items-center justify-center gap-2"
              >
                <Pencil size={14} /> Edit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                aria-label={`Delete ${employee.firstName} ${employee.lastName}`}
                className="flex items-center justify-center rounded-lg border border-red-200 px-3 text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={15} />
              </button>
            </div>
        </div>
    </div>
  )
}

export default EmployeeCard