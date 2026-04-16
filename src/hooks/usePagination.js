import { useState, useMemo } from 'react';

export function usePagination(data, itemsPerPage = 12) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = useMemo(() => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }, [data, currentPage, itemsPerPage]);

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const jumpToPage = (page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  return { currentData, currentPage, totalPages, nextPage, prevPage, jumpToPage };
}