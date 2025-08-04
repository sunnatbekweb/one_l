// import { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./style.module.css";

const items = Array.from({ length: 20 }).map((_, i) => `Элемент ${i + 1}`);
const itemsPerPage = 10;

export const Pagination = () => {
//   const [currentPage, setCurrentPage] = useState(0);

//   const offset = currentPage * itemsPerPage;
//   const currentItems = items.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(items.length / itemsPerPage);

//   const handlePageClick = ({ selected }: { selected: number }) => {
//     setCurrentPage(selected);
//   };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* <ul className="mb-4">
        {currentItems.map((item, index) => (
          <li key={index} className="border p-2">
            {item}
          </li>
        ))}
      </ul> */}

      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
      //   onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
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
