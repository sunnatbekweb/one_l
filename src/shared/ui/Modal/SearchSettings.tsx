import { useDispatch, useSelector } from "react-redux";
import "./modal.css";
import type { AppDispatch, RootState } from "@/app/store";
import { useState } from "react";
import type { CargoParams } from "@/shared/types/cargo";
import { fetchCargos } from "@/widgets/Cargo/model/cargoSlice";

interface ModalProps {
  modal: boolean;
  close: () => void;
}

export const SearchSettings: React.FC<ModalProps> = ({ modal, close }) => {
  const { type } = useSelector((state: RootState) => state.types);
  const [formData, setFormData] = useState<CargoParams>({
    origin: "",
    destination: "",
    created_at: "",
    date: "",
    weight: "",
    volume: "",
    type: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchCargos(formData));
    close();
  };

  return (
    <div onClick={close} className={`modal ${modal ? "open" : ""}`}>
      <div onClick={(e) => e.stopPropagation()} className="modal_content">
        <form onSubmit={handleSubmit}>
          <h2 className="font-bold text-xl">Фильтры поиска</h2>
          <div className="grid grid-cols-1 gap-3 my-5">
            <div className="flex items-center justify-center gap-5">
              {/* Radio инпуты не нужны */}
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="transport"
                  value="cargo"
                  defaultChecked
                />
                <span data-i18n="filters.radioCargo">Грузы</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="transport" value="transport" />
                <span data-i18n="filters.radioTransport">Транспорт</span>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="origin" className="flex flex-col gap-2">
                <span>Откуда:</span>
                <input
                  type="text"
                  name="origin"
                  id="origin"
                  placeholder="Откуда"
                  onChange={handleChange}
                  className="border px-3 py-1.5 rounded-sm"
                />
              </label>
              <label htmlFor="destination" className="flex flex-col gap-2">
                <span>Куда:</span>
                <input
                  type="text"
                  name="destination"
                  id="destination"
                  placeholder="Куда"
                  onChange={handleChange}
                  className="border px-3 py-1.5 rounded-sm"
                />
              </label>
            </div>
            <div>
              <p className="mb-2">Дата:</p>
              <div className="grid grid-cols-2 gap-4">
                <label htmlFor="created_at" className="flex flex-col gap-2">
                  <input
                    type="date"
                    name="created_at"
                    id="created_at"
                    placeholder="Откуда"
                    onChange={handleChange}
                    className="border px-3 py-1.5 rounded-sm"
                  />
                </label>
                <label htmlFor="date" className="flex flex-col gap-2">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    placeholder="Куда"
                    onChange={handleChange}
                    className="border px-3 py-1.5 rounded-sm"
                  />
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="weight" className="flex flex-col gap-2">
                <span>Масса:</span>
                <input
                  type="text"
                  name="weight"
                  id="weight"
                  placeholder="Т"
                  onChange={handleChange}
                  className="border px-3 py-1.5 rounded-sm"
                />
              </label>
              <label htmlFor="volume" className="flex flex-col gap-2">
                <span>Обём:</span>
                <input
                  type="text"
                  name="volume"
                  id="volume"
                  placeholder="м³"
                  onChange={handleChange}
                  className="border px-3 py-1.5 rounded-sm"
                />
              </label>
            </div>
            <label htmlFor="type" className="flex flex-col gap-2">
              <span>Тип груза:</span>
              <select
                name="type"
                id="type"
                className="border px-3 py-1.5 rounded-sm"
                onChange={handleChange}
              >
                <option value="">Все типы груза</option>
                {type.map((t, index) => (
                  <option key={index} value={t.type}>
                    {t.type}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="w-full mx-auto flex justify-center">
            <button className="button_short">Найти</button>
          </div>
        </form>
      </div>
    </div>
  );
};
