import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HighScoresRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = "/high-scores";
  }, []);

  return null;
}

export default HighScoresRedirect;