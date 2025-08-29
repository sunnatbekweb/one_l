import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { useTranslation } from "react-i18next";
import { SearchFilter } from "@/shared/ui/Modal/SearchFilterModal";
import { SearchSettings as SettingsModal } from "@/shared/ui/Modal/SearchSettings";
import { FaRotate, FaSliders } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import { useLazyGetCargosQuery } from "@/app/api";

interface SettingsProps {
  resultCount: number | undefined;
  currentPage: number;
  isloading: boolean;
}

export const SearchSettings: React.FC<SettingsProps> = ({
  resultCount,
  currentPage,
  isloading,
}) => {
  const { t } = useTranslation();
  const [filterModal, setFilterModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);

  const filters = useSelector((state: RootState) => state.filters);

  const [triggerGetCargos] = useLazyGetCargosQuery();

  const handleUpdate = () => {
    triggerGetCargos({ ...filters, page: currentPage + 1 });
  };

  return (
    <div className="my-5">
      <p
        dangerouslySetInnerHTML={{
          __html: t("found_cargos", { count: resultCount }),
        }}
      />
      <div>
        <div className="flex items-center justify-between ">
          <button
            onClick={handleUpdate}
            disabled={isloading}
            className="flex items-center gap-x-1 px-4 py-1.5 bg-[#7c8fe7] text-white rounded-md font-medium disabled:opacity-50"
          >
            <FaRotate />
            <span>{t("search_head.update")}</span>
          </button>
          <div className="flex items-center">
            {/* Filter modal */}
            <button
              onClick={() => setFilterModal(true)}
              className="flex flex-col gap-y-1.5 items-center p-2.5"
            >
              <FaFilter fontSize={20} />
              <span className="font-medium text-sm">
                {t("search_head.filters")}
              </span>
            </button>
            <SearchFilter
              modal={filterModal}
              close={() => setFilterModal(false)}
            />

            {/* Settings modal */}
            <button
              onClick={() => setSettingsModal(true)}
              className="flex flex-col gap-y-1.5 items-center p-2.5"
            >
              <FaSliders fontSize={20} />
              <span className="font-medium text-sm">
                {t("search_head.settings")}
              </span>
            </button>
            <SettingsModal
              modal={settingsModal}
              close={() => setSettingsModal(false)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>{t("sort.title")}</div>

          <select
            name="sort_by"
            id="sort_by"
            className="px-2.5 py-1.5 cursor-pointer bg-white border-2 border-[#ccc] rounded-md"
          >
            <option value="0">{t("sort.createdAt")}</option>
            <option value="1">{t("sort.loadDate")}</option>
            <option value="2">{t("sort.price")}</option>
            <option value="3">{t("sort.rating")}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
