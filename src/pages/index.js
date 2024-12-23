import Navbar from "@/components/navabar";
import Typewriter from "typewriter-effect";

export default function Home() {
  const cards = [
    { title: "Personalized AI", description: "Get tailored advice just for you." },
    { title: "Chat with AI Doctor", description: "Talk to your AI doctor anytime." },
    { title: "General AI", description: "Explore general health tips." },
    { title: "Follow-Up Consultations", description: "Schedule follow-ups with ease." },
  ];
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-teal-300 via-green-200 to-green-400 relative text-white font-sans">
      <div>
        <Navbar />
      </div>
      {/* Starry Background */}
      <div className="absolute inset-0 bg-stars bg-cover bg-center opacity-50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-950">
          Hii! username, I am your AI Doctor.
          <br/>{" "}
         
          <span className="text-blue-500 text-5xl ">
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

        {/* <div className="flex items-center w-full max-w-lg pt-4">
          <input
            type="text"
            placeholder="How can I help you?."
            className="flex-grow py-3 px-4 bg-neutral-800 rounded-l-full focus:outline-none text-white"
          />
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-r-full hover:from-blue-600 hover:to-indigo-600 transition">
            Message →
          </button>
        </div> */}
        <br/>{" "}
        <br/>{" "}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 px-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-teal-100 rounded-lg shadow-lg p-6 text-center hover:bg-teal-200 transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">{card.title}</h2>
            <p className="text-gray-600 mt-2">{card.description}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

