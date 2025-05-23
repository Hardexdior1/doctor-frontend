// 'use client'

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import endpointroute from "../utils/endpointroute";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from "../context/AuthContext";

// const withAuth = (WrappedComponent, allowedRoles = []) => {
//   return (props) => {
//     const { user, setUser } = useAuth();
//     const router = useRouter();
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//       const checkAuth = async () => {
//         try {
//           setLoading(true)
//           const response = await endpointroute.get("/auth/status", {
//             withCredentials: true,
//           });

//           const loggedinUser = response.data.user;
//           setUser(loggedinUser);

//           if (!loggedinUser || (allowedRoles.length && !allowedRoles.includes(loggedinUser.role))) {
//             toast.error("Unauthorized access");
//             router.push("/auth");
//           }

//           setLoading(false)
//         } catch (error) {
//           toast.error(error.response?.data?.message || "Authentication failed");
//           router.push("/auth");
//         } finally {
//           setLoading(false);
//         }
//       };

//       checkAuth();
//     }, [user]);

//     if (loading) {
//       return (
//         <div className="bg-black opacity-2 ">
//           <div className="flex items-center justify-center h-screen">
//             <div className="z-10 w-16 h-16 border-8 border-t-red-500 border-r-yellow-500 border-b-green-500 border-l-blue-500 rounded-full animate-spin"></div>
//           </div>
//           <ToastContainer />
//         </div>
//       );
//     }

//     if (!user || (allowedRoles.length && !allowedRoles.includes(user.role))) {
//       return null; // Prevent rendering protected component
//     }

//     return <WrappedComponent {...props} />;
//   };
// };

// export default withAuth;
'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import endpointroute from "../utils/endpointroute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const withAuth = (WrappedComponent, allowedRoles = []) => {
  const ComponentWithAuth = (props) => {
    const { user, setUser } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          setLoading(true);
          const response = await endpointroute.get("/auth/status", {
            withCredentials: true,
          });

          const loggedinUser = response.data.user;
          setUser(loggedinUser);

          if (!loggedinUser || (allowedRoles.length && !allowedRoles.includes(loggedinUser.role))) {
            toast.error("Unauthorized access");
            router.push("/auth");
          }

        } catch (error) {
          toast.error(error?.response?.data?.message || "Authentication failed");
          router.push("/auth");
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, [user, setUser, router]); 

    if (loading) {
      return (
        <div className="bg-black opacity-2">
          <div className="flex items-center justify-center h-screen">
            <div className="z-10 w-16 h-16 border-8 border-t-red-500 border-r-yellow-500 border-b-green-500 border-l-blue-500 rounded-full animate-spin"></div>
          </div>
          <ToastContainer />
        </div>
      );
    }

    if (!user || (allowedRoles.length && !allowedRoles.includes(user.role))) {
      return null; // Prevent rendering protected component
    }

    return <WrappedComponent {...props} />;
  };

  // ✅ Fix for "Component definition is missing display name"
  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return ComponentWithAuth;
};

export default withAuth;
