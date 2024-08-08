import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";

import gsap from 'gsap';
import EmployeeServices from '../Services/EmployeeServices';

const ViewEmployee = () => {

    useEffect(() => {
        gsap.fromTo(".mt-5",
            { opacity: 0, x: -200 },
            { opacity: 1, x: 0, duration: 0.6, ease: "power4.inOut" }
        );
    }, []);

    const { id } = useParams();

    const [employee, setemployee] = useState({
        id: id,
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        phone: "",
    });


    useEffect(() => {
        ViewEmployee();
    }, []);

    const ViewEmployee = async () => {
        try {
            const result = await EmployeeServices.GetEmployeeById(employee.id);
            setemployee(result.data);

        } catch (error) {
            setError(error);

        }
    }



    return (
        <div className="container mt-5 px-52  w-auto h-auto">
            <div className="head bg-purple-800 h-16 flex justify-between items-center px-5">
                <div className="left text-2xl font-semibold text-white">
                    Details of employee id: {employee.id}
                </div>


                <div className=" text-xl justify-center items-center text-white font-semibold">
                    <Link className="bg-green-500 px-2 rounded-sm text-center font-semibold text-xl flex items-center" to="/">

                        <IoArrowBackCircle className="text-white px-2 text-4xl" />
                        BACK
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
                                {employee.firstname}
                            </td>
                        </tr>
                        <tr className="w-full">
                            <td className="px-4 py-3 border-b border-gray-200 bg-gray-100 text-left font-semibold text-lg">
                                Last Name
                            </td>
                            <td className="px-6 py-3 border-b border-gray-200 text-lg">
                                {employee.lastname}
                            </td>
                        </tr>
                        <tr className="w-full">
                            <td className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left font-semibold text-lg">
                                Email
                            </td>
                            <td className="px-6 py-3 border-b border-gray-200 text-lg">
                                {employee.email}
                            </td>
                        </tr>
                        <tr className="w-full">
                            <td className="px-4 py-3 border-b border-gray-200 bg-gray-100 text-left font-semibold text-lg">
                                Address
                            </td>
                            <td className="px-6 py-3 border-b border-gray-200 text-lg">
                                {employee.address}
                            </td>
                        </tr>
                        <tr className="w-full">
                            <td className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left font-semibold text-lg">
                                Phone
                            </td>
                            <td className="px-6 py-3 border-b border-gray-200 text-lg">
                                {employee.phone}
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default ViewEmployee
