import { Button, HStack } from '@chakra-ui/react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

import { usePagination, DOTS } from '../../hooks/usePagination';

export default function Pagination(props) {
  const { currentPage, onPageChange, pageSize, siblingCount = 1, totalCount } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <HStack justify='center' marginTop='6'>
      <Button disabled={currentPage === 1} onClick={onPrevious}>
        <IoChevronBackOutline />
      </Button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <Button key={index} disabled>
              ...
            </Button>
          );
        }

        return (
          <Button
            key={index}
            colorScheme={currentPage === pageNumber ? 'brand.green' : 'gray'}
            onClick={() => {
              onPageChange(pageNumber);
            }}
          >
            {pageNumber}
          </Button>
        );
      })}
      <Button disabled={currentPage === lastPage} onClick={onNext}>
        <IoChevronForwardOutline />
      </Button>
    </HStack>
  );
}
