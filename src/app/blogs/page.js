
// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';


// const Page = () => {


//     const blogPosts = [
//         {
//           img:"/blog1.webp",
//           url:"https://newsinhealth.nih.gov/2021/04/good-sleep-good-health",
//           date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
//           title: "The Vital Importance of Quality Sleep for Health",
//           excerpt: "Chronic sleep deprivation can lead to serious health consequences including weakened immunity, weight gain, and increased risk of chronic diseases. Learn how proper sleep hygiene can transform your wellbeing."
//         },
//         {
//           img:"/blog2.webp",
//           url:"https://www.healthline.com/health/weakness",
//           date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
//           // title: "5 Warning Signs You're Not Getting Enough Rest",
//           title: "5 Warning Signs Your're getting weak",
    
//           excerpt: "From constant fatigue to mood swings, your body sends clear signals when you need more sleep. Discover these warning signs and practical solutions for better rest."
//         },
//         {
//           url:"https://www.nhlbi.nih.gov/health/sleep-deprivation/health-effects",
//           img:"/blog3.webp",
//           date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
//           title: "How Sleep Affects Your Mental and Physical Health",
//           excerpt: "Sleep is the foundation of good health. This article explores the science behind sleep's restorative powers and provides evidence-based tips for improving sleep quality."
//         }
//       ];
  
 
     
 
  
//   return (
//     <main className="container py-16 my-20">
      

          


      
// <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 col-span-4 bordee">
//   {blogPosts.map((post, index) => (
//     <div 
//       key={index} 
//       className="blog-post flex flex-col gap-4 p-4 border border-gray-200 rounded-lg"
//     >
//       <Image src={post.img} alt={post.title} width={1000} height={400}/>
//       {/* Top-aligned content container */}
//       <div className="flex flex-col flex-grow gap-4">
//         <p className="text-gray-500 min-h-[1.5rem]">{post.date}</p>
//         <h3 className="text-xl font-bold min-h-[3rem] line-clamp-2">{post.title}</h3>
//         <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
//       </div>

//       {/* Bottom-aligned button */}
//       <div className="mt-auto">
//         <Link href={post.url} target='blank'><button className="px-6 py-3 bg-[#207dff] text-white rounded-full font-semibold hover:bg-blue-700 transition">
//           Read more
//         </button></Link>
//       </div>
//     </div>
//   ))}
// </div>


     

//     </main>
//   );
// };

// export default Page



'use client';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    img: "/blog1.webp",
    url: "https://newsinhealth.nih.gov/2021/04/good-sleep-good-health",
    date: "Published on July 16, 2025",
    title: "The Vital Importance of Quality Sleep for Health",
    excerpt:
      "Chronic sleep deprivation can lead to serious health consequences including weakened immunity, weight gain, and increased risk of chronic diseases. Learn how proper sleep hygiene can transform your wellbeing.",
  },
  {
    img: "/blog2.webp",
    url: "https://www.healthline.com/health/weakness",
    date: "Published on July 16, 2025",
    title: "5 Warning Signs You're Getting Weak",
    excerpt:
      "From constant fatigue to mood swings, your body sends clear signals when you need more sleep. Discover these warning signs and practical solutions for better rest.",
  },
  {
    img: "/blog3.webp",
    url: "https://www.nhlbi.nih.gov/health/sleep-deprivation/health-effects",
    date: "Published on July 16, 2025",
    title: "How Sleep Affects Your Mental and Physical Health",
    excerpt:
      "Sleep is the foundation of good health. This article explores the science behind sleep's restorative powers and provides evidence-based tips for improving sleep quality.",
  },
  {
    img: "https://media.post.rvohealth.io/wp-content/uploads/2023/06/doctor-testing-patient-reflexes-during-physica-exam-732x549-thumbnail.jpg",
    title: "How Do You Know If You Have a Brain Tumor?",
    date: "Published on July 12, 2025",
    excerpt:
      "Learn about common signs, symptoms, and how to detect brain tumors early with expert-backed medical advice.",
    url: "https://www.mayoclinic.org/diseases-conditions/brain-tumor/symptoms-causes/syc-20350084",
  },
  {
    img: "https://media.post.rvohealth.io/wp-content/uploads/2025/07/433770-The-Best-Anti-Aging-Serums-thumbnail_732x549.jpg",
    title: "The Best Anti-Aging Serums, According to Experts",
    date: "Published on July 10, 2025",
    excerpt:
      "Explore dermatologist-recommended serums that help fight wrinkles and fine lines, with proven ingredients and reviews.",
    url: "https://www.goodhousekeeping.com/beauty-products/g4083/best-anti-aging-serums/",
  },
  {
    img: "https://media.post.rvohealth.io/wp-content/uploads/2022/08/young-woman-in-skin-care-routine-in-bathroom-732x549-thumbnail.jpg",
    title: "The Best Skincare Routines for Healthy, Glowing Skin",
    date: "Published on August 20, 2022",
    excerpt:
      "Discover step-by-step skincare routines tailored for different skin types. Tips from top dermatologists included.",
    url: "https://www.eucerinus.com/skin-care-101/uneven-skin/dull-skin?utm_source_platform=GoogleAds&utm_source=google&utm_medium=cpc&utm_campaign=T03_000420&gad_source=1&gad_campaignid=22565298875&gbraid=0AAAAADjbY1VCRwlSoIqOmcHtaqhqdo0oi&gclid=Cj0KCQjwm93DBhD_ARIsADR_DjHdSXShDioHEB0ZYXdzjY4BATKItVsn7njOyt-mL-ulDKZHYcnTzIgaAuB8EALw_wcB",
  },
];

export default function BlogPage() {
  return (
    <main className="mt-[80px]"> {/* Adjust based on navbar height */}

      {/* HERO BANNER */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: `url('/blog1.webp')` }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
        
        <div className="relative z-10 px-4 max-w-4xl mx-auto text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Get Every Single Update Here</h1>
          <p className="text-sm md:text-lg text-gray-300">
            Discover valuable health insights and practical wellness tips through our expert-curated articles. Stay informed about the latest medical advancements and preventive care strategies.
          </p>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="container py-16">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="blog-post flex flex-col gap-4 p-4 border border-gray-200 rounded-lg shadow-sm"
            >
              <Image
                src={post.img}
                alt={post.title}
                width={1000}
                height={400}
                className="rounded-md object-cover h-[250px] w-full"
              />

              <div className="flex flex-col flex-grow gap-2">
                <p className="text-gray-500 text-sm">{post.date}</p>
                <h3 className="text-xl font-bold line-clamp-2 min-h-[3rem]">{post.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
              </div>

              <div className="mt-auto">
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  <button className="px-6 py-3 bg-[#207dff] text-white rounded-full font-semibold hover:bg-blue-700 transition">
                    Read more
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Optional View All button (hide if already on /blogs page) */}
        <div className="flex justify-center mt-10">
          <Link href="/">
            <button className="px-6 py-3 bg-[#207dff] text-white rounded-full font-semibold hover:bg-blue-700 transition">
              Back to Home
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
