import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { FaEye, FaPhoneAlt, FaShareSquare, FaTelegram } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { ContactModal } from "@/shared/ui/Modal/ContactModal";
import { fetchCargo } from "@/widgets/Cargo/model/oneCargoSlice";

export const CargoDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { cargo, isLoading, error } = useSelector(
    (state: RootState) => state.cargo
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    dispatch(fetchCargo(Number(id)));
  }, [dispatch, isModalOpen]);

  return (
    <section className="py-[15px]">
      <div className="flex items-center justify-between pb-10">
        <button
          onClick={() => window.history.back()}
          className="w-10 h-10 rounded-full bg-[#041e90] font-bold text-4xl text-white"
        >
          <IoIosArrowBack />
        </button>
        <h2 className="font-medium text-3xl">Подробнее</h2>
        <div></div>
      </div>
      <div className="py-[30px] border-y-2 border-y-gray-400">
        {isLoading ? (
          <div className="text-center">Загрузка...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <>
            <div className="p-3 border border-gray-400 font-medium text-gray-500">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl">СРОЧНО</h3>
                <button>II</button>
              </div>
              <p className="text-lg">{cargo?.info}</p>
            </div>

            <div className="mt-[30px] flex items-center justify-center gap-6">
              <div className="flex gap-2 items-center font-medium">
                <FaEye fontSize={24} color="gray" />
                <span>{cargo?.viewed}</span>
              </div>
              <div className="flex gap-2 items-center font-medium">
                <FaTelegram fontSize={24} color="gray" />
                <span>{cargo?.chatted_telegram}</span>
              </div>
              <div className="flex gap-2 items-center font-medium">
                <FaPhoneAlt fontSize={24} color="gray" />
                <span>{cargo?.phoned}</span>
              </div>
              <div className="flex gap-2 items-center font-medium">
                <FaShareSquare fontSize={24} color="gray" />
                <span>{cargo?.shared}</span>
              </div>
            </div>
          </>
        )}
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="block w-3/4 sm:w-3/5 mx-auto p-4 bg-[#041e90] rounded-xl font-semibold text-sm sm:text-xl text-white mt-8"
      >
        Показать контакты
      </button>
      <ContactModal modal={isModalOpen} close={closeModal} cargo={cargo} />
    </section>
  );
};
