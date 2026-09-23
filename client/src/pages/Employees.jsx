import { useEffect, useState } from "react"
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets"
import { Plus, Search } from "lucide-react"
import EmployeeCard from "../components/EmployeeCard"
import EmployeeFormModal from "../components/EmployeeFormModal"

const Employees = () => {
  const [employees, setEmployees] = useState(dummyEmployeeData)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedDept, setSelectedDept] = useState("")
  const [editEmployee, setEditEmployee] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const fetchEmployees = (id) => {
    if (typeof id === "string") {
      setEmployees((prev) => prev.filter((emp) => (emp._id || emp.id) !== id))
    } else {
      setEmployees(dummyEmployeeData)
    }
  }

  const handleSaveEmployee = (employee) => {
    if (employee._id || employee.id) {
      setEmployees((current) =>
        current.map((item) =>
          (item._id || item.id) === (employee._id || employee.id)
            ? { ...item, ...employee }
            : item
        )
      )
    } else {
      const id = `employee-${Date.now()}`
      setEmployees((current) => [{ ...employee, _id: id, id }, ...current])
    }
    setShowCreateModal(false)
    setEditEmployee(null)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchEmployees()
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [])

  const filtered = employees
    .filter((emp) => (selectedDept ? emp.department === selectedDept : true))
    .filter((emp) =>
      `${emp.firstName || ""} ${emp.lastName || ""} ${emp.position || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your team members</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus size={16} /> Add Employee
        </button>
      </div>

      {/* SearchBar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            placeholder="Search employees..."
            className="w-full pl-10"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="max-w-40"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((deptName) => (
            <option key={deptName} value={deptName}>
              {deptName}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Cards */}
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filtered.length === 0 ? (
            <p className="col-span-full text-center py-16 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
              No employees found
            </p>
          ) : (
            filtered.map((emp) => (
              <EmployeeCard
                key={emp._id || emp.id}
                employee={emp}
                onDelete={fetchEmployees}
                onEdit={(e) => setEditEmployee(e)}
              />
            ))
          )}
        </div>
      )}

      {(showCreateModal || editEmployee) && (
        <EmployeeFormModal
          employee={editEmployee}
          departments={DEPARTMENTS}
          onClose={() => {
            setShowCreateModal(false)
            setEditEmployee(null)
          }}
          onSave={handleSaveEmployee}
        />
      )}
    </div>
  )
}

export default Employees