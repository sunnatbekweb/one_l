import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCargos } from "@/widgets/Cargo/model/cargoSlice";
import { useTranslation } from "react-i18next";
import type { AppDispatch, RootState } from "@/app/store";
import type { CargoParams } from "@/shared/types/cargo";
import "./modal.css";
import { fetchTransportType } from "@/entities/SearchForm/model/transportTypeSlice";

interface ModalProps {
  modal: boolean;
  close: () => void;
}

export const SearchSettings: React.FC<ModalProps> = ({ modal, close }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { car_type } = useSelector((state: RootState) => state.transportType);
  const { t } = useTranslation();
  const [formData, setFormData] = useState<CargoParams>({
    origin: "",
    destination: "",
    created_at: "",
    date: "",
    weight: "",
    volume: "",
    car_type: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchCargos(formData));
    close();
  };

  useEffect(() => {
    dispatch(fetchTransportType());
  }, [dispatch]);

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
                <span>{t("tab.cargo")}</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="transport" value="transport" />
                <span>{t("tab.transport")}</span>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="origin" className="flex flex-col gap-2">
                <span>{t("form.from")}:</span>
                <input
                  type="text"
                  name="origin"
                  id="origin"
                  placeholder={t("form.from")}
                  onChange={handleChange}
                  value={formData.origin}
                  className="border px-3 py-1.5 rounded-sm"
                />
              </label>
              <label htmlFor="destination" className="flex flex-col gap-2">
                <span>{t("form.to")}:</span>
                <input
                  type="text"
                  name="destination"
                  id="destination"
                  placeholder={t("form.to")}
                  onChange={handleChange}
                  value={formData.destination}
                  className="border px-3 py-1.5 rounded-sm"
                />
              </label>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4">
                <label htmlFor="created_at" className="flex flex-col gap-2">
                  <span>{t("form.dateFrom")}:</span>
                  <input
                    type="date"
                    name="created_at"
                    id="created_at"
                    onChange={handleChange}
                    value={formData.created_at}
                    className="border px-3 py-1.5 rounded-sm"
                  />
                </label>
                <label htmlFor="date" className="flex flex-col gap-2">
                  <span>{t("form.dateTo")}:</span>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    onChange={handleChange}
                    value={formData.date}
                    className="border px-3 py-1.5 rounded-sm"
                  />
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="weight" className="flex flex-col gap-2">
                <span>{t("form.weightFrom")}:</span>
                <select
                  name={"weight"}
                  id={"weight"}
                  onChange={handleChange}
                  value={formData.weight}
                  className={"border px-3 py-1.5 rounded-sm"}
                >
                  <option selected={true} disabled={true} value={""}>
                    Т
                  </option>
                  {[...Array(30)].map((_, index) => (
                    <option value={index + 1} key={index}>
                      {index + 1} т
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="volume" className="flex flex-col gap-2">
                <span>{t("form.volumeFrom")}:</span>
                <select
                  name={"volume"}
                  id={"volume"}
                  onChange={handleChange}
                  value={formData.volume}
                  className={"border px-3 py-1.5 rounded-sm"}
                >
                  <option selected={true} disabled={true} value="">
                    м³
                  </option>
                  {[...Array(150)].map((_, index) => (
                    <option value={index + 1} key={index}>
                      {index + 1} м³
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label htmlFor="car_type" className="flex flex-col gap-2">
              <span>{t("form.type")}:</span>
              <select
                name="car_type"
                id="car_type"
                className="border px-3 py-1.5 rounded-sm"
                onChange={handleChange}
                value={formData.car_type}
              >
                <option value="">{t("all_cargo_type")}</option>
                {car_type
                  .filter((t) => t?.car_type !== null)
                  .map((t, index) => (
                    <option key={index} value={t.car_type}>
                      {t.car_type}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <div className="w-full mx-auto flex justify-center">
            <button className="button_short">{t("form.find")}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
