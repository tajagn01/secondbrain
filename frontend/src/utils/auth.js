export function getToken() {
	try {
		return localStorage.getItem("token") || "";
	} catch {
		return "";
	}
}

export function getUsername() {
	try {
		return localStorage.getItem("username") || "";
	} catch {
		return "";
	}
}

export function setAuth(token, username) {
	try {
		if (token) localStorage.setItem("token", token);
		if (username) localStorage.setItem("username", username);
	} catch {}
}

export function clearAuth() {
	try {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
	} catch {}
}

export function isAuthed() {
	return Boolean(getToken());
}

