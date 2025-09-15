import { api } from ".";

// get messages function
export const getMessages = async (id) => {
  try {
    const response = await api.get(`/message/messages/${id}`);
    return response.data;
  } catch (error) {
    console.log(
      "Error in the get messages axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// send message function
export const sendMessage = async (id, data) => {
  try {
    const response = await api.post(`/message/send/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(
      "Error in the get messages axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};
