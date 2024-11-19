import React, { useEffect, useState, usere } from "react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { BsFillEyeFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

import ConfirmationModal from "./ConfirmationModal";
import EmployeeServices from "../Services/EmployeeServices";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [showNoData, setShowNoData] = useState(false); // Add state for "No data" message

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = searchTerm
          ? await EmployeeServices.searchEmployeesByName(searchTerm)
          : await EmployeeServices.GetEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearchTerm(searchTerm);

    if (e.target.value === "") {
      setEmployees();
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  let navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      ".cont",
      { opacity: 0, x: -200 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power4.inOut" }
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeServices.GetEmployees();
        setEmployees(response.data); // Ensure data is set correctly
        // console.log("Data fetched successfully");
      } catch (error) {
        console.log("Error fetching employees:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (employees.length === 0) {
      setShowNoData(true);
    } else {
      setShowNoData(false);
    }
  }, [employees]);

  useEffect(() => {
    if (showNoData) {
      gsap.fromTo(
        ".no-data-message",
        { opacity: 0, x: -200 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power4.inOut" }
      );
    }
  }, [showNoData]);

  // const deleteEmployee = async (id) => {
  //   const rowElement = document.querySelector(`#employee-row-${id}`);
  //   if (rowElement) {
  //     gsap.to(rowElement, {
  //       opacity: 0,
  //       height: 0,
  //       x: -10,
  //       duration: 0.5,
  //       ease: "power4.inOut",
  //       onComplete: () => {
  //         EmployeeServices.DeleteEmployeeById(id)
  //           .then(() => {
  //             setEmployees((prevEmployees) =>
  //               prevEmployees.filter((employee) => employee.id !== id)
  //             );

  //             if (employees.length === 1) {
  //               setShowNoData(true);
  //             }
  //           })
  //           .catch((error) => {
  //             console.log("Error deleting employee:", error);
  //           });
  //       },
  //     });
  //   }
  // };

  const deleteEmployee = async (id) => {
    const rowElement = document.querySelector(`#employee-row-${id}`);
    if (rowElement) {
      // Faster disappearing animation for the row
      gsap.to(rowElement, {
        opacity: 0,
        height: 0,
        x: -10,
        duration: 0.2,  // Reduced the duration for faster animation
        ease: "power4.inOut",
        onComplete: () => {
          // Once the row disappears, delete the employee
          EmployeeServices.DeleteEmployeeById(id)
            .then(() => {
              setEmployees((prevEmployees) =>
                prevEmployees.filter((employee) => employee.id !== id)
              );
  
              // Check if there are no employees left
              if (employees.length === 1) {
                setShowNoData(true);
              }
            })
            .catch((error) => {
              console.log("Error deleting employee:", error);
            });
        },
      });
    }
  };
  
  const EditEmployee = async (e, id) => {
    e.preventDefault();
    navigate(`/editEmployee/${id}`);
  };

  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteEmployee(userToDelete);
      setUserToDelete(null);
      setIsModalOpen(false);
    }
  };

  return (
    <main className="main w-full mx-auto px-5">
      <div className="cont bg-white h-auto mt-6 shadow-xl">
        <div className="head bg-purple-800 h-auto px-5 custom-header">
          <div className="title text-2xl font-semibold text-white">
            Manage Employees
          </div>

          {/* First Separator */}
          <hr className="separator mobile-only" />

          <div className="actions-container flex items-center">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="search"
                value={searchTerm}
                onChange={handleChange}
                className="search-bar w-full shadow appearance-none border rounded px-3 py-1 text-gray-700 leading-tight focus:outline-none"
                placeholder="Search"
              />
            </form>

            <Link
              className="add-btn bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded-sm flex items-center justify-center"
              to="/addEmployee"
            >
              <IoMdAddCircle className="text-white text-3xl mr-2" />
              <span className="add-text">ADD</span>
            </Link>
          </div>
        </div>

        <div className="data-table relative overflow-x-auto mx-5 my-5 shadow-xl">
          <table className="min-w-full text-sm text-center dark:text-gray-400 shadow-purple-200 shadow-md mb-5 border-collapse transition-all duration-500 ease-linear">
            <thead className="headings text-[1rem] text-gray-700 uppercase bg-white border-b-2 border-b-black">
              <tr>
                <th className="px-2 md:px-6 py-3 text-xl md:text-2xl border-r border-gray-300">
                  #
                </th>
                <th className="px-2 md:px-6 py-3 border-r border-gray-300">
                  First Name
                </th>
                <th className="px-2 md:px-6 py-3 border-r border-gray-300">
                  Last Name
                </th>
                <th className="px-2 md:px-6 hidden md:table-cell py-3 border-r border-gray-300">
                  Email
                </th>
                <th className="px-2 md:px-6 py-3 hidden md:table-cell border-r border-gray-300">
                  Address
                </th>
                <th className="px-2 md:px-6 py-3 border-r border-gray-300 ">
                  Phone
                </th>
                <th className="actions px-2 md:px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="smooth-height">
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                  <tr key={employee.id} id={`employee-row-${employee.id}`}>

                    <td className="px-6 py-4 font-medium text-gray-900 text-lg whitespace-nowrap border-r border-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap text-lg border-r border-gray-300">
                      {employee.firstname}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap text-lg border-r border-gray-300">
                      {employee.lastname}
                    </td>
                    <td className="px-6 py-4 text-gray-900 hidden md:table-cell whitespace-nowrap text-lg border-r border-gray-300">
                      {employee.email}
                    </td>
                    <td className="px-6 py-4 text-gray-900 hidden md:table-cell whitespace-nowrap text-lg border-r border-gray-300">
                      {employee.address}
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap text-lg border-r border-gray-300">
                      {employee.phone}
                    </td>
                    <td className="actions text-gray-900 whitespace-nowrap py-2 text-lg flex justify-evenly items-center">
                      <Link
                        className="py-2 text-center text-white flex"
                        to={`/viewEmployee/${employee.id}`}
                      >
                        <BsFillEyeFill className="text-blue-500 text-2xl" />
                      </Link>
                      <button
                        className="text-center"
                        onClick={(e) => EditEmployee(e, employee.id)}
                      >
                        <FaEdit className="text-yellow-500 text-2xl" />
                      </button>
                      <button
                        className="text-center"
                        onClick={() => handleDeleteClick(employee.id)}
                      >
                        <RiDeleteBin6Line className="text-red-500 text-2xl" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="no-data-message text-center text-2xl text-gray-600 py-4"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmationModal
        message="Are you sure you want to delete this employee?"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
};

export default Home;
