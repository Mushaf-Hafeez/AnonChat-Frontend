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
