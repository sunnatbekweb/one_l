import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchCargo } from "@/widgets/Cargo/model/oneCargoSlice";
// import { formatCustomDate } from "@/shared/lib/formatDate";
import { ContactModal } from "@/shared/ui/Modal/ContactModal";
import { useTranslation } from "react-i18next";
import { FaEye, FaPhoneAlt, FaShareSquare, FaTelegram } from "react-icons/fa";
import { IoIosArrowBack, IoMdResize } from "react-icons/io";
// import { HiOutlineArrowNarrowRight } from "react-icons/hi";

export const CargoDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [showInfo, setShowInfo] = useState(false);
  const { cargo, isLoading, error } = useSelector(
    (state: RootState) => state.cargo
  );
  // const formattedDate = formatCustomDate(cargo?.date || "");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!isModalOpen) {
      dispatch(fetchCargo(Number(id)));
    }
  }, [isModalOpen, dispatch, id]);

  return (
    <section className="py-[15px]">
      <div className="flex items-center justify-between pb-10">
        <button
          onClick={() => window.history.back()}
          className="w-10 h-10 rounded-full bg-[#041e90] font-bold text-4xl text-white"
        >
          <IoIosArrowBack />
        </button>
        <h2 className="font-medium text-3xl">{t("detail")}</h2>
        <div></div>
      </div>
      <div className="py-[30px] border-y-2 border-y-gray-400">
        {isLoading ? (
          <div className="text-center">{t("loading")}</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <>
            <div className="p-3 border bg-white border-gray-400 font-medium text-gray-500">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl">СРОЧНО</h3>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className={`rounded-sm p-1 border ${showInfo ? "border-[#6138f5] text-[#6138f5]" : "border-gray-400 text-gray-400"} duration-200`}
                >
                  <IoMdResize />
                </button>
              </div>
              <p className={`text-lg ${!showInfo && "line-clamp-1"}`}>{cargo?.info}</p>
              {/* <div className={`flex-col gap-4 ${showInfo ? "flex" : "hidden"}`}>
                <div className="flex items-center gap-x-3">
                  <strong className={"text-lg line-clamp-1"}>
                    {cargo?.origin}
                  </strong>
                  <HiOutlineArrowNarrowRight />
                  <strong className={"text-lg line-clamp-1"}>
                    {cargo?.destination}
                  </strong>
                  {cargo?.km && <div>{cargo?.km?.toLocaleString()} км</div>}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {cargo?.type && <p>{cargo?.type}</p>}
                  {cargo?.car_type && <p>{cargo?.car_type}</p>}
                  {cargo?.weight && (
                    <p>
                      {cargo?.weight && cargo?.weight > 1000
                        ? cargo.weight / 1000
                        : cargo?.weight}{" "}
                      т
                    </p>
                  )}
                  {cargo?.volume && (
                    <p>
                      {cargo?.volume && cargo?.volume > 1000
                        ? cargo.volume / 1000
                        : cargo?.volume}{" "}
                      м³
                    </p>
                  )}
                  {formattedDate && <p>{formattedDate}</p>}
                  {cargo?.price && <p>{cargo?.price}</p>}
                  {cargo?.temperature && <p>{cargo?.temperature}°C</p>}
                </div>
              </div> */}
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
        {t("showContacts")}
      </button>
      <ContactModal modal={isModalOpen} close={closeModal} cargo={cargo} />
    </section>
  );
};
