import { api } from ".";

// add admin axios function
export const addAdmin = async (data) => {
  try {
    const response = await api.post("/admin/add", data);

    return response.data;
  } catch (error) {
    console.log(
      "Error in the add admin axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// get admins axios function
export const getAdmins = async () => {
  try {
    const response = await api.get("/admin/admins");

    return response.data;
  } catch (error) {
    console.log(
      "Error in the get admins axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// delete admin axios function
export const deleteAdmin = async (id) => {
  try {
    const response = await api.delete(`/admin/remove/${id}`);

    return response.data;
  } catch (error) {
    console.log(
      "Error in the delete admin axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};
