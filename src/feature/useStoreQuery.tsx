import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const useStoreQuery = () => {
  return useQuery({
    queryKey: ["store"],
    queryFn: async () => {
      const { data: response } = await axios("/api/store");
      return response;
    },
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    retry: 3
  });
};

export default useStoreQuery;
