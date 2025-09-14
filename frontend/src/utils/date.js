export function dateFromObjectIdHex(objectId) {
	try {
		const tsHex = objectId?.toString()?.slice(0, 8);
		const ts = parseInt(tsHex, 16) * 1000;
		return new Date(ts);
	} catch {
		return null;
	}
}

