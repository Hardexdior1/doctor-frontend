
'use client'
import { createContext,useState,useContext ,useEffect} from "react";
import endpointroute from "../utils/endpointroute";
import "react-toastify/dist/ReactToastify.css";
import {  toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AuthContext =createContext()

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [doctor,setDoctors]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [lodingLogin,setLoadingLogin]=useState(false)
    const router = useRouter();

    // console.log(doctor)
    useEffect(()=>{
      const fetchAllDoctors = async () => {
        setIsLoading(true)
        try {
          const response=await endpointroute.get("/all-doctors");
          setDoctors(response.data)
          setIsLoading(false)
  
        } catch (error) {
          console.log("getting doctors failed:", error);
          setIsLoading(false)
  
        }
      };
     
      fetchAllDoctors()
    },[])
    const [username,setUserName] = useState('');
    const [password,setPassWord] = useState('');
    //  const [username] = useState('admin');
    // const [password] = useState('admin');
    const handleLogin = async (e) => {
      e.preventDefault();
      setLoadingLogin(true);
      
      try {
        const response = await endpointroute.post("/auth/login",{
          username,
          password
        },{ withCredentials: true });
        
        const loggedinUser = response.data.user;
        console.log('user',response.data.user)
        setUser(loggedinUser);
        // router.push(loggedinUser.role=="admin"?'/admin':'/user');
        toast.success("Login successful! Redirecting...");
      } catch (error) {
        console.log("Login failed:", error);
        toast.error(error.response?.data?.msg || "Login failed. Please try again.");
      } finally {
        setLoadingLogin(false);
      }
    };
 const [loadingLogOut,setLoadingLogOut]=useState(false)
      const [showLogOut,setShowLogout]=useState(false)

  

     const handleLogout=async()=>{

    try { 
      setLoadingLogOut(true)
const response=await endpointroute.post('/logout ')
toast.success(response.data.message||"Logout successful")
setShowLogout(false)
setLoadingLogOut(false)
localStorage.removeItem('user')
localStorage.removeItem('token')
router.push('/auth')
setUser(null)
// setUser(null)

      
    } catch (error) {
      console.log(error?.response?.data?.message||"oops. something went wrong, try again.")
      console.log(error)
      setLoadingLogOut(false)
      setShowLogout(false)
      toast.error(error?.response?.data?.message||"oops. something went wrong, try again.")

    }
   }
   
    return <AuthContext.Provider value={{user,setUser,doctor,setDoctors,isLoading,handleLogin,lodingLogin,username,password,handleLogout,loadingLogOut,showLogOut,setShowLogout, setUserName,setPassWord}}>
{children}
    </AuthContext.Provider>
}

export const useAuth=()=>useContext(AuthContext)