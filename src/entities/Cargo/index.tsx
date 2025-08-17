import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchCargo } from "@/widgets/Cargo/model/oneCargoSlice";
import { useTranslation } from "react-i18next";
import { formatCustomDate } from "@/shared/lib/formatDate";
import { useCurrency } from "../CargoCard/lib/useCurrency";
import { ContactModal } from "@/shared/ui/Modal/ContactModal";
import {
  FaEye,
  FaPhoneAlt,
  FaShareSquare,
  FaTelegram,
  FaWhatsappSquare,
} from "react-icons/fa";
import { IoMdResize } from "react-icons/io";
import { Counts } from "./ui/Counts";

export const Cargo = ({
  id,
  isModalOpen,
  setIsModalOpen,
}: {
  id: string | undefined;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const [showInfo, setShowInfo] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { cargo, isLoading, error } = useSelector(
    (state: RootState) => state.cargo
  );

  const counts = [
    {
      icon: <FaEye fontSize={24} color="gray" />,
      count: cargo?.viewed,
    },
    {
      icon: <FaPhoneAlt fontSize={24} color="gray" />,
      count: cargo?.phoned,
    },
    {
      icon: <FaTelegram fontSize={24} color="gray" />,
      count: cargo?.chatted_telegram,
    },
    {
      icon: <FaWhatsappSquare fontSize={24} color="gray" />,
      count: cargo?.chatted_whatsup,
    },
    {
      icon: <FaShareSquare fontSize={24} color="gray" />,
      count: cargo?.shared,
    },
  ];

  useEffect(() => {
    if (!isModalOpen && id) {
      dispatch(fetchCargo(Number(id)));
    }
  }, [isModalOpen, dispatch, id]);

  return (
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
              <p className="whitespace-pre-line">
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

                  formatCustomDate(cargo?.date || "") || null,

                  typeof cargo?.price === "number"
                    ? `${cargo.price.toLocaleString()} ${useCurrency(cargo.price)}`
                    : t("fraxt"),

                  cargo?.temperature ? `${cargo.temperature}°C` : null,
                ]
                  .filter(Boolean)
                  .join("\n")}
              </p>
              {/* <p
                  dangerouslySetInnerHTML={{
                    __html:
                      cargo?.source_message?.replace(/\n/g, "<br />") || "",
                  }}
                /> */}
            </div>
          </div>

          <div className="mt-[30px] flex items-center justify-center gap-6">
            {counts.map((c, index) => (
              <Counts key={index} icon={c.icon} count={c.count} />
            ))}
          </div>
        </>
      )}

      <ContactModal
        modal={isModalOpen}
        close={() => setIsModalOpen(false)}
        cargo={cargo}
      />
    </div>
  );
};
