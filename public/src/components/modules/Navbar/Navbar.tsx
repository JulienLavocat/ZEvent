import { useState } from "react";
import { Button, Drawer, Menu, Navbar as NavbarComponent } from "react-daisyui";
import { FaBars } from "react-icons/fa";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export type NavbarProps = {
	children?: React.ReactNode;
};

const items: { name: string; link: string }[] = [
	{
		name: "globalStats",
		link: "/",
	},
	{
		name: "streamers",
		link: "/streamers",
	},
];

export default function Navbar({ children }: NavbarProps) {
	const [visible, setVisible] = useState(false);
	const toggleVisible = () => {
		setVisible(!visible);
	};

	const { t } = useTranslation();
	const location = useLocation();

	const drawerSide = (
		<ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
			{items.map((e) => (
				<li key={`sidebar.to.${e.name}`}>
					<a href={e.link}>{t(`navbar.items.${e.name}`)}</a>
				</li>
			))}
		</ul>
	);

	const title = location.pathname.split("/").slice(-1)[0];

	return (
		<Drawer
			side={drawerSide}
			open={visible}
			onClickOverlay={toggleVisible}
			className="font-sans">
			<NavbarComponent className="relative">
				<div className="flex-none lg:hidden">
					<Button
						shape="square"
						color="ghost"
						onClick={toggleVisible}>
						<FaBars />
					</Button>
				</div>
				<div className="flex-1 px-2 mx-2 absolute left-1/2 right-1/2 w-max -translate-x-1/2">
					{t(`navbar.items.${title}`, {
						defaultValue: "ZEvent 2022",
					})}
				</div>
				<div className="flex-none hidden lg:block">
					<Menu horizontal>
						<Menu.Item>
							<a>Navbar Item 1</a>
						</Menu.Item>
						<Menu.Item>
							<a>Navbar Item 2</a>
						</Menu.Item>
					</Menu>
				</div>
			</NavbarComponent>
			{children}
		</Drawer>
	);
}
