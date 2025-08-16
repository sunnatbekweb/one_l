import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { CargoCard } from "@/entities/CargoCard";
import { Pagination } from "@/shared/ui/Pagination";
import { FaFilter } from "react-icons/fa";
import { FaRotate, FaSliders } from "react-icons/fa6";
import { fetchCargos } from "./model/cargoSlice";
import { useTranslation } from "react-i18next";
import { SearchFilter } from "@/shared/ui/Modal/SearchFilterModal";
import { SearchSettings } from "@/shared/ui/Modal/SearchSettings";
import { RouteCard } from "@/entities/RouteCard";
import { baseUrl } from "@/shared/lib/updatedBackendUrl";
import axios from "axios";

export interface RouteData {
  origin: string;
  destination: string;
  total: number;
}

const PAGE_SIZE = 10;

export const Cargo = () => {
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
  const [filterModal, setFilterModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [routes, setRoutes] = useState<RouteData[]>([]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    dispatch(fetchCargos({ ...filters, page: selected + 1 }));
  };

  const handleUpdate = () => {
    dispatch(fetchCargos({ ...filters, page: currentPage + 1 }));
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
    dispatch(fetchCargos({ ...filters, page: currentPage + 1 }));
  }, [currentPage, filters, dispatch]);

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
          sessionStorage.getItem("viewMode") === "search" && ( // 👈 исправлено viewModa → viewMode
            <div className="my-5">
              <p
                dangerouslySetInnerHTML={{
                  __html: t("found_cargos", { count: cargos?.count }),
                }}
              />
              <div>
                <div className="flex items-center justify-between ">
                  <button
                    onClick={handleUpdate}
                    disabled={isloading}
                    className="flex items-center gap-x-1 px-4 py-1.5 bg-[#7c8fe7] text-white rounded-md font-medium"
                  >
                    <FaRotate />
                    <span>{t("search_head.update")}</span>
                  </button>
                  <div className="flex items-center">
                    {/* Filter modal */}
                    <button
                      onClick={() => setFilterModal(true)}
                      className="flex flex-col gap-y-1.5 items-center p-2.5"
                    >
                      <FaFilter fontSize={20} />
                      <span className="font-medium text-sm">
                        {t("search_head.filters")}
                      </span>
                    </button>
                    <SearchFilter
                      modal={filterModal}
                      close={() => setFilterModal(false)}
                    />

                    {/* Settings modal */}
                    <button
                      onClick={() => setSettingsModal(true)}
                      className="flex flex-col gap-y-1.5 items-center p-2.5"
                    >
                      <FaSliders fontSize={20} />
                      <span className="font-medium text-sm">
                        {t("search_head.settings")}
                      </span>
                    </button>
                    <SearchSettings
                      modal={settingsModal}
                      close={() => setSettingsModal(false)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>{t("sort.title")}</div>

                  <select
                    name="sort_by"
                    id="sort_by"
                    className="px-2.5 py-1.5 cursor-pointer bg-white border-2 border-[#ccc] rounded-md"
                  >
                    <option value="0">{t("sort.createdAt")}</option>
                    <option value="1">{t("sort.loadDate")}</option>
                    <option value="2">{t("sort.price")}</option>
                    <option value="3">{t("sort.rating")}</option>
                  </select>
                </div>
              </div>
            </div>
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
                      pageCount={Math.ceil(cargos.count / PAGE_SIZE)} // 👈 исправлено
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
