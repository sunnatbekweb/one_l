import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import {
  FaEye,
  FaPhoneAlt,
  FaRegCalendarAlt,
  FaShareSquare,
  FaTelegram,
  FaTruck,
  FaWeightHanging,
} from "react-icons/fa";
import { MdPriceCheck } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { ContactModal } from "@/shared/ui/Modal/ContactModal";
import { fetchCargo } from "@/widgets/Cargo/model/oneCargoSlice";
import { useTranslation } from "react-i18next";
import { useCountryFlag } from "@/entities/CargoCard/lib/useCountryFlag.ts";
import styles from "@/entities/CargoCard/style.module.css";
import { FaMaximize, FaTemperatureHalf } from "react-icons/fa6";
import { formatCustomDate } from "@/shared/lib/formatDate";

export const CargoDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { cargo, isLoading, error } = useSelector(
    (state: RootState) => state.cargo
  );
  const formattedDate = formatCustomDate(cargo?.date || "");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!isModalOpen) {
      dispatch(fetchCargo(Number(id)));
    }
  }, [isModalOpen, dispatch, id]);

  const { flag: originFlag } = useCountryFlag(cargo?.origin_country || "");
  const { flag: destinationFlag } = useCountryFlag(
    cargo?.destination_country || ""
  );

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
            <div className={`${styles["search-result__route"]} mb-10`}>
              <div className={styles["search-result__city"]}>
                {originFlag?.flags?.png && (
                  <img
                    className="w-5 sm:w-10 h-full object-cover"
                    src={originFlag.flags.png}
                    alt={originFlag.flags.alt}
                  />
                )}
                <strong className={"text-xs sm:text-base"}>
                  {cargo?.origin}
                </strong>
              </div>
              <div className={styles["search-result__distance"]}>
                <span>📍</span>
                <div className={styles["distance-center"]}>
                  <div className={styles["distance-center-line"]}></div>
                  <div>{cargo?.km?.toLocaleString()} км</div>
                </div>
                <span>📍</span>
              </div>
              <div className={styles["search-result__city"]}>
                {destinationFlag?.flags?.png && (
                  <img
                    className="w-5 sm:w-10 h-full object-cover"
                    src={destinationFlag.flags.png}
                    alt={destinationFlag.flags.alt}
                  />
                )}
                <strong className={"text-xs sm:text-base"}>
                  {cargo?.destination}
                </strong>
              </div>
            </div>
            <div
              className={"my-10 font-medium grid grid-cols-2 gap-x-4 gap-y-8"}
            >
              <p>📦 {cargo?.type}</p>
              <div className="flex items-center gap-x-3 text-sm sm:text-lg">
                <FaTruck className="text-xl sm:text-3xl text-green-500" />
                <span>{cargo?.car_type}</span>
              </div>
              <div className="flex items-center gap-x-3 text-sm sm:text-lg">
                <FaWeightHanging className="text-xl sm:text-3xl text-gray-600" />
                <span>{cargo?.weight} т</span>
              </div>
              <div className="flex items-center gap-x-3 text-sm sm:text-lg">
                <FaMaximize className="text-xl sm:text-3xl text-gray-600" />
                <span>{cargo?.volume} м³</span>
              </div>
              <div className="flex items-center gap-x-3 text-sm sm:text-lg">
                <FaRegCalendarAlt className="text-xl sm:text-3xl text-gray-600" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-x-3 text-sm sm:text-lg">
                <MdPriceCheck className="text-xl sm:text-3xl text-gray-600" />
                <span>{cargo?.price} USD</span>
              </div>
              {cargo?.temperature && (
                <div className="flex items-center gap-x-3 text-sm sm:text-lg">
                  <FaTemperatureHalf className="text-xl sm:text-3xl text-[#c6dcff]" />
                  <span>{cargo?.temperature}°C</span>
                </div>
              )}
            </div>
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
        {t("showContacts")}
      </button>
      <ContactModal modal={isModalOpen} close={closeModal} cargo={cargo} />
    </section>
  );
};
