import axios from "axios";

const SAVE_EMPLOYEE = "http://localhost:9090/employees";

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

    DeleteEmployeeById(id){
        return axios.delete(SAVE_EMPLOYEE + "/"+id);
    }

    UpdateEmployeeById(formData, id){
        return axios.put(SAVE_EMPLOYEE + "/"+id, formData);
    }
}

export default new EmployeeServices();