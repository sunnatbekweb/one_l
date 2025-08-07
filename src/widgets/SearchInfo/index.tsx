import { useEffect } from "react";
import type { AppDispatch, RootState } from "@/app/store";
import { useTranslation } from "react-i18next";
import { StatisticsCard } from "@/entities/StatisticsCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistics } from "./model/statisticsSlice";

export const SearchInfo = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { statistics, isloading, error } = useSelector(
    (state: RootState) => state.statistics
  );

  console.log(statistics, isloading, error);

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
          />
          <StatisticsCard
            cargos={statistics.cargos}
            text={t("statistics.cargos")}
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
