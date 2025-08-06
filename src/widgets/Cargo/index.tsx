import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { CargoCard } from "@/entities/CargoCard";
import { Pagination } from "@/shared/ui/pagination";
import { FaFilter } from "react-icons/fa";
import { FaRotate, FaSliders } from "react-icons/fa6";
import { fetchCargos } from "./model/cargoSlice";

export const Cargo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cargos, isloading, error } = useSelector(
    (state: RootState) => state.cargos
  );
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    dispatch(fetchCargos(selected + 1));
  };

  useEffect(() => {
    dispatch(fetchCargos(currentPage + 1));
  }, [currentPage, dispatch]);

  return (
    <section className="py-[15px] mx-auto">
      <div>
        <h2 className="max-w-[300px] mx-auto font-semibold text-2xl text-[#595959] text-center">
          Самые популярные направления
        </h2>
        <div className="my-5">
          <p>
            Найдено <strong>0</strong> Грузов по вашему запросу:
          </p>
          <div>
            <div className="flex items-center justify-between ">
              <button className="flex items-center gap-x-1 px-4 py-1.5 bg-[#7c8fe7] text-white rounded-md font-medium">
                <FaRotate />
                <span>Обновить</span>
              </button>
              <div className="flex items-center">
                <button className="flex flex-col gap-y-1.5 items-center p-2.5">
                  <FaFilter fontSize={20} />
                  <span className="font-medium text-sm">Фильтры</span>
                </button>
                <button className="flex flex-col gap-y-1.5 items-center p-2.5">
                  <FaSliders fontSize={20} />
                  <span className="font-medium text-sm">Параметры</span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>Упорядочить по</div>

              <select
                name="sort_by"
                id="sort_by"
                className="px-2.5 py-1.5 cursor-pointer bg-white border-2 border-[#ccc] rounded-md"
              >
                <option value="0">Времени создания</option>
                <option value="1">Дате загрузки</option>
                <option value="2">Стоимости</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          {isloading ? (
            <div className="text-center">Загрузка...</div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <div className="grid grid-cols-1">
              {cargos.results.length > 0 ? (
                <div>
                  {cargos.results.map((cargo) => (
                    <CargoCard key={cargo.id} cargo={cargo}/>
                  ))}
                  <Pagination
                    pageCount={cargos.count}
                    onPageChange={handlePageChange}
                    forcePage={currentPage}
                  />
                </div>
              ) : (
                <div className="col-span-full text-center">
                  Нет грузов для отображения
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
