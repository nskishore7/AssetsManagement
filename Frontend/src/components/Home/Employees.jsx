import { useEffect, useState } from "react"
import EmployeeEditModal from "../EmployeesEditModal"
import axios from "axios"
import toast from "react-hot-toast"

function Employees() {
  const [employees, setEmployees] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editEmployee, setEditEmployee] = useState({})
  const [searchQuery, setSearchQuery] = useState("")

  const fetchEmployees = async () => {
    try {
      let response = await axios.get("http://localhost:8080/api/v1/user/employees", { withCredentials: true })
      setEmployees(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!isModalOpen) {
      fetchEmployees()
    }
  }, [isModalOpen])

  const handleModalOpen = (employee) => {
    setEditEmployee(employee)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setEditEmployee({})
    setIsModalOpen(false)
  }

  const addEmployeeModal = () => {
    setEditEmployee({})
    setIsModalOpen(true)
  }

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

      async function DeleteHandle(id) {
        try {
          toast.loading("Deleting........",{id:"delete"})
          
            await axios.delete("http://localhost:8080/api/v1/user/delete/employee", {
                withCredentials: true,
                headers: {
                userid: id,
            },
            });

            setEmployees((prev) => prev.filter((emp) => emp._id !== id));
            toast.success("Deleted.......",{id:"delete"})
        } catch (error) {
            toast.error("Failed to Delete Employee:",{id:"delete"});
        }  
    }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 px-2 bg-white dark:bg-gray-900">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="table-search-users"
              className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
          <div>
            <button
              className="text-md text-white hover:bg-white hover:text-blue-500 bg-blue-500 py-2 px-2 rounded-sm border border-blue-400"
              onClick={addEmployeeModal}
            >
              ADD EMPLOYEE
            </button>
          </div>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Contact No</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="ps-3">
                    <div className="text-base font-semibold">{employee.name}</div>
                    <div className="font-normal text-gray-500">{employee.email}</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div className="text-base font-semibold">{employee.department}</div>
                  <div className="font-normal text-gray-500">{employee.designation}</div>
                </td>
                <td>{employee.mobile}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{employee.status}
                  </div>
                </td>
                <td className="px-6 py-4 flex gap-4">
                  <button className="text-md text-white hover:underline bg-blue-500 py-2 px-2 rounded-full"
                    onClick={() => handleModalOpen(employee)}>Edit</button>
                  <button className="text-md text-white hover:underline bg-red-500 py-2 px-2 rounded-full"  onClick={() => DeleteHandle(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <EmployeeEditModal handleModalClose={handleModalClose} editEmployee={editEmployee} />}
    </>
  )
}

export default Employees
