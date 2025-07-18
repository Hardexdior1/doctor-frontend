import axios from "axios"
const endpointroute=axios.create(
    {
        baseURL: 'https://doctor-backend-x7dv.onrender.com/api',

        withCredentials: true,
    }
)

export default endpointroute