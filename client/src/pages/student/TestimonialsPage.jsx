import React from "react";

const testimonials = [
  {
    name: "Donald Jackman",
    title: "Intern @Amazon",
    rating: 4,
    text: "Imagify has been a game changer for me. It's simple, fast, and perfect for my workflow.",
    profileSrc: "https://randomuser.me/api/portraits/men/32.jpg",
    link: "#",
  },
  {
    name: "Richard Nelson",
    title: "SWE 1 @Samsung",
    rating: 5,
    text: "Using Imagify for over a year, and I love how easy it is to use. Definitely recommend it!",
    profileSrc: "https://randomuser.me/api/portraits/men/44.jpg",
    link: "#",
  },
  {
    name: "James Washington",
    title: "SWE 2 @Google",
    rating: 4,
    text: "The experience has been smooth. The UI is polished and makes my work much easier.",
    profileSrc: "https://randomuser.me/api/portraits/men/76.jpg",
    link: "#",
  },
  {
    name: "Sophia Miller",
    title: "Frontend Dev @Microsoft",
    rating: 4.5,
    text: "One of the most user-friendly platforms I've worked with. Highly recommend to others.",
    profileSrc: "https://randomuser.me/api/portraits/women/45.jpg",
    link: "#",
  },
];

const Star = ({ filled }) => (
  <svg
    className={`h-5 w-5 ${filled ? "text-yellow-400" : "text-gray-500"}`}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={filled ? 0 : 2}
      d="M12 17.75l-6.172 3.53 1.179-6.873L2 9.47l6.908-1.004L12 2.25l3.092 6.216L22 9.47l-5.007 4.937 1.179 6.873z"
    />
  </svg>
);

function TestimonialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center py-16 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
        What People Say
      </h2>
      <p className="text-gray-300 mb-12 text-center max-w-2xl">
        Real stories from developers and professionals who use our platform to
        make their work easier, smarter, and faster.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl w-full">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-gray-800 hover:bg-gray-750 border border-gray-800 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.04] transition-all duration-300 p-6 flex flex-col items-center text-center"
          >
            <img
              src={t.profileSrc}
              alt={t.name}
              className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-gray-700 shadow-md"
            />
            <h3 className="text-white font-semibold text-lg">{t.name}</h3>
            <p className="text-gray-400 text-sm">{t.title}</p>
            <div className="flex mt-3 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} filled={i < t.rating} />
              ))}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {t.text}
            </p>
            <a
              href={t.link}
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialPage;
