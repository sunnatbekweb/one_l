import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchBookmarks } from "./model/getBookmarkSlice";
import { CargoCard } from "@/entities/CargoCard";
import { BookmarkEmpty } from "@/entities/BookmarkEmpty";
import { useAppTrasnlation } from "@/shared/lib/useAppTrasnlation";

export const BookmarkList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bookmarks, isloading, error } = useSelector(
    (state: RootState) => state.bookmarks
  );
  const { t } = useAppTrasnlation();

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  return (
    <div className="mt-7">
      {isloading ? (
        <div className="text-center">{t("loading")}</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1">
          {bookmarks?.length > 0 ? (
            <div>
              {bookmarks.map((bookmark) => (
                <CargoCard key={bookmark.id} cargo={bookmark.cargo} />
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
