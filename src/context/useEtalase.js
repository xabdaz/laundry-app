// hooks/useEtalase.js
"use client";

import useSWR from "swr";
import { getEtalase } from "@/services/pos";

const fetcher = async () => {
  const response = await getEtalase();
  return response.data || [];
};

export function useEtalase() {
  const { data, error, isLoading } = useSWR('etalase', fetcher, {
    revalidateOnFocus: false, // biar tidak refetch kalau ganti tab
  });

  return {
    data,
    error,
    isLoading,
  };
}
