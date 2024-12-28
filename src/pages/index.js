import Navbar from "@/components/navabar";
import Typewriter from "typewriter-effect";
import { parseCookies } from "nookies";

export default function Home({ username }) {
  const cards = [
    {
      title: "Personalized AI",
      description: "Get tailored advice just for you.",
    },
    {
      title: "Chat with AI Doctor",
      description: "Talk to your AI doctor anytime.",
    },
    { title: "General AI", description: "Explore general health tips." },
    {
      title: "Follow-Up Consultations",
      description: "Schedule follow-ups with ease.",
    },
  ];

  return (
    <div className="h-screen w-screen relative text-white font-sans">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
      radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(0, 0, 0, 0.9) 100%),
      url('transforming_healthcare_with_ai9ioi87Snj7ZgNpbaUo3q30s91a6yUj2wqpaIUDPw.webp')
    `,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <div>
          <Navbar />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-950">
          Hi {username}, I am your AI Doctor.
          <br />{" "}
          <span className="text-green-700 text-4xl">
            <Typewriter
              options={{
                strings: [
                  "Transforming healthcare with AI.",
                  "Your virtual doctor, always ready.",
                  "Empowering healthcare with intelligence.",
                  "AI-driven diagnostics for better care.",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 20,
                delay: 50,
              }}
            />
          </span>
        </h1>
        <div className="absolute inset-x-0 bottom-12 flex justify-center px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-16">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-cyan-50 rounded-lg shadow-lg p-6 text-center hover:bg-cyan-100 transition"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {card.title}
                </h2>
                <p className="text-gray-600 mt-2">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const username = cookies.username || "Guest";
  return {
    props: { username },
  };
}
