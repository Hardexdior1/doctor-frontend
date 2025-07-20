import axios from "axios"
const endpointroute=axios.create(
    {
        baseURL: 'https://doctor-backend-x7dv.onrender.com/api',
                // baseURL: 'http://localhost:5000/api',


        withCredentials: true,
    }
)

export default endpointroute