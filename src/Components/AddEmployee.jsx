import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";

import EmployeeServices from "../Services/EmployeeServices";

const AddEmployee = () => {
  useEffect(() => {
    gsap.fromTo(
      ".container",
      { opacity: 0, x: -200 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power4.inOut" }
    );
  }, []);

  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
  });

  const reset = (e) => {
    e.preventDefault();
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      address: "",
      phone: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "phone") {
      // Allow only digits and ensure max length of 10
      const phoneRegex = /^[0-9]*$/;
      if (phoneRegex.test(value) && value.length <= 10) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "firstname" || name === "lastname") {
      // Allow only alphabets for names
      const nameRegex = /^[a-zA-Z\s]*$/;
      if (nameRegex.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const saveEmployee = (e) => {
    e.preventDefault();
  
    EmployeeServices.saveEmployee(formData)
      .then((Response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <div className="addemployee container mt-5 mx-auto">
      <div className="head bg-purple-800 h-16 flex justify-between items-center px-5">
        <div className="left text-2xl font-bold text-white">New Employee</div>
        <div className=" text-xl justify-center items-center text-white">
          <Link
            className="bg-green-500 px-2 rounded-sm text-center text-xl flex items-center"
            to="/"
          >
            <IoArrowBackCircle className="text-white px-2 text-4xl" />
            BACK
          </Link>
        </div>
      </div>
      <div className="form-container px-4 py-10 md:px-10 md:py-10 shadow-xl">
        <form onSubmit={saveEmployee} className="flex flex-col">
          <div className="mb-4">
            <label className="block text-gray-500 text-xl font-semibold mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              autoCorrect="on"
              autoComplete="off"
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              className="text-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-500 text-xl font-semibold mb-2">
              {" "}
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              autoCorrect="on"
              autoComplete="off"
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className="text-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-500 text-xl font-semibold mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              autoCorrect="on"
              autoComplete="off"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="text-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-500 text-xl font-semibold mb-2">
              {" "}
              Address <span className="text-red-500">*</span>
            </label>
            <input
              autoCorrect="on"
              autoComplete="off"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="text-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-500 text-xl font-semibold mb-2">
              {" "}
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              autoCorrect="on"
              autoComplete="off"
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="text-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-normal focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white text-xl font-semibold py-1 px-4 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            >
              SUMBIT
            </button>

            <button
              type="submit"
              className="bg-red-400 hover:bg-red-500 text-white font-semibold py-1 px-4 rounded text-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              onClick={reset}
            >
              CLEAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
