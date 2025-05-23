import axios from "axios"
const endpointroute=axios.create(
    {
        baseURL: "http://localhost:3002/api", 

        withCredentials: true,
    }
)

export default endpointroute