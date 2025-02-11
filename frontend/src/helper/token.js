const tokenMachineName = "_user_jwt_token";

export const saveUserToken = (token) => {
	localStorage.setItem(tokenMachineName, token);
	return token;
};

export const getUserToken = () => {
	const token = localStorage.getItem(tokenMachineName);
	return token;
};

export const hasToken = () => {
	const token = getUserToken();
	if (token) return true;
	return false;
};
