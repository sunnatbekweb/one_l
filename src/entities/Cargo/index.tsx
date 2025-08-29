import { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatCustomDate } from "@/shared/lib/formatDate";
import { useCurrency } from "../CargoCard/lib/useCurrency";
import { ContactModal } from "@/shared/ui/Modal/ContactModal";
import { useGetCargoByIdQuery } from "@/app/api";
import { Counts } from "./ui/Counts";
import {
  FaEye,
  FaPhoneAlt,
  FaShareSquare,
  FaTelegram,
  FaWhatsappSquare,
} from "react-icons/fa";
import { IoMdResize } from "react-icons/io";

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

  const { data, isLoading, error } = useGetCargoByIdQuery(Number(id));

  const counts = [
    { icon: <FaEye fontSize={24} color="gray" />, count: data?.viewed },
    { icon: <FaPhoneAlt fontSize={24} color="gray" />, count: data?.phoned },
    {
      icon: <FaTelegram fontSize={24} color="gray" />,
      count: data?.chatted_telegram,
    },
    {
      icon: <FaWhatsappSquare fontSize={24} color="gray" />,
      count: data?.chatted_whatsup,
    },
    { icon: <FaShareSquare fontSize={24} color="gray" />, count: data?.shared },
  ];

  return (
    <div className="py-[30px] border-y-2 border-y-gray-400">
      {isLoading ? (
        <div className="text-center">{t("loading")}</div>
      ) : error ? (
        <div className="text-red-500 text-center">{JSON.stringify(error)}</div>
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
              <p>{data?.info}</p>
              <p className="whitespace-pre-line">
                {[
                  data?.origin,
                  data?.destination,
                  data?.type,
                  data?.weight
                    ? `${data.weight > 1000 ? data.weight / 1000 : data.weight} т`
                    : null,
                  data?.car_type,
                  data?.volume
                    ? `${data.volume > 1000 ? data.volume / 1000 : data.volume} м³`
                    : null,
                  formatCustomDate(data?.date || "") || null,
                  typeof data?.price === "number"
                    ? `${data.price.toLocaleString()} ${useCurrency(data.price)}`
                    : t("fraxt"),
                  data?.temperature ? `${data.temperature}°C` : null,
                ]
                  .filter(Boolean)
                  .join("\n")}
              </p>
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
        cargo={data}
      />
    </div>
  );
};
