import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchBookmarks } from "./model/bookmarkSlice";
import { CargoCard } from "@/entities/CargoCard";
import { BookmarkEmpty } from "@/entities/BookmarkEmpty";


export const BookmarkList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cargos, isloading, error } = useSelector(
    (state: RootState) => state.bookmarks
  );

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  return (
    <div className="mt-7">
      {isloading ? (
        <div className="text-center">Загрузка...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1">
          {cargos?.results?.length > 0 ? (
            <div>
              {cargos?.results?.map((cargo) => (
                <CargoCard key={cargo.id} cargo={cargo} />
              ))}
            </div>
          ) : (
            <BookmarkEmpty />
          )}
        </div>
      )}
    </div>
  );
};
