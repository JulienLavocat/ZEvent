import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n.use(detector)
	.use(backend)
	.use(initReactI18next)
	.init({ load: "languageOnly", fallbackLng: "en" });

export default i18n;
