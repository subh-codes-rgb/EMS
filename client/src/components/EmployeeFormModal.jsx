import { X } from "lucide-react"
import { useEffect, useState } from "react"

const emptyEmployee = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  department: "Engineering",
  position: "",
  employmentStatus: "ACTIVE",
}

const EmployeeFormModal = ({ employee, departments, onClose, onSave }) => {
  const [form, setForm] = useState(employee || emptyEmployee)

  useEffect(() => {
    setForm(employee || emptyEmployee)
  }, [employee])

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave(form)
  }

  const isEditing = Boolean(employee)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="employee-form-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 id="employee-form-title" className="text-xl font-semibold text-slate-900">
              {isEditing ? "Edit employee" : "Add employee"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {isEditing ? "Update the employee details below." : "Add a new member to your team."}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close form" className="text-slate-400 transition hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              First name
              <input name="firstName" value={form.firstName} onChange={updateField} required className="mt-2" />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Last name
              <input name="lastName" value={form.lastName} onChange={updateField} required className="mt-2" />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Email
              <input type="email" name="email" value={form.email} onChange={updateField} required className="mt-2" />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Phone
              <input type="tel" name="phone" value={form.phone} onChange={updateField} className="mt-2" />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Position
              <input name="position" value={form.position} onChange={updateField} required className="mt-2" />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Department
              <select name="department" value={form.department} onChange={updateField} className="mt-2">
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium text-slate-700 sm:col-span-2">
              Employment status
              <select name="employmentStatus" value={form.employmentStatus} onChange={updateField} className="mt-2">
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isEditing ? "Save changes" : "Add employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmployeeFormModal