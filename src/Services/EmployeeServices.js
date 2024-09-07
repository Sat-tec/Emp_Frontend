import axios from "axios";

const SAVE_EMPLOYEE = "http://localhost:9090/employees";
const SEARCH_EMPLOYEES = "http://localhost:9090/employees/search";


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