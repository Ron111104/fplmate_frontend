import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Features() {
  const features = [
    {
      title: 'Weekly Predictions',
      description: 'AI-based gameweek predictions using player form and injury status.',
      image: 'https://images.news18.com/ibnlive/uploads/2024/07/fpl-2024-07-fb4f3a210d7a30bc6a8561aee8f4c885.jpg',
      link: '/weekly-predictions',
    },
    {
      title: 'Transfer Recommendations',
      description: 'Personalized suggestions for optimal transfers.',
      image: 'https://pbs.twimg.com/media/GKPdrL-XQAAG3F9.jpg',
      link: '/recomender',
    },
    {
      title: 'Injury Tracker',
      description: 'Stay updated with real-time injury reports.',
      image: 'https://i.eurosport.com/2023/08/14/3762962-76549168-2560-1440.jpg',
      link: '/injury-tracker',
    },
    {
      title: 'Historical Analysis',
      description: 'Analyze player and team performance trends.',
      image: 'https://resources.platform.pulselive.com/premierleague/photo/2016/06/08/dc8bf535-caf9-476a-ac93-378004a334ba/GettyImages-168611936.jpg',
      link: '/historical-analysis',
    },
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-extrabold tracking-tight text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Empower Your Game with Cutting-Edge Features
        </motion.h2>
        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {features.map((feature) => {
            const CardContent = (
              <motion.div
                className="p-8 bg-white shadow-xl rounded-lg transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between h-full"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="mt-2 text-2xl font-semibold text-gray-800">{feature.title}</h3>
                <p className="mt-4 text-gray-600">{feature.description}</p>
              </motion.div>
            );

            return feature.link ? (
              <Link key={feature.title} href={feature.link}>
                {CardContent}
              </Link>
            ) : (
              <div key={feature.title}>{CardContent}</div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
