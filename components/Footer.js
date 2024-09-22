import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      id="footer"
      className="bg-green-600 py-12 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <p>© 2024 FPLMate. All rights reserved.</p>
        <div className="mt-4 space-x-6">
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300">Terms of Service</a>
        </div>
      </div>
    </motion.footer>
  );
}
