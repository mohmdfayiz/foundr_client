import axios from "axios";
import jwt_decode from "jwt-decode";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN

/** To get user info from Token */
export async function getUser() {
    const token = localStorage.getItem('token')
    if (!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    return decode;
}

// check user already exist or not
export async function verifyUser(email) {
    try {
        const { status } = await axios.get(`/api/user/verifyUser?email=${email}`)
        return Promise.resolve({status})
    } catch (error) {
        return Promise.reject({ error })
    }
}

// email verification by send OTP to mail
export async function verifyEmail(email,userName){
    try {
       //get OTP
       const { data: {code}, status} = await axios.get("/api/user/generateOtp");
       let content = `OTP for your email verification is ${code}`;

       if(status === 201){
           //send mail with OTP
           await axios.post("/api/user/sendMail", { userName, email, content })
       }
       return Promise.resolve()
    } catch (error) {
        return Promise.reject({ error })
    }
}

// verify OTP 
export async function verifyOtp(otp){
    try{
        const {status} = await axios.post(`/api/user/verifyOtp?code=${otp}`)
        return Promise.resolve({status}) 
    }catch(error){
        return Promise.reject({error})
    }
}

// Save user data into database
export async function registerUser(userData){
    try {
        const { data:{token} ,status } = await axios.post(`/api/user/signup`,{userData})
        return Promise.resolve({token,status})
    } catch (error) {
        return Promise.reject({error})
    }
}