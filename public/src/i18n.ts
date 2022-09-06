import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n.use(LanguageDetector)
	.use(backend)
	.use(initReactI18next)
	.init({
		load: "languageOnly",
		detection: {
			order: ["navigator"],
		},
	});

export default i18n;
