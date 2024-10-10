import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const useTransactionQuery = () => {
  return useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const { data: response } = await axios("/api/transactions");
      return response;
    },
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    retry: 3
  });
};

export default useTransactionQuery;
