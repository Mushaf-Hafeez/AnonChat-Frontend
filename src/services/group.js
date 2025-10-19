import { api } from ".";

export const getGroupData = async (groupId) => {
  try {
    const response = await api.get(`/group/details/${groupId}`);

    return response.data;
  } catch (error) {
    console.log(
      "Error in the get group data axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

export const createGroup = async (data) => {
  try {
    const response = await api.post("/group/create", data);

    return response.data;
  } catch (error) {
    console.log(
      "Error in the create group axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// deleteGroup function
export const deleteGroup = async (groupId) => {
  try {
    const response = await api.delete(`group/delete/${groupId}`);
    return response.data;
  } catch (error) {
    console.log(
      "Error in the delete group axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// leaveGroup function
export const leaveGroup = async (groupId) => {
  try {
    const response = await api.delete(`/group/leave/${groupId}`);
    return response.data;
  } catch (error) {
    console.log(
      "Error in the leave group axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// addMember function
export const addMember = async (groupId, userId) => {
  try {
    const response = await api.put(`/group/add/${groupId}/${userId}`);
    return response.data;
  } catch (error) {
    console.log(
      "Error in the add member axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// removeMember function
export const removeMember = async (groupId, userId) => {
  try {
    const response = await api.delete(
      `/group/remove/${groupId}?userId=${userId}`
    );

    return response.data;
  } catch (error) {
    console.log(
      "Error in the remove member axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// searchGroup function
export const searchGroup = async (groupName) => {
  try {
    const response = await api.get(`/group?groupName=${groupName}`);
    return response.data;
  } catch (error) {
    console.log(
      "Error in the search group axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// join group request function
export const joinGroup = async (groupId) => {
  try {
    const response = await api.post(`/group/join/${groupId}`);
    return response.data;
  } catch (error) {
    console.log(
      "Error in the join group axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// reject request function
export const rejectRequest = async (groupId, userId) => {
  try {
    const response = await api.put(`/group/reject/${groupId}/${userId}`);
    return response.data;
  } catch (error) {
    console.log(
      "Error in the reject request axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};
