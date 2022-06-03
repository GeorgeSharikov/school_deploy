export const getPeronalDataSelector = (state, isOwn = true) => {
    if(isOwn){
        return state.personalData.personalData
    }
    return state.personalData.otherAccountData
}
export const getIsFetching = (state) => state.personalData.isFetching
export const getUserFullName = (state) => {
    let {firstName, lastName} = state.personalData.personalData
    return `${firstName} ${lastName}`
}