import { raiseUserScore } from "../api/api_user";
import { useAuth } from "../contexts/AuthContext.jsx";
import { jwtDecode } from "jwt-decode";

export function useRaiseScore() {
  const [token] = useAuth();

  const raiseScore = () => {
    if (!token) return;
    const { sub } = jwtDecode(token);
    raiseUserScore(sub);
  };
  return raiseScore;
}
