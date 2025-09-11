import { api } from ".";

export const getGroupData = async (id) => {
  try {
    const response = await api.get(`/group/details/${id}`);

    return response.data;
  } catch (error) {
    console.log(
      "Error in the get group data axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// leaveGroup function
export const leaveGroup = async (groupID) => {
  try {
    const response = await api.delete(`/group/leave/${groupID}`);
    return response.data;
  } catch (error) {
    console.log(
      "Error in the leave group axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};
