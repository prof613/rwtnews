import type { Metadata } from "next"
import Image from "next/image"
// import { fetchStaffMembers } from "@/lib/strapi" // Assuming a function to fetch staff
// import type { StaffMemberEntity } from "@/types" // Assuming a type for staff members

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Red, White and True News, our mission, and our team.",
}

// Dummy staff data for now - replace with actual data fetching
const dummyStaff = [
  {
    id: 1,
    attributes: {
      name: "John Doe",
      bio: "John is the founder and editor-in-chief, dedicated to bringing truthful news.",
      thumbnail_url: "/images/staff/authors/placeholder-author.jpg", // Placeholder
      social_links: { twitter: "#", email: "mailto:john@example.com" },
      slug: "john-doe", // For individual bio pages if implemented
    },
  },
  {
    id: 2,
    attributes: {
      name: "Jane Smith",
      bio: "Jane is a senior reporter covering national politics with a keen eye for detail.",
      thumbnail_url: "/images/staff/authors/placeholder-author.jpg", // Placeholder
      social_links: { linkedin: "#" },
      slug: "jane-smith",
    },
  },
]

// This would be your actual data fetching component part
// async function StaffSection() {
//   const staffMembers = await fetchStaffMembers();
//   if (!staffMembers || staffMembers.length === 0) {
//     return <p>Our team information is currently being updated.</p>;
//   }
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//       {staffMembers.map((staff: StaffMemberEntity) => (
//         <div key={staff.id} className="text-center p-4 border rounded-lg shadow-sm bg-gray-50">
//           <Link href={`/staff/${staff.attributes.slug || staff.id}`}>
//             <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-rwt-red">
//               <Image
//                 src={staff.attributes.thumbnail_url || "/images/staff/authors/placeholder-author.jpg"}
//                 alt={staff.attributes.name}
//                 layout="fill"
//                 objectFit="cover"
//               />
//             </div>
//             <h3 className="text-xl font-semibold text-rwt-blue hover:text-rwt-red">{staff.attributes.name}</h3>
//           </Link>
//           <p className="text-sm text-gray-600 mt-1 line-clamp-3">{staff.attributes.bio_summary || staff.attributes.bio.substring(0,100)}...</p>
//           <div className="mt-3 flex justify-center space-x-3">
//             {/* Add social icons here based on staff.attributes.social_links */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

export default function AboutPage() {
  return (
    <div className="py-8 px-4 md:px-0">
      <h1 className="text-4xl font-bold text-rwt-blue text-center mb-8">About Red, White and True News</h1>

      <section className="mb-12 prose prose-lg max-w-4xl mx-auto text-justify">
        <h2 className="text-2xl font-semibold text-rwt-blue mb-4">Our Story</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <p>
          Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur aliquet quam id dui posuere
          blandit. Nulla quis lorem ut libero malesuada feugiat. Pellentesque in ipsum id orci porta dapibus.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-rwt-blue text-center mb-8">Meet Our Team</h2>
        {/* <Suspense fallback={<p>Loading team...</p>}>
          <StaffSection />
        </Suspense> */}
        {/* Using dummy data for now as per instructions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {dummyStaff.map((staff) => (
            <div key={staff.id} className="text-center p-4 border rounded-lg shadow-sm bg-gray-50">
              {/* Link to individual bio page (e.g., /staff/[slug]) - to be created if needed */}
              {/* <Link href={`/staff/${staff.attributes.slug || staff.id}`}> */}
              <div>
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-rwt-red">
                  <Image
                    src={staff.attributes.thumbnail_url || "/placeholder.svg"}
                    alt={staff.attributes.name}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-rwt-blue">{staff.attributes.name}</h3>
              </div>
              {/* </Link> */}
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">{staff.attributes.bio}</p>
              <div className="mt-3 flex justify-center space-x-3">
                {staff.attributes.social_links?.twitter && (
                  <a
                    href={staff.attributes.social_links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-rwt-blue"
                  >
                    {/* <Twitter size={20} />  Replace with Lucide icon */}
                    Twitter
                  </a>
                )}
                {staff.attributes.social_links?.email && (
                  <a href={staff.attributes.social_links.email} className="text-gray-500 hover:text-rwt-blue">
                    {/* <Mail size={20} /> Replace with Lucide icon */}
                    Email
                  </a>
                )}
                {/* Add other social links similarly */}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-gray-700">
          Full staff bios and individual author archives will be available soon.
        </p>
      </section>

      <section className="prose prose-lg max-w-4xl mx-auto text-justify">
        <h2 className="text-2xl font-semibold text-rwt-blue mb-4">Our Values</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus. Curabitur arcu erat,
          accumsan id imperdiet et, porttitor at sem. Donec sollicitudin molestie malesuada.
        </p>
        <ul>
          <li>Truth and Accuracy</li>
          <li>Patriotism and American Values</li>
          <li>Integrity and Transparency</li>
          <li>Respectful Discourse</li>
        </ul>
      </section>
    </div>
  )
}
