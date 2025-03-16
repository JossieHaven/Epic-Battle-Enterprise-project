import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine error type based on URL state or pathname
  const errorType = location.state?.errorType || "404";

  let errorMessage;
  switch (errorType) {
    case "401":
      errorMessage = "Unauthorized access. Please log in.";
      break;
    case "500":
      errorMessage = "Oops! Something went wrong on our end.";
      break;
    default:
      errorMessage = "Page not found. The page you are looking for does not exist.";
  }

  // Auto-redirect to home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main style={styles.container}>
      <h1 style={styles.header}>Error {errorType}</h1>
      <p style={styles.message}>{errorMessage}</p>
      <button onClick={() => navigate("/")} style={styles.button}>
        Go Home
      </button>
    </main>
  );
};

// Basic styling for the error page
const styles = {
  container: {
    textAlign: "center" as const,
    padding: "50px",
  },
  header: {
    fontSize: "2rem",
    color: "#ff4d4d",
  },
  message: {
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Error;
