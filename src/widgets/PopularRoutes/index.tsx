import { PopularCard } from "@/entities/PopularCard";
import { Pagination } from "@/shared/ui/pagination";
import { FaFilter } from "react-icons/fa";
import { FaRotate, FaSliders } from "react-icons/fa6";

export const PopularRoutes = () => {
  return (
    <section className="my-[15px] mx-auto">
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
                className="px-2.5 py-1.5 cursor-pointer border-2 border-[#ccc] rounded-md"
              >
                <option value="0">Времени создания</option>
                <option value="1">Дате загрузки</option>
                <option value="2">Стоимости</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <PopularCard />
          <Pagination />
        </div>
      </div>
    </section>
  );
};
