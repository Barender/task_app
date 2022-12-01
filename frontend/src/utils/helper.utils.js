// format, generate and throw error
export const formatThrowError = (message) => {
  let error = new Error(message);
  error.response = message;
  throw error;
};
