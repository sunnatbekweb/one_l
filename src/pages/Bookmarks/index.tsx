import { CargoCard } from "@/entities/CargoCard";
// import { BookmarkEmpty } from "@/widgets/BookmarkEmpty";

export const Bookmarks = () => {
  return (
    <>
      <section>
        <div className="py-[15px]">
          <h2 className="font-bold text-3xl text-[#2c2c2cde] text-center mb-2.5">
            Избранные
          </h2>
          {/* <BookmarkEmpty/> */}
          <div className="mt-7">
            {[...Array(5)].map((_, index) => (
              <CargoCard index={index} key={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
