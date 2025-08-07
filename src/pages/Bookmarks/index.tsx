import { BookmarkList } from "@/widgets/BookmarkList";

export const Bookmarks = () => {
  return (
    <>
      <section>
        <div className="py-[15px]">
          <h2 className="font-bold text-3xl text-[#2c2c2cde] text-center mb-2.5">
            Избранные
          </h2>
          <BookmarkList />
        </div>
      </section>
    </>
  );
};
