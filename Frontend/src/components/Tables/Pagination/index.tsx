import { PaginationContainer, PaginationLink } from "./styles";

const Pagination = ({ currentPage, totalPages, onPageChange, maxPagesToShow = 5 }) => {
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  const paginationLinks = [];

  for (let i = startPage; i <= endPage; i++) {
    paginationLinks.push(
      <PaginationLink
        key={i}
        onClick={() => onPageChange(i)}
        active={currentPage === i}
      >
        {i}
      </PaginationLink>
    );
  }

  return <PaginationContainer>{paginationLinks}</PaginationContainer>;
};

export default Pagination;