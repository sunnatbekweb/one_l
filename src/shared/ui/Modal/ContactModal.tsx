import type { Cargo } from "@/shared/types/cargo";
import {
  FaGlobe,
  FaPhoneSquareAlt,
  FaShareSquare,
  FaTelegram,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

interface ModalProps {
  modal: boolean;
  close: () => void;
  cargo: Cargo | undefined;
}

export const ContactModal: React.FC<ModalProps> = ({ modal, close, cargo }) => {
  return (
    <div
      onClick={close}
      className={`
        fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex items-center justify-center
        transition-opacity duration-300
        ${
          modal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white text-black rounded-xl w-[95%] sm:w-[95%] md:w-[75%] lg:w-1/2 p-5 sm:p-10  transition-transform duration-300
          ${modal ? "scale-100" : "scale-50"}
        `}
      >
        <h2 className="text-center font-semibold text-2xl">Контакты</h2>
        <div className="grid grid-cols-1 gap-3 sm:gap-6 sm:px-6 mt-4 sm:mt-8 mb-2">
          <div className="flex items-center gap-x-4">
            <div>
              <FaUser className="text-xl sm:text-3xl" />
            </div>
            <span className="text-sm sm:text-xl">{cargo?.username}</span>
          </div>
          <div className="flex items-center gap-x-4">
            <div>
              <FaTelegram className="text-xl sm:text-3xl" />
            </div>
            <span className="text-sm sm:text-xl">
              Написать в{" "}
              <Link
                to={cargo?.source || "https://t.me/"}
                target="_blank"
                className="text-sky-700"
              >
                Telegram
              </Link>
            </span>
          </div>
          <div className="flex items-center gap-x-4">
            <div>
              <FaPhoneSquareAlt className="text-xl sm:text-3xl" color="lime" />
            </div>
            <Link
              to={`tel:${cargo?.phone}`}
              target="_blank"
              className="text-sm sm:text-xl"
            >
              {cargo?.phone}
            </Link>
          </div>
          <div className="flex items-center gap-x-4">
            <div>
              <FaGlobe className="text-xl sm:text-3xl" />
            </div>
            <span className="text-sm sm:text-xl">
              Источник:{" "}
              <Link
                to={cargo?.source || "https://t.me/"}
                target="_blank"
                className="text-blue-500 underline"
              >
                {cargo?.source}
              </Link>
            </span>
          </div>
          <div className="flex items-center gap-x-4">
            <div>
              <FaShareSquare className="text-xl sm:text-3xl" />
            </div>
            <span className="text-sm sm:text-xl">Поделиться с другом</span>
          </div>
        </div>
      </div>
    </div>
  );
};
