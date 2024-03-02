import React from "react";

const ErrorPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Oops! Something went wrong.</h1>
      <p style={styles.message}>
        We're sorry, but it seems like there was an error. Please try again
        later.
      </p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "20%",
  },
  heading: {
    fontSize: "2em",
    marginBottom: "20px",
  },
  message: {
    fontSize: "1.2em",
  },
};

export default ErrorPage;
