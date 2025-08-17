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
