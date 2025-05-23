import { useEffect, useState } from 'react';
import { Button } from '../button/button';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsSmallScreen(window.innerWidth < 640);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 4 || !isSmallScreen) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-2">
      <Button icon="chevron-left" disabled={currentPage === 1}></Button>

      {getPages().map((page, index) => (
        <Button
          key={index}
          variant="primary"
          disabled={page === currentPage}
          onClick={() => {
            if (page === '...') {
              return onPageChange(currentPage + 1);
            }
            onPageChange(Number(page));
          }}
        >
          {page}
        </Button>
      ))}

      <Button
        icon="chevron-right"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};
