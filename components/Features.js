export default function Features() {
  const features = [
    {
      title: 'Weekly Predictions',
      description: 'AI-based gameweek predictions using player form and injury status.',
      icon: '📊',
    },
    {
      title: 'Transfer Recommendations',
      description: 'Personalized suggestions for optimal transfers.',
      icon: '🔄',
    },
    {
      title: 'Injury and Availability Tracker',
      description: 'Stay updated with real-time injury reports.',
      icon: '🚑',
    },
    {
      title: 'Historical Analysis',
      description: 'Analyze player and team performance trends.',
      icon: '📈',
    },
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Empower Your Game with Cutting-Edge Features</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-8 bg-white shadow-md rounded-lg">
              <span className="text-4xl">{feature.icon}</span>
              <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
