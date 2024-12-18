import Header from '@components/Header';
import Hero from '@components/Hero';
import Features from '@components/Features';
import Testimonials from '@components/Testimonials';
import Footer from '@components/Footer';
import Chatbot from '@components/chatBot';


export default function Home() {
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="space-y-8">
        <Hero />
        <Features />
        <Testimonials />

        {/* Add the Chatbot component here */}
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}
