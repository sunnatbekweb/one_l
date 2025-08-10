import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import type { Cargo } from "@/shared/types/cargo";
import { updateCargoActions } from "@/widgets/Cargo/model/cargoPatchSlice";
import {
	FaGlobe,
	FaPhoneSquareAlt,
	FaShareSquare,
	FaTelegram,
	FaUser
} from "react-icons/fa";
import "./modal.css";

interface ModalProps {
	modal: boolean;
	close: () => void;
	cargo: Cargo | null;
}

export const ContactModal: React.FC<ModalProps> = ({ modal, close, cargo }) => {
	const dispatch = useDispatch<AppDispatch>();

	const message = `Я теперь ищу грузы через 1LOG — просто, удобно и всё под рукой.

Смотри сам: https://t.me/one_log_bot

Бесплатный период начнётся автоматически, как только нажмёшь «Подробнее» на заявке.`;

	return (
		<div onClick={close} className={`modal ${modal ? "open" : ""}`}>
			<div onClick={e => e.stopPropagation()} className="modal_content">
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
							<FaTelegram className="text-xl sm:text-3xl text-[#659df2]" />
						</div>
						<span className="text-sm sm:text-xl">
							Написать в{" "}
							<Link
								to={cargo?.source || "https://t.me/"}
								target="_blank"
								className="text-[#659df2]"
								onClick={() =>
									dispatch(
										updateCargoActions({
											cargoId: cargo?.id || 0,
											data: { chatted_telegram: true }
										})
									)
								}
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
							className="text-sm sm:text-xl"
							onClick={() =>
								dispatch(
									updateCargoActions({
										cargoId: cargo?.id || 0,
										data: { phoned: true }
									})
								)
							}
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
						<Link
							to={`https://t.me/share/url?text=${encodeURIComponent(message)}`}
							onClick={() =>
								dispatch(
									updateCargoActions({
										cargoId: cargo?.id || 0,
										data: { shared: true }
									})
								)
							}
							className="text-sm sm:text-xl"
						>
							Поделиться с другом
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
