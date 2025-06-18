import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HighScoresRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = "http://localhost:5080/high-scores"; // or deployed backend URL
  }, []);

  return null;
}

export default HighScoresRedirect;