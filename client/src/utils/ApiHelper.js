const getURL = process.env.REACT_APP_HOST_URL
const getAccessToken = ()=>{
    return sessionStorage.getItem("accessToken")
}



module.exports = {getURL, getAccessToken}