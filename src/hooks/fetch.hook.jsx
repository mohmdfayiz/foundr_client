// import axios from "axios";
// import { useEffect, useState } from "react";

// //  CUSTOM HOOK FOR FETCH DATA
// export default function useFetch(query){
//     const [getData, setData] = useState({isLoading: false, apiData:undefined, status:null, serverError:null})

//     useEffect(()=>{
//         if(!query) return;

//         const fetchData = async () => {
//             try {

//                 setData((prev) => ({...prev, isLoading:true}))
//                 const {data, status} = await axios.get(`/api/user/${query}`)

//                 if(status === 200){
//                     setData((prev) => ({...prev, isLoading:false, apiData:data, status:status}))
//                     return [getData]
//                 }
                
//             } catch (error) {
//                 setData((prev)=>({...prev,isLoading:false, serverError:error}))
//                 return [getData]
//             }
//         }
//         fetchData()

//     },[query]);

// }