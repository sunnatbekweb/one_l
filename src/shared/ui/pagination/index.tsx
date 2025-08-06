import ReactPaginate from "react-paginate";
import styles from "./style.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  forcePage,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        onPageChange={onPageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={Math.ceil(pageCount / 5)}
        forcePage={forcePage}
        containerClassName={styles.pagination}
        pageClassName={styles.page}
        activeClassName={styles.active}
        previousClassName={styles.prev}
        nextClassName={styles.next}
        breakClassName={styles.break}
        disabledClassName={styles.disabled}
      />
    </div>
  );
};
