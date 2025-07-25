
import React from "react"
import Doctor from './components/Doctor'
// import endpointroute from "../utils/endpointroute"
import { notFound } from 'next/navigation';
import endpointroute from "../../utils/endpointroute";


export const generateMetadata = async ({params}) => {
  const {id}= await params
  const res=await endpointroute.get(`/doctor/${id}/records`)
  const doctor=res.data
  return {
    title: `${doctor.doctor.name.toUpperCase()} | ${doctor.doctor.specialty}`,
    description: `Book an appointment with ${doctor.doctor.name}, a trusted ${doctor.doctor.specialty}. View profile, ratings & reviews.`,

  }
}


async function getDoctor(id) {
  const res=await endpointroute.get(`/doctor/${id}/records`)
  return res.data
}



const Page = async({params})=>{
const {id}= await params
    try {
      const doctor = await getDoctor(id);
  
      if (!doctor) {
        return notFound(); // if no doctor found
      }
      return (
        <div>
         <Doctor doctor={doctor}  />
        </div>
      );
  
    } catch (error) {
      console.log('Error fetching doctor:', error.message);
      notFound();
    }

}
export default Page