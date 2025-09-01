import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { SearchSettings } from "@/entities/SearchSettings";
import { useLazyGetCargosQuery } from "@/features/cargo/cargoApi";
import { CargoCard } from "@/entities/CargoCard";
import { Pagination } from "@/shared/ui/Pagination";
import { RouteCard } from "@/entities/RouteCard";
import { useAppTrasnlation } from "@/shared/lib/useAppTrasnlation";
import { useGetTopRoutesQuery } from "@/features/routes/routesApi";

export const CargoWrapper = () => {
  const { t } = useAppTrasnlation();
  const filters = useSelector((state: RootState) => state.filters);
  const [currentPage, setCurrentPage] = useState(0);
  const [trigger, { data, isLoading, error }] = useLazyGetCargosQuery();
  const {
    data: topRoutes,
    isLoading: topRoutesLoading,
    error: topRoutesError,
  } = useGetTopRoutesQuery();

  const isFilterActive = Object.values({
    from_country: filters.from_country,
    to_country: filters.to_country,
    origin: filters.origin,
    destination: filters.destination,
    type: filters.car_type,
  }).some(Boolean);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [filters]);

  useEffect(() => {
    trigger({
      ...filters,
      page: currentPage + 1,
    });
  }, [filters, currentPage, trigger]);

  return (
    <section className="py-[15px] mx-auto" id="pagination_top">
      <div>
        {sessionStorage.getItem("viewMode") === "popular" ? (
          <h2 className="max-w-[300px] mx-auto font-semibold text-2xl text-[#595959] text-center">
            {t("popular_directions")}
          </h2>
        ) : (
          isFilterActive &&
          sessionStorage.getItem("viewMode") === "search" && (
            <SearchSettings
              resultCount={data?.count}
              currentPage={currentPage}
              isloading={isLoading}
            />
          )
        )}
        <div>
          {isLoading ? (
            <div className="text-center">{t("loading")}</div>
          ) : error ? (
            <div className="text-red-500 text-center">
              {JSON.stringify(error)}
            </div>
          ) : (
            <div className="grid grid-cols-1">
              {sessionStorage.getItem("viewMode") === "search" ? (
                (data?.results?.length ?? 0) > 0 ? (
                  <div>
                    {data?.results?.map((cargo) => (
                      <CargoCard key={cargo.id} cargo={cargo} />
                    ))}
                    <Pagination
                      pageCount={Math.ceil((data?.count || 0) / 5)}
                      onPageChange={handlePageChange}
                      forcePage={currentPage}
                    />
                  </div>
                ) : (
                  <div className="col-span-full text-center">
                    {t("noCargo")}
                  </div>
                )
              ) : topRoutesLoading ? (
                <div className="text-center">{t("loading")}</div>
              ) : topRoutesError ? (
                <div className="text-red-500 text-center">
                  {JSON.stringify(topRoutesError)}
                </div>
              ) : (topRoutes?.length ?? 0) > 0 ? (
                topRoutes?.map((route, index) => (
                  <RouteCard
                    key={index}
                    origin={route.origin}
                    destination={route.destination}
                    total={route.total}
                  />
                ))
              ) : (
                <div className="col-span-full text-center">{t("noCargo")}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
