import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import EmployeeServices from "../Services/EmployeeServices";
import { IoArrowBackCircle } from "react-icons/io5";

import gsap from "gsap";

const UpdateEmployee = () => {
  useEffect(() => {
    gsap.fromTo(
      ".container",
      { opacity: 0, x: -200 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power4.inOut" }
    );
  }, []);

  let navigate = useNavigate();

  const { id } = useParams();

  const [employee, setEmployee] = useState({
    id: id,
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await EmployeeServices.GetEmployeeById(employee.id);
      setEmployee(response.data);
      console.log("Data fetched successfully");
    } catch (error) {
      console.log("Error fetching employees:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "phone") {
      // Allow only digits and ensure max length of 10
      const phoneRegex = /^[0-9]*$/;
      if (phoneRegex.test(value) && value.length <= 10) {
        setEmployee({ ...employee, [name]: value });
      }
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const EditEmployee = async (e) => {
    e.preventDefault();
    await EmployeeServices.UpdateEmployeeById(employee, id)

      .then((response) => {
        console.log("Update successfully: ", response);
        navigate("/");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <div className="updateemployee container mt-5 mx-auto">
      <div className="head bg-purple-800 h-16 flex justify-between items-center px-5">
        <div className="left text-2xl font-bold text-white">Edit Employees</div>
        <div className=" text-xl justify-center items-center font-semibold text-white">
          <Link
            className="bg-green-500 px-2 rounded-sm text-center text-xl flex items-center"
            to="/"
          >
            <IoArrowBackCircle className="text-white px-2 text-4xl" />
            BACK
          </Link>
        </div>
      </div>
      <div className="form-container p-6 border border-gray-300 bg-white rounded shadow-md mb-6">
        <form onSubmit={EditEmployee}>
          <div className="mb-6">
            <label className="block text-gray-500 text-xl font-semibold mb-2">
              First Name <span className="text-red-500">*</span>{" "}
            </label>
            <input
              autoCorrect="on"
              autoComplete="off"
              type="text"
              name="firstname"
              value={employee.firstname}
              onChange={handleInputChange}
              className="text-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-500 text-xl font-semibold mb-2">
              {" "}
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              autoCorrect="on"
              autoComplete="off"
              type="text"
              name="lastname"
              value={employee.lastname}
              onChange={handleInputChange}
              className="text-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-500 text-xl font-semibold mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              autoCorrect="on"
              autoComplete="off"
              type="email"
              name="email"
              value={employee.email}
              onChange={handleInputChange}
              className="text-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-500 text-xl font-semibold mb-2">
              {" "}
              Address <span className="text-red-500">*</span>
            </label>
            <input
              autoCorrect="on"
              autoComplete="off"
              type="text"
              name="address"
              value={employee.address}
              onChange={handleInputChange}
              className="text-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-500 text-xl font-semibold mb-2">
              {" "}
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              autoCorrect="on"
              autoComplete="off"
              type="text"
              name="phone"
              value={employee.phone}
              onChange={handleInputChange}
              className="text-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white text-xl font-semibold py-1 px-4 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;
