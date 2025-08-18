import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchCargos } from "./model/cargoSlice";
import { useTranslation } from "react-i18next";
import { SearchSettings } from "@/entities/SearchSettings";
import { CargoCard } from "@/entities/CargoCard";
import { Pagination } from "@/shared/ui/Pagination";
import { RouteCard } from "@/entities/RouteCard";
import { baseUrl } from "@/shared/lib/updatedBackendUrl";
import axios from "axios";

export interface RouteData {
  origin: string;
  destination: string;
  total: number;
}

const PAGE_SIZE = 5;

export const CargoWrapper = () => {
  const filters = useSelector((state: RootState) => state.filters);
  const { cargos, isloading, error } = useSelector(
    (state: RootState) => state.cargos
  );

  const isFilterActive = Object.values({
    from_country: filters.from_country,
    to_country: filters.to_country,
    origin: filters.origin,
    destination: filters.destination,
    type: filters.car_type,
  }).some(Boolean);

  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(0);
  const [routes, setRoutes] = useState<RouteData[]>([]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    dispatch(fetchCargos({ ...filters, page: selected + 1 }));
  };

  const getRoutes = async () => {
    try {
      const response = await axios.get(`${baseUrl}/top-cargos/`);
      setRoutes(response.data);
    } catch (e) {
      console.error("Ошибка при получении популярных направлений:", e);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [filters]);

  useEffect(() => {
    const totalPages = Math.ceil(cargos.count / PAGE_SIZE);

    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(0);
      return;
    }

    dispatch(fetchCargos({ ...filters, page: currentPage + 1 }));
  }, [currentPage, filters, dispatch, cargos.count]);

  useEffect(() => {
    getRoutes();
  }, []);

  return (
    <section className="py-[15px] mx-auto" id={"pagination_top"}>
      <div>
        {sessionStorage.getItem("viewMode") === "popular" ? (
          <h2 className="max-w-[300px] mx-auto font-semibold text-2xl text-[#595959] text-center">
            {t("popular_directions")}
          </h2>
        ) : (
          isFilterActive &&
          sessionStorage.getItem("viewMode") === "search" && (
            <SearchSettings
              resultCount={cargos?.count}
              currentPage={currentPage}
              isloading={isloading}
            />
          )
        )}
        <div>
          {isloading ? (
            <div className="text-center">{t("loading")}</div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <div className="grid grid-cols-1">
              {sessionStorage.getItem("viewMode") === "search" ? (
                cargos.results.length > 0 ? (
                  <div>
                    {cargos?.results.map((cargo) => (
                      <CargoCard key={cargo.id} cargo={cargo} />
                    ))}
                    <Pagination
                      pageCount={Math.ceil(cargos.count / PAGE_SIZE)}
                      onPageChange={handlePageChange}
                      forcePage={currentPage}
                    />
                  </div>
                ) : (
                  <div className="col-span-full text-center">
                    {t("noCargo")}
                  </div>
                )
              ) : (
                routes?.map((route, index) => (
                  <RouteCard
                    key={index}
                    origin={route.origin}
                    destination={route.destination}
                    total={route.total}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
