import { Link } from "react-router-dom";
import { MdOutlinePayment } from "react-icons/md";
import "./modal.css";

interface ModalProps {
  modal: boolean;
  close: () => void;
}

export const SubscribeModal: React.FC<ModalProps> = ({ modal, close }) => {
  return (
    <div onClick={close} className={`modal ${modal ? "open" : ""}`}>
      <div onClick={(e) => e.stopPropagation()} className="modal_content">
        <MdOutlinePayment size={64} className="text-yellow-500 mx-auto mb-3" />
        <h2 className="font-bold text-2xl text-center"> У вас нет подписки</h2>
        <p className="text-gray-600 text-center my-3">
          Оплатите подписку в боте, чтобы пользоваться сервисом.
        </p>
        <div className="flex justify-center">
          <Link
            to={"https://t.me/ravshandev_monitoring_bot"}
            target="_blank"
            className="button_short"
          >
            Оплатить в боте
          </Link>
        </div>
      </div>
    </div>
  );
};
