import { api } from ".";

// get all sections function
export const getSections = async (data) => {
  try {
    const response = await api.get("/section/sections", {
      params: data,
    });

    return response.data;
  } catch (error) {
    console.log(
      "Error in the get sections axios function is: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// add section function
export const addSection = async (data) => {
  try {
    const response = await api.post("/section/create", data);

    return response.data;
  } catch (error) {
    console.log(
      "Error in the add section axios function is: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// delete section function
export const deleteSection = async (data) => {
  try {
    const response = await api.delete("/section/delete", { data });

    return response.data;
  } catch (error) {
    console.log(
      "Error in the delete section axios function is: ",
      error.response.data.message
    );
    return error.response.data;
  }
};
