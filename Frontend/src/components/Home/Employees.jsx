import { useState } from "react";
import EmployeesEditModal from "../EmployeesEditModal";

function Employees() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-900">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-gray-900">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search-users"
                            className="block pt-2 ps-10 text-sm text-gray-100 border border-gray-700 rounded-lg w-80 bg-gray-800 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                            placeholder="Search for users"
                        />
                    </div>
                </div>

                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-gray-300 uppercase bg-gray-800">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Department</th>
                            <th scope="col" className="px-6 py-3">Contact No.</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="bg-gray-900 border-b hover:bg-gray-800 border-gray-700">
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-100 whitespace-nowrap">
                                <div className="ps-3">
                                    <div className="text-base font-semibold">Neil Sims</div>
                                    <div className="font-normal text-gray-400">neil.sims@flowbite.com</div>
                                </div>
                            </th>

                            <td>
                                <div className="ps-3">
                                    <div className="text-base font-semibold text-gray-100">HR</div>
                                    <div className="font-normal text-gray-400">Client Support</div>
                                </div>
                            </td>

                            <td className="px-6 py-4 text-gray-100">9182187119</td>

                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                                    Active
                                </div>
                            </td>

                            <td className="px-6 py-4 flex w-full justify-start gap-4">
                                <button
                                    className="text-md text-white bg-blue-600 hover:bg-blue-700 py-2 px-3 rounded-full"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Edit User
                                </button>
                                <button className="text-md text-white bg-red-600 hover:bg-red-700 py-2 px-3 rounded-full">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Modal component */}
            {isModalOpen && <EmployeesEditModal setIsModalOpen={setIsModalOpen} />}
        </>
    );
}

export default Employees;
