import { AnalyticsCard } from "@/entities/AnalyticsCard";

export const SearchInfo = () => {
  return (
    <section className="my-[15px] mx-auto">
      <div>
        <h2 className="flex flex-col gap-y-2.5 font-bold text-3xl">
          <span className="text-[#041e90]">ЦИФРОВАЯ ПЛАТФОРМА</span>
          <span className="text-[#5a78ff7a]">ДЛЯ СОВРЕМЕННОЙ ЛОГИСТИКИ</span>
        </h2>
        <p className="font-medium text-[#041e90] mt-2.5">
          Быстро находите груз или транспорт в пару кликов и контролируйте
          перевозку в реальном времени!
        </p>
        <div className="my-[15px] grid grid-cols-3 gap-x-[15px]">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <AnalyticsCard key={index} />
            ))}
        </div>
        <h2 className="flex flex-col gap-y-2.5 font-bold text-3xl">
          <span className="text-[#041e90]">1LOG - ЕДИНАЯ ЭКОСИСТЕМА</span>
          <span className="text-[#5a78ff7a]">
            ДЛЯ ПОИСКА ГРУЗОВ И ТРАНСПОРТА
          </span>
        </h2>
      </div>
    </section>
  );
};
