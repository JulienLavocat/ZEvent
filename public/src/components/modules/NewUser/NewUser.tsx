import React, { useState } from "react";
import { Modal } from "react-daisyui";
import { useTranslation } from "react-i18next";

export default function NewUser() {
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useTranslation();

	return (
		<Modal open={isOpen} onClickBackdrop={() => setIsOpen(!isOpen)}>
			<div className="">
				<h2 className="text-xl text-center">{t("newUser.title")}</h2>
				<p>{t("newUser.body")}</p>
				<ul>
					{(
						t("newUser.features", {
							returnObjects: true,
						}) as string[]
					).map((e, i) => (
						<li key={"feature" + e + i}>{e}</li>
					))}
				</ul>
			</div>
		</Modal>
	);
}
