import Image from "next/image";
import Link from "next/link";

const blogPosts = [
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

export default function BlogSection() {
  return (
    <section className="container flex flex-col bg-gray-200 gap-12 py-16 md:py-20">
      <div className="flex text-center flex-col gap-4 items-center justify-center">
        <h2 className="font-bold text-3xl md:text-4xl">Get Every Single Updates Here</h2>
        <p className="text-gray-600 max-w-4xl">
          Discover valuable health insights and practical wellness tips through our expert-curated articles. 
          Stay informed about the latest medical advancements and preventive care strategies.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:container">
        {blogPosts.map((post, index) => (
          <div key={index} className="blog-post flex flex-col gap-4 p-4 border border-gray-200 rounded-lg">
            <Image src={post.img} alt={post.title} width={1000} height={400} className="rounded-md object-cover h-[200px] w-full" />
            
            <div className="flex flex-col flex-grow gap-2">
              <p className="text-gray-500 text-sm">{post.date}</p>
                            <a href={post.url} target="_blank" rel="noopener noreferrer" className="group">

              <h3 className="text-xl font-bold line-clamp-2 transition-all  border-transparent border-b pb-2 min-h-[3rem] hover:border-b  border-transparent group-hover:border-gray-600">{post.title}</h3>
                </a>
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

      <div className="flex items-center justify-center">
        <Link href="/blogs">
          <button className="px-6 py-3 mt-1 bg-[#207dff] text-white rounded-full font-semibold hover:bg-blue-700 transition">
            View All Blogs
          </button>
        </Link>
      </div>
    </section>
  );
}
