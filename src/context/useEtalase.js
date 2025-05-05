"use client";

import useSWR from "swr";
import { getEtalase, getListTransaction } from "@/services/pos";

// Fetcher untuk etalase (static)
const fetchEtalase = async () => {
  const response = await getEtalase();
  return response.data || [];
};

export function useEtalase() {
  const { data, error, isLoading } = useSWR("etalase", fetchEtalase, {
    revalidateOnFocus: false,
  });

  return {
    data,
    error,
    isLoading,
  };
}

// Fetcher untuk transaksi dengan parameter page
const fetchTransaction = async (page) => {
  const response = await getListTransaction({ page }); // asumsi param-nya object { page: number }
  return response.data || [];
};

export function useTransaction(page = 1) {
  const { data, error, isLoading } = useSWR(
    ["transaction", page],
    () => fetchTransaction(page),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
}
