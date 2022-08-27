import React from "react";
import { Theme } from "react-daisyui";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Router from "./Router";

import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<Theme dataTheme="forest">
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</Theme>
		</Provider>
	</React.StrictMode>
);
