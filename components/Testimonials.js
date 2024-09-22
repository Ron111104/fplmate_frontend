export default function Testimonials() {
  const testimonials = [
    {
      quote: "FPLMate helped me climb the ranks with spot-on predictions!",
      name: "Alex Johnson",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDmiXZ989QmGlkQ4Mh83tGkfJ0bjEFgxGfvg&s", // Replace with actual image links
    },
    {
      quote: "The transfer recommendations were a game changer!",
      name: "Maria Lopez",
      image: "https://www.wef.org.in/wp-content/uploads/2019/06/maria.jpg", // Replace with actual image links
    },
    {
      quote: "Accurate predictions and a seamless experience.",
      name: "Michael Ramsay",
      image: "https://pbs.twimg.com/profile_images/934079836141899778/TogyXXUU_400x400.jpg", // Replace with actual image links
    },
  ];

  return (
    <section id="testimonials" className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Real Stories, Real Results</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-8 bg-white shadow-md rounded-lg">
              <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto" />
              <p className="italic mt-4">"{testimonial.quote}"</p>
              <h3 className="mt-4 font-bold">{`- ${testimonial.name}`}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
