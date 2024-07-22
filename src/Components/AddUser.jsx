import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import { useNavigate } from "react-router-dom";

const AddUser = () => {

  useEffect(() => {
    gsap.fromTo(".container", 
      { opacity: 0, y: 20, scale:0 }, 
      { opacity: 1, scale: 1, duration: 0.6 }
    );
  }, []);

  let navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:9090/employees", formData);
    navigate('/')

  };



  return (
    

    <div className="container mt-5 px-4 md:px-60">
      <div className="head bg-purple-800 h-16 flex justify-between items-center px-5">
        <div className="left text-2xl font-semibold text-white">
          New Employee
        </div>
        <div className="right left text-xl font-semibold text-white">
          <Link className="bg-green-500 px-3 text-center" to="/">
            {/* <FontAwesomeIcon
                icon={faAdd}
                className="text-white text-xl px-1 font-semibold"
              /> */}
            Back
          </Link>
        </div>
      </div>
      <div className="form-container px-4 py-10 md:px-10 md:py-10 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700  font-bold mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone *
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
