import { useState } from "react";
import { Button, Drawer, Menu, Navbar as NavbarComponent } from "react-daisyui";
import { FaBars } from "react-icons/fa";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import MenuItem from "react-daisyui/dist/Menu/MenuItem";
import banner from "../../../images/banner_2022.png";
import { items } from "../../../Router";

export type NavbarProps = {
	children?: React.ReactNode;
};

export default function Navbar({ children }: NavbarProps) {
	const [visible, setVisible] = useState(false);
	const toggleVisible = () => {
		setVisible(!visible);
	};

	const { t } = useTranslation();
	const location = useLocation();

	const drawerSide = (
		<Menu className="bg-base-100 text-base-content border-r w-72 border-gray-600">
			<img src={banner} className="h-24" />
			{items
				.filter((e) => e.isVisible)
				.map((e) => (
					<Menu.Item key={`sidebar.to.${e.name}`}>
						<a href={e.path}>{t(`navbar.items.${e.name}`)}</a>
					</Menu.Item>
				))}
		</Menu>
	);

	const title = location.pathname.split("/").slice(-1)[0];

	return (
		<Drawer
			side={drawerSide}
			open={visible}
			onClickOverlay={toggleVisible}
			mobile
			className="font-sans">
			<NavbarComponent className="relative border-b border-gray-600">
				<div className="flex-none lg:hidden">
					<Button
						shape="square"
						color="ghost"
						onClick={toggleVisible}>
						<FaBars size={24} />
					</Button>
				</div>
				<div className="flex-1 px-2 mx-2 absolute left-1/2 right-1/2 w-max -translate-x-1/2">
					<h1 className="text-xl">
						{t(`navbar.items.${title}`, {
							defaultValue: "ZEvent 2022",
						})}
					</h1>
				</div>
			</NavbarComponent>
			<>{children}</>
		</Drawer>
	);
}
