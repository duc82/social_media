"use client";

const handlingError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  } else {
    return "Something went wrong. Please try again.";
  }
};

export default handlingError;
