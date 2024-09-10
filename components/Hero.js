export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white">
      <div className="max-w-7xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-extrabold">
          Unlock Your Fantasy Football Potential
        </h1>
        <p className="mt-4 text-lg">
          AI-driven insights and data-centric recommendations to dominate your Fantasy Premier League!
        </p>
        <div className="mt-8">
          <a
            href="#"
            className="bg-white text-green-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200"
          >
            Get Started Free
          </a>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        {/* <img
          src="/hero.png" // Replace with your image path
          alt="Fantasy Football"
          className="w-full max-w-lg rounded-lg shadow-lg"
        /> */}
      </div>
    </section>
  );
}
