import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"
import gsap from 'gsap';

const EditUser = () => {

    useEffect(() => {
        gsap.fromTo(".container",
            { opacity: 0, y: 20, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.5 }
        );
    }, []);

    let navigate = useNavigate();

    const { id } = useParams();

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

    useEffect(() => {
        loadUsers();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:9090/employees/${id}`, formData);
        navigate('/')
    };

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:9090/employees/${id}`);
        setFormData(result.data)
    }

    return (
        <div className="container mt-5 px-52">
            <div className="head bg-purple-800 h-16 flex justify-between items-center px-5">
                <div className="left text-2xl font-semibold text-white">
                    Edit Employees
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
            <div className="form-container p-6 border border-gray-300 bg-white rounded shadow-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-800 text-base font-semibold mb-2">
                            First Name *
                        </label>
                        <input
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleInputChange}
                            className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-800 text-base font-semibold mb-2">
                            Last Name *
                        </label>
                        <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleInputChange}
                            className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-800 text-base font-semibold mb-2">
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-800 text-base font-semibold mb-2">
                            Address *
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-800 text-base font-semibold mb-2">
                            Phone *
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default EditUser
