import { useQuery } from "@tanstack/react-query";
import { getTopUsers } from "../api/api_user";
import { logger } from "../../backend/src/utils/logger";

export function useFetchTopUsers() {
  const userQuery = useQuery({
    queryKey: ["users"],
    queryFn: getTopUsers,
  });

  const data = userQuery.data ?? [];

  logger.log("User data from hook: ", data);

  return {
    topUsers: data,
    isLoading: userQuery.isLoading,
    isError: userQuery.isError,
    error: userQuery.error,
  };
}
