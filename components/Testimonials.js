export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Real Stories, Real Results</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white shadow-md rounded-lg">
            <p>"FPLMate helped me climb the ranks with spot-on predictions!"</p>
            <h3 className="mt-4 font-bold">- Alex Johnson</h3>
          </div>
          <div className="p-8 bg-white shadow-md rounded-lg">
            <p>"The transfer recommendations were a game changer!"</p>
            <h3 className="mt-4 font-bold">- Maria Lopez</h3>
          </div>
          <div className="p-8 bg-white shadow-md rounded-lg">
            <p>"Accurate predictions and a seamless experience."</p>
            <h3 className="mt-4 font-bold">- James Oliver</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
