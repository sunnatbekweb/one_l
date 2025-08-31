import { useGetBookmarksQuery } from "@/features/bookmark/bookmarkApi";
import { useAppTrasnlation } from "@/shared/lib/useAppTrasnlation";
import { CargoCard } from "@/entities/CargoCard";
import { BookmarkEmpty } from "@/entities/BookmarkEmpty";

export const BookmarkList = () => {
  const { data, isLoading, error } = useGetBookmarksQuery();
  const { t } = useAppTrasnlation();

  return (
    <div className="mt-7">
      {isLoading ? (
        <div className="text-center">{t("loading")}</div>
      ) : error ? (
        <div className="text-red-500 text-center">{JSON.stringify(error)}</div>
      ) : (
        <div className="grid grid-cols-1">
          {(data?.length ?? 0) > 0 ? (
            <div>
              {data?.map((bookmark) => (
                <CargoCard key={bookmark.id} cargo={bookmark?.cargo} />
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
