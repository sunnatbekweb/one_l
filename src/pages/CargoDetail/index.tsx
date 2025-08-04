import { useParams } from "react-router-dom";
import { FaEye, FaPhoneAlt, FaShareSquare, FaTelegram } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

export const CargoDetail = () => {
  const params = useParams();
  return (
    <section className="py-[15px]">
      <div className="flex items-center justify-between pb-10">
        <button
          onClick={() => window.history.back()}
          className="w-10 h-10 rounded-full bg-[#041e90] font-bold text-4xl text-white"
        >
          <IoIosArrowBack />
        </button>
        <h2 className="font-medium text-3xl">Подробнее</h2>
        <div>{params.id}</div>
      </div>
      <div className="py-[30px] border-y-2 border-y-gray-400">
        <div className="p-3 border border-gray-400 font-medium text-gray-500">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl">СРОЧНО</h3>
            <button>II</button>
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            ipsam magnam voluptatibus nesciunt doloremque est? Fugiat, animi
            quae repellendus odit, nihil corrupti possimus ullam eum commodi,
            itaque eveniet harum! Ea.
          </p>
        </div>

        <div className="mt-[30px] flex items-center justify-center gap-6">
          <div className="flex gap-2 items-center font-medium">
            <div>
              <FaEye fontSize={24} color="gray" />
            </div>
            <span>10</span>
          </div>
          <div className="flex gap-2 items-center font-medium">
            <div>
              <FaTelegram fontSize={24} color="gray" />
            </div>
            <span>5</span>
          </div>
          <div className="flex gap-2 items-center font-medium">
            <div>
              <FaPhoneAlt fontSize={24} color="gray" />
            </div>
            <span>3</span>
          </div>
          <div className="flex gap-2 items-center font-medium">
            <div>
              <FaShareSquare fontSize={24} color="gray" />
            </div>
            <span>2</span>
          </div>
        </div>
      </div>
    </section>
  );
};
