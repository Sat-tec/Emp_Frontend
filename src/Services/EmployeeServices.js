import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SAVE_EMPLOYEE = `${API_BASE_URL}/employees`;
const SEARCH_EMPLOYEES = `${API_BASE_URL}/employees/search`;
console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);


class EmployeeServices {
    saveEmployee(formData){
        return axios.post(SAVE_EMPLOYEE, formData);
    }

    GetEmployees(){
        return axios.get(SAVE_EMPLOYEE);
    }

    GetEmployeeById(id){
        return axios.get(SAVE_EMPLOYEE + "/"+id);
    }


    searchEmployeesByName(name) {
        return axios.get(SEARCH_EMPLOYEES, { params: { name } });
    }

    DeleteEmployeeById(id){
        return axios.delete(SAVE_EMPLOYEE + "/"+id);
    }

    UpdateEmployeeById(formData, id){
        return axios.put(SAVE_EMPLOYEE + "/"+id, formData);
    }
}

export default new EmployeeServices();