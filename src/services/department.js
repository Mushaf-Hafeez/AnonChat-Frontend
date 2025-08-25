import { api } from ".";

// get all departments function
export const getDepartments = async () => {
  try {
    const response = await api.get("/department/departments");

    return response.data;
  } catch (error) {
    console.log(
      "Error in the get all departments axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// add department function
export const addDepartment = async (data) => {
  try {
    const response = await api.post("/department/create", data);

    return response.data;
  } catch (error) {
    console.log(
      "Error in the add department axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// delete department function
export const deleteDepartment = async (id) => {
  try {
    const response = await api.delete(`/department/remove/${id}`);

    return response.data;
  } catch (error) {
    console.log(
      "Error in the delete department axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};
