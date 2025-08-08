import "./modal.css";

interface ModalProps {
  modal: boolean;
  close: () => void;
}

export const SearchFilter: React.FC<ModalProps> = ({ modal, close }) => {
  return (
    <div onClick={close} className={`modal ${modal ? "open" : ""}`}>
      <div onClick={(e) => e.stopPropagation()} className="modal_content">
        <h2 className="font-bold text-xl">Фильтры поиска</h2>
        <p className="text-lg py-2.5">Выберите фильтры для поиска заявок</p>
        <div className="grid grid-cols-1 gap-3 sm:gap-6 sm:px-6 mt-4 sm:mt-8 mb-2"></div>
        <button className="button_long">Найти</button>
      </div>
    </div>
  );
};
