import { api } from "./index";

// login function
export const login = async (loginData) => {
  try {
    const response = await api.post("/auth/login", loginData);

    return response.data;
  } catch (error) {
    console.log(
      "Error the login axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// signup function
export const signup = async (signupData) => {
  try {
    const response = await api.post("/auth/signup", signupData);

    return response.data;
  } catch (error) {
    console.log(
      "Error the signup axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// send-otp function
export const sendOTP = async (email) => {
  try {
    const response = await api.post("/auth/send-otp", { email });
    return response.data;
  } catch (error) {
    console.log(
      "Error in the send OTP axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};

// forgotPassword function
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });

    return response.data;
  } catch (error) {
    console.log(
      "Error in the forgot password axios function: ",
      error.response
    );
    return error.response.data;
  }
};

// resetPassword function
export const resetPassword = async (
  resetPasswordToken,
  password,
  confirmPassword
) => {
  try {
    const response = await api.put(
      `/auth/reset-password/${resetPasswordToken}`,
      { password, confirmPassword }
    );

    return response.data;
  } catch (error) {
    console.log(
      "Error in the reset password axios function: ",
      error.response.data.message
    );
    return error.response.data;
  }
};
