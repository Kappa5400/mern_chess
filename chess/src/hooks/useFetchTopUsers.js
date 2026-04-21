import { useQuery } from "@tanstack/react-query";
import { getTopUsers } from "../api/api_user";

export function useFetchTopUsers() {
  const userQuery = useQuery({
    queryKey: ["users"],
    queryFn: getTopUsers,
  });

  const data = userQuery.data ?? [];

  console.log("User data from hook: ", data);

  return {
    topUsers: data,
    isLoading: userQuery.isLoading,
    isError: userQuery.isError,
    error: userQuery.error,
  };
}
