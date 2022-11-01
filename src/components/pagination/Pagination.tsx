import React, { FC } from "react";
import { usePagination, DOTS } from "./usePagination";
import styles from "./pagination.module.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

type PaginationProps = {
  onPageChange: (num: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
  className: string;
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  pageSize,
  totalCount,
  siblingCount,
  className,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange?.length! < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage !== lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };
  // @ts-ignore
  let lastPage = paginationRange[paginationRange?.length! - 1];
  return (
    <div className={styles.pagination}>
      <KeyboardArrowLeftIcon
        onClick={onPrevious}
        className={styles.arrow}
        style={{ cursor: currentPage === 1 ? "unset" : "pointer" }}
      />
      {paginationRange?.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <div key={pageNumber}>&#8230;</div>;
        }
        return (
          <div
            style={{
              borderBottom:
                currentPage === pageNumber ? "1px solid #5876C5" : "unset",
            }}
            key={pageNumber}
            className={`${styles.paginationNumber} ${
              currentPage === pageNumber && styles.current
            }`}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </div>
        );
      })}
      <KeyboardArrowRightIcon
        onClick={onNext}
        className={styles.arrow}
        style={{ cursor: currentPage === lastPage ? "unset" : "pointer" }}
      />
    </div>
  );
};

export default Pagination;
