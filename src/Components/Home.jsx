import React, { useEffect, useState } from "react";
// import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ConfirmationModal from './ConfirmationModal';

import axios from "axios";

const Home = () => {

  const [isModalOpen, setIsModalOpen] = useState(false); // Declare modal state
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    gsap.fromTo(".cont", 
      { opacity: 0, y: 20, scale:0 }, 
      { opacity: 1, scale: 1, duration: 0.5 }
    );
  }, []);


  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Load users on component mount
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:9090/employees");
      setUsers(result.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/employees/${id}`);
      // Refresh users list after deletion
      loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
      setUserToDelete(null);
      setIsModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
    setIsModalOpen(false);
  };


  return (
    <main>
      <div className="cont bg-white h-auto mt-6 mx-5 shadow-xl ">
        <div className="head bg-purple-800 h-16 flex justify-between items-center px-5">
          <div className="left text-2xl font-semibold text-white">
            Manage Employees
          </div>
          <div className="right left text-xl font-semibold text-white">
            <Link className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-2  focus:outline-none focus:ring-2 focus:ring-green-400" to="/adduser">
              <FontAwesomeIcon
                icon={faAdd}
                className="text-white text-xl mx-2 font-semibold"
              />
              Add
            </Link>
          </div>
        </div>

        <div className="relative overflow-x-auto mx-5  my-5">
          <table className="min-w-full text-sm text-center text-gray-500 dark:text-gray-400 shadow-purple-200 shadow-md mb-5">
            <thead className="text-[1rem] text-gray-700 uppercase bg-gray-50  border-b-2 border-b-black">
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
              {users.map((user, index) => (
                <tr
                  key={index}
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'dark:bg-gray-100' : 'bg-gray-200'}`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 text-lg whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 text-gray-900 text-lg">
                    {user.firstname}
                  </td>
                  <td className="px-6 py-4 text-gray-900 text-lg">{user.lastname}</td>
                  <td className="px-6 py-4 text-gray-900 text-lg">{user.email}</td>
                  <td className="px-6 py-4 text-gray-900 text-lg">{user.address}</td>
                  <td className="px-6 py-4 text-gray-900 text-lg">{user.phone}</td>
                  <td className="px-6 py-4 text-gray-900 text-lg">
                    <Link className="bg-blue-500 px-7 py-2 text-center text-white" to={`/ViewUser/${user.id}`}>
                      View
                    </Link>
                    <Link className="bg-purple-500 px-7 py-2 text-center text-white mx-2" to={`/edituser/${user.id}`}>
                      Edit
                    </Link>
                    <Link className="bg-red-400 px-7 py-2 text-center text-white" to="/" onClick={() => handleDeleteClick(user.id)}>
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>


          </table>
        </div>
      </div>
      <ConfirmationModal
        message="Are you sure you want to delete?"
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        
      />

    </main>
  );
};

export default Home;
