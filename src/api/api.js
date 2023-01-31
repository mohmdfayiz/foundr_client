/* APIs used for send and receive data */

export async function verifyUser(userData){
    try {
        axios.get({url: `http://localhost:8000/api/user/generateOtp?email=${userData.email}`})
    } catch (error) {
        
    }
}

