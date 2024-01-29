import { useCallback, useState } from "react";

export const usePagination = (startIndex, limit) => {
  const [currentPage, setCurrentPage] = useState(startIndex);

  const next = useCallback(() => {
    setCurrentPage((c) => c + 1);
  }, []);

  const prev = useCallback(() => {
    setCurrentPage((a) => a - 1);
  }, []);

  return {
    currentPage,
    next,
    prev,
  };
};

export const useApiStates = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return {
    error,
    loading,
    setLoading,
    setError,
  };
};

export const useAcoordian = (initialSection?: number) => {
  const [activeSections, setActiveSections] = useState([initialSection || 0]);

  return {
    activeSections,
    onChange: setActiveSections,
  };
};

export * from "./styles";
