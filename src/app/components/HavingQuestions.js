import React from "react";
import getintouch from "../../../public/getintouch.png";
import cleaningBrush from "../../../public/officecleaning.png";
import call from "../../../public/callicon.png";
import location from "../../../public/location.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const HavingQuestions = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .transform((value) => value.trim())
      .min(3, "Name must atleast be three characters")
      .max(50, "Name must not exceed 50 characters")
      .required("Name is required"),

    email: Yup.string()
      .transform((value) => value.trim())
      .email("Invalid email address")
      .required("Email is required"),
    residence: Yup.string()
      .transform((value) => value.trim())
      .min(3, "Residence must be at least 3 characters")
      .required("residence is required"),
  });

  const handleSubmit = ({ resetForm }) => {
    toast.success("Your message has been sent successfully!");

    resetForm();
  };

  return (
    <div>
      <section className="relative grid gap-7 items-center justify-center py-7 md:grid-cols-2 gap-5 md:py-0">
        <div className="bg-blue-400 relative order-2 rounded md:order-1">
          <Image
            src={cleaningBrush}
            alt="cleaning-brush"
            className="absolute top-0 right-0"
          />
          {/* w-5/6 */}
          <Image src={getintouch} alt="get-in-touch-image" />
          <div className="absolute text-center shadow-md rounded-lg flex items-center gap-2  bottom-4 left-10 bg-white bg-opacity-70 z-10 py-1 px-2">
            <Image src={call} alt="call-icon" height={40} width={40} />
            <div className="text-left">
              <p className="text-bold text-black">Phone</p>
              <small className="text-[#838B95]"> +44-913-111-4346 </small>
            </div>{" "}
          </div>

          <div className="absolute text-center shadow-md rounded-lg flex items-center gap-2  top-20 mt-8 right-8 bg-white bg-opacity-70 z-10 py-1 px-2">
            <Image src={location} alt="location-icon" height={40} width={40} />
            <div className="text-left">
              <p className="text-bold text-black">Location</p>
              <small className="text-[#838B95]"> 380 Albart ST, US </small>
            </div>{" "}
          </div>
        </div>

        <div className="flex flex-col gap-4 order-1 md:order-2">
          <div>
            <h2 className="font-bold mb-0 leading-10">
              Having Question? Get in
              <span className="text-[#4977E5]  mt-0"> touch! </span>
            </h2>
          </div>
          <ToastContainer />

          <Formik
            initialValues={{ name: "", email: "", residence: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {() => (
              <Form className="flex flex-col gap-4">
                <div>
                  {" "}
                  <label
                    htmlFor="name"
                    className="block mb-2 font-semibold cursor-pointer">
                    Your name
                  </label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full p-2 border px-2 rounded-full focus:outline-none focus:ring"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  {" "}
                  <label
                    htmlFor="email"
                    className="block mb-2 font-semibold cursor-pointer">
                    Your email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border px-2 rounded-full focus:outline-none focus:ring"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  {" "}
                  <label
                    htmlFor="residence"
                    className="block mb-2 font-semibold cursor-pointer">
                    Residence
                  </label>
                  <Field
                    name="residence"
                    type="text"
                    placeholder="Enter your residence"
                    className="w-full p-2 border px-2 rounded-full focus:outline-none focus:ring"
                  />
                  <ErrorMessage
                    name="residence"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </div>
  );
};

export default HavingQuestions;
