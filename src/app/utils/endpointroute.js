import axios from "axios"
const endpointroute=axios.create(
    {
        baseURL: "http://localhost:3003/api", 

        withCredentials: true,
    }
)

export default endpointroute