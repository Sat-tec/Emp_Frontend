import React, { useEffect, useState } from "react";
import gsap from 'gsap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from './ConfirmationModal';
import EmployeeServices from "../Services/EmployeeServices";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [showNoData, setShowNoData] = useState(false); // Add state for "No data" message

  let navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(".cont",
      { opacity: 0, x: -200 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power4.inOut" }
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeServices.GetEmployees();
        setEmployees(response.data);  // Ensure data is set correctly
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
      gsap.fromTo(".no-data-message",
        { opacity: 0, x: -200 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power4.inOut" }
      );
    }
  }, [showNoData]);

  const deleteEmployee = async (id) => {
    const rowElement = document.querySelector(`#employee-row-${id}`);
    if (rowElement) {
      gsap.to(rowElement, {
        opacity: 0,
        height: 0,
        x: -10,
        duration: 0.5,
        ease: "power4.inOut",
        onComplete: () => {
         
          EmployeeServices.DeleteEmployeeById(id)
            .then(() => {
              setEmployees((prevEmployees) =>
                prevEmployees.filter((employee) => employee.id !== id)
              );
              
              if (employees.length === 1) {
                setShowNoData(true);
              }
            })
            .catch(error => {
              console.log("Error deleting employee:", error);
            });
        }
      });
    }
  };

  const EditEmployee = async (e, id) => {
    e.preventDefault();
    navigate(`/editEmployee/${id}`);
  }


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
    <main>
      <div className="cont bg-white h-auto mt-6 mx-5 shadow-xl">
        <div className="head bg-purple-800 h-16 flex justify-between items-center px-5">
          <div className="left text-2xl font-semibold text-white">
            Manage Employees
          </div>
          <div className="right text-xl font-semibold text-white">
            <Link
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              to="/addEmployee"
            >
              <FontAwesomeIcon
                icon={faAdd}
                className="text-white text-xl mx-2 font-semibold"
              />
              Add
            </Link>
          </div>
        </div>

        <div className="relative overflow-x-auto mx-5 my-5">
          <table className=" min-w-full text-sm text-center text-gray-500 dark:text-gray-400 shadow-purple-200 shadow-md mb-5">
            <thead className="text-[1rem] text-gray-700 uppercase bg-gray-50 border-b-2 border-b-black">
              <tr>
                <th scope="col" className="px-2 md:px-6 py-3 text-xl md:text-2xl">
                  #
                </th>
                <th scope="col" className="px-2 md:px-6 py-3">
                  First Name
                </th>
                <th scope="col" className="px-2 md:px-6 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-2 md:px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-2 md:px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-2 md:px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-2 md:px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                  <tr
                    id={`employee-row-${employee.id}`}  // Ensure each row has a unique ID
                    key={employee.id}
                    className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'dark:bg-gray-100' : 'bg-gray-200'}`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 text-lg whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4 text-gray-900 text-lg">
                      {employee.firstname}
                    </td>
                    <td className="px-6 py-4 text-gray-900 text-lg">
                      {employee.lastname}
                    </td>
                    <td className="px-6 py-4 text-gray-900 text-lg">
                      {employee.email}
                    </td>
                    <td className="px-6 py-4 text-gray-900 text-lg">
                      {employee.address}
                    </td>
                    <td className="px-6 py-4 text-gray-900 text-lg">
                      {employee.phone}
                    </td>
                    <td className="px-6 py-4 text-gray-900 text-lg">
                      <Link
                        className="bg-blue-500 px-7 py-2 text-center text-white"
                        to={`/viewEmployee/${employee.id}`}
                      >
                        View
                      </Link>
                      <button
                        className="bg-purple-500 px-7 py-2 text-center text-white mx-2"
                        onClick={(e) => EditEmployee(e, employee.id)}
                      >
                        Edit
                      </button>

                      <button
                        className="bg-red-400 px-7 py-2 text-center text-white"
                        onClick={() => handleDeleteClick(employee.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data-message text-center text-2xl text-gray-600 py-4"
                    style={{ lineHeight: '2.5' }}>
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


