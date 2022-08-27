import { useState } from "react";
import { Button, Drawer, Menu, Navbar as NavbarComponent } from "react-daisyui";
import { FaBars } from "react-icons/fa";
import React from "react";

export type NavbarProps = {
	children?: React.ReactNode;
};

export default function Navbar({ children }: NavbarProps) {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => {
		setVisible(!visible);
	};

	const drawerSide = (
		<ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
			<li>
				<a>Sidebar Item 1</a>
			</li>
			<li>
				<a>Sidebar Item 2</a>
			</li>
		</ul>
	);

	return (
		<Drawer
			side={drawerSide}
			open={visible}
			onClickOverlay={toggleVisible}
			className="font-sans"
		>
			<NavbarComponent>
				<div className="flex-none lg:hidden">
					<Button shape="square" color="ghost" onClick={toggleVisible}>
						<FaBars />
					</Button>
				</div>
				<div className="flex-1 px-2 mx-2">ZEvent 2022</div>
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
