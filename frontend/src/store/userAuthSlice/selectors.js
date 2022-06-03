export const getIsUserAuth = (state) => state.userAuth.isAuth
export const getIsLoginError = (state) => state.userAuth.errorLoginMessage
export const getUserPersonalId = (state) => state.userAuth.userId
export const getUserRole = (state) => state.userAuth.role
export const getIsUserAdmin = (state) => state.userAuth.role === 'ADMIN'