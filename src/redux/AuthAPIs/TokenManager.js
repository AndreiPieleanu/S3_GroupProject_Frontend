import jwt_decode from "jwt-decode";

const TokenManager = {
    getAccessToken: () => localStorage.getItem("CPP_token"),
    getClaims: () => {
        if (!localStorage.getItem("CPP_token")) {
            return undefined;
        }
        return jwt_decode(localStorage.getItem("CPP_token"));
    },
    setAccessToken: (token) => {
        localStorage.setItem("CPP_token", token);
        const claims = jwt_decode(token);
        localStorage.setItem("CPP_sub", claims.sub);
        localStorage.setItem("CPP_userId", claims.userId);
        return claims;
    },
    clear: () => {
        localStorage.removeItem("CPP_token");
        localStorage.removeItem("CPP_sub");
        localStorage.removeItem("CPP_userId");
    }
}

export default TokenManager;