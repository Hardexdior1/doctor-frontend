
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
    const response = await endpointroute.post("/auth/login", {
      username,
      password,
    });
    
    const { user, token } = response.data;

    //  Save token locally
    localStorage.setItem("token", token);

    setUser(user);
    toast.success("Login successful! Redirecting...");

    // redirect based on role
    router.push(user.role === "admin" ? "/admin" : "/user");
    
  } catch (error) {
    console.log("Login failed:", error);
    toast.error(error.response?.data?.msg || "Login failed. Please try again.");
  } finally {
    setLoadingLogin(false);
  }
};

 const [loadingLogOut,setLoadingLogOut]=useState(false)
      const [showLogOut,setShowLogout]=useState(false)

  

     const handleLogout=()=>{

  
      setLoadingLogOut(true)
toast.success("Logout successful")
setShowLogout(false)
setLoadingLogOut(false)
localStorage.removeItem('user')
localStorage.removeItem('token')
router.push('/auth')
setUser(null)
// setUser(null)

      
  
   }
   
    return <AuthContext.Provider value={{user,setUser,doctor,setDoctors,isLoading,handleLogin,lodingLogin,username,password,handleLogout,loadingLogOut,showLogOut,setShowLogout, setUserName,setPassWord}}>
{children}
    </AuthContext.Provider>
}

export const useAuth=()=>useContext(AuthContext)