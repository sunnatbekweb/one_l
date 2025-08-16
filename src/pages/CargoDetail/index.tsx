import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchCargo } from "@/widgets/Cargo/model/oneCargoSlice";
import axios from "axios";
import { baseUrl } from "@/shared/lib/updatedBackendUrl";
import Cookies from "js-cookie";
import { formatCustomDate } from "@/shared/lib/formatDate";
import { ContactModal } from "@/shared/ui/Modal/ContactModal";
import { FaEye, FaPhoneAlt, FaShareSquare, FaTelegram } from "react-icons/fa";
import { IoIosArrowBack, IoMdResize } from "react-icons/io";
import { SubscribeModal } from "@/shared/ui/Modal/SubscribeModal";

export const CargoDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [showInfo, setShowInfo] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState();
  const { cargo, isLoading, error } = useSelector(
    (state: RootState) => state.cargo
  );
  const formattedDate = formatCustomDate(cargo?.date || "");

  const [subscribeModal, setSubscribeModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSubscribe = async () => {
    const response = await axios.get(
      `${baseUrl}/user/finder/${Cookies.get("user_id")}/`
    );

    setIsSubscribed(response.data.success);
  };

  useEffect(() => {
    if (!isModalOpen) {
      dispatch(fetchCargo(Number(id)));
    }
  }, [isModalOpen, dispatch, id]);

  useEffect(() => {
    getSubscribe();
  }, []);

  return (
    <section className="py-[15px]">
      <div className="relative flex items-center justify-between pb-10">
        <button
          onClick={() => window.history.back()}
          className="w-8 h-8 rounded-full bg-[#041e90] font-bold text-2xl text-white grid place-content-center"
        >
          <IoIosArrowBack />
        </button>
        <h2 className="font-medium text-3xl absolute left-1/2 -translate-x-1/2">
          {t("detail")}
        </h2>
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
              <div className={`text-lg ${!showInfo && "line-clamp-1"}`}>
                <p>{cargo?.info}</p>
                <p>
                  {[
                    cargo?.origin,
                    cargo?.destination,
                    cargo?.type,
                    cargo?.weight
                      ? `${cargo.weight > 1000 ? cargo.weight / 1000 : cargo.weight} т`
                      : null,
                    cargo?.car_type,
                    cargo?.volume
                      ? `${cargo.volume > 1000 ? cargo.volume / 1000 : cargo.volume} м³`
                      : null,
                    formattedDate || null,
                    typeof cargo?.price === "number"
                      ? `${cargo.price.toLocaleString()} ${
                          cargo.price >= 1 && cargo.price < 1000
                            ? "UZS"
                            : cargo.price >= 1000 && cargo.price <= 100_000
                              ? "USD"
                              : cargo.price > 100_000 && cargo.price <= 999_999
                                ? "RUB"
                                : cargo.price > 1_000_000
                                  ? "UZS"
                                  : ""
                        }`
                      : t("fraxt"),
                    cargo?.temperature ? `${cargo.temperature}°C` : null,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                </p>
              </div>
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
        onClick={() =>
          isSubscribed ? setIsModalOpen(true) : setSubscribeModal(true)
        }
        className="block w-3/4 sm:w-3/5 mx-auto p-4 bg-[#041e90] rounded-xl font-semibold text-lg sm:text-xl text-white mt-8"
      >
        {t("showContacts")}
      </button>
      <ContactModal
        modal={isModalOpen}
        close={() => setIsModalOpen(false)}
        cargo={cargo}
      />
      <SubscribeModal
        modal={subscribeModal}
        close={() => setSubscribeModal(false)}
      />
    </section>
  );
};
