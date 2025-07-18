import React from "react";
import Link from "next/link";

const Footer = () => {
  const footerData = [
    {
      title: "Company",
      // links: ["Blogs", "How it works", "Terms", "Privacy policy"],

      links:[
        {
          name:"Blogs",
          route:"/blogs"

        },
        {
          name:"How it works",
          route:"#howitworks"
        },
        {
          name:"Terms",
          route:"#"
        },
        {
          name:"Privacy policy",
          route:"#"

        }
      ]
    },
    {
      title: "About us",
      // links: ["Who we are", "Feature", "News settler", ],
      links:[
        {
          name:"Who we are",
          route:"#about"

        },
        
        {
          name:"News settler",
          route:"#"
        },
       
      ]
    },
    {
      title: "Services",
      // links: ["Browse doctors", "Send a quick message", "Sign up", ],
      links:[
        {
          name:"Browse doctors",
          route:"/doctors"

        },
        {
          name:"Contact us",
          route:"/contact"
        },
       
        {
          name:"Sign in",
          route:"/auth"
        },
       
      ]
    },
    {
      title: "Contact Us",
      links:[
        {
          name:"📞 +234 9131114346",
          route:"#"
        },{
          name:"✉️adeniranefortlex@mail.com",
          route:"#"
        }
      ]
      // links: ["", ],
    },
  ];

  return (
    <footer >
      

      {/* footer */}
      

      <div className="bg-[#207dff] pt-10">
        <footer className="container grid gap-6 lg:grid-cols-5">
          <div className="md:col-span-1">
          <h2 className="font-bold mb-2">Mediplus</h2>


            <p className="text-sm text-white">
            We’re more than travel-we’re adventure, exploration, and unforgettable experiences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:col-span-4">
            {footerData.map((section, index) => (
              <div key={index}>
                <h3 className="font-bold mb-4 text-white">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                   <Link  key={i} href={link.route}> <li className="text-sm text-white my-2">
                   {link.name}
                 </li></Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </footer>

        <div className="container mt-5 mb-5 py-5 border-t flex flex-col gap-4 md:flex-row items-center justify-center ">
          <div>
            <p className="text-sm text-white font-semibold">
              {" "}
              &copy; {new Date().getFullYear()} Mediplus all right reserved
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
