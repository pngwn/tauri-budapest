import { check } from "@tauri-apps/plugin-updater";
import { ask } from "@tauri-apps/plugin-dialog";
import { relaunch } from "@tauri-apps/plugin-process";

export async function check_for_updates() {
	const update = await check();

	if (!update) {
		return;
	}
	const wants_update = await ask(`Update to ${update.version} now?`, {
		title: "Update",
		okLabel: "Update",
		cancelLabel: "Not now",
	});

	if (wants_update) {
		await update.downloadAndInstall();
		await relaunch();
	}
}
