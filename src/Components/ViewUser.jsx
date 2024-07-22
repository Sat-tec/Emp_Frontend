import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import gsap from 'gsap';

const ViewUser = () => {

    useEffect(() => {
        gsap.fromTo(".mt-5", 
          { opacity: 0, y: 20, scale:0 }, 
          { opacity: 1, scale: 1, duration: 0.5 }
        );
      }, []);

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        phone: "",
    });
   
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
     
        loadUser();
    }, [id]);

    const loadUser = async () => {
        try {
            const result = await axios.get(`http://localhost:9090/employees/${id}`);
            setUser(result.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error loading user: {error.message}</p>;


    return (
        <div className="container mt-5 px-52  w-auto h-auto">
            <div className="head bg-purple-800 h-16 flex justify-between items-center px-5">
                <div className="left text-2xl font-semibold text-white">
                    Details of User id: {user.id}
                </div>


                <div className="right left text-xl font-semibold text-white">
                    <Link className="bg-green-500 px-3 text-center" to="/">
                        Back
                    </Link>
                </div>
            </div>
            <div className="table-container  px-9 py-11  shadow-xl">


                <table className="min-w-full bg-white border border-gray-300 table-fixed">
                    <tbody>
                        <tr className="w-full">
                            <td className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left font-semibold text-lg">
                                First Name
                            </td>
                            <td className="px-6 py-3 border-b border-gray-200 text-lg">
                                {user.firstname}
                            </td>
                        </tr>
                        <tr className="w-full">
                            <td className="px-4 py-3 border-b border-gray-200 bg-gray-100 text-left font-semibold text-lg">
                                Last Name
                            </td>
                            <td className="px-6 py-3 border-b border-gray-200 text-lg">
                                {user.lastname}
                            </td>
                        </tr>
                        <tr className="w-full">
                            <td className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left font-semibold text-lg">
                                Email
                            </td>
                            <td className="px-6 py-3 border-b border-gray-200 text-lg">
                                {user.email}
                            </td>
                        </tr>
                        <tr className="w-full">
                            <td className="px-4 py-3 border-b border-gray-200 bg-gray-100 text-left font-semibold text-lg">
                                Address
                            </td>
                            <td className="px-6 py-3 border-b border-gray-200 text-lg">
                                {user.address}
                            </td>
                        </tr>
                        <tr className="w-full">
                            <td className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left font-semibold text-lg">
                                Phone
                            </td>
                            <td className="px-6 py-3 border-b border-gray-200 text-lg">
                                {user.phone}
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default ViewUser
