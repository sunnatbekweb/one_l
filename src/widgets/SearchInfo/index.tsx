import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { StatisticsCard } from "@/entities/StatisticsCard";
import { fetchStatistics } from "./model/statisticsSlice";
import { FaUsers } from "react-icons/fa";
import { BsFillBoxFill } from "react-icons/bs";

export const SearchInfo = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { statistics } = useSelector((state: RootState) => state.statistics);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  return (
    <section className="py-[15px] mx-auto">
      <div>
        <h2 className="flex flex-col gap-y-2.5 font-bold text-3xl">
          <span className="text-[#041e90]">{t("info_title_top.line1")}</span>
          <span className="text-[#5a78ff7a]">{t("info_title_top.line2")}</span>
        </h2>
        <p className="font-medium text-[#041e90] mt-2.5">
          {t("info_description")}
        </p>
        <div className="my-[15px] grid grid-cols-1 sm:grid-cols-3 gap-[15px]">
          <StatisticsCard
            users={statistics.users}
            text={t("statistics.users")}
            icon={<FaUsers fontSize={35} />}
          />
          <StatisticsCard
            cargos={statistics.cargos}
            text={t("statistics.cargos")}
            icon={<BsFillBoxFill fontSize={35} />}
          />
        </div>
        <h2 className="flex flex-col gap-y-2.5 font-bold text-3xl">
          <span className="text-[#041e90]">{t("bottom_title.line1")}</span>
          <span className="text-[#5a78ff7a]">{t("bottom_title.line2")}</span>
        </h2>
      </div>
    </section>
  );
};
