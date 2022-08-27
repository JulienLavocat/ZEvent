import fetch from "node-fetch";
import { ZEventData } from "./structures";

export const getZEvent = () =>
	fetch("https://zevent.fr/api/").then(
		async (r: any) => (await r.json()) as ZEventData
	);
