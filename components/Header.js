export default function Header() {
    return (
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-600">FPLMate</h1>
          <nav className="space-x-4">
            <a href="#features" className="text-gray-600 hover:text-green-600">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-green-600">Testimonials</a>
            <a href="#footer" className="text-gray-600 hover:text-green-600">Contact</a>
          </nav>
          <a
            href="#"
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500"
          >
            Get Started
          </a>
        </div>
      </header>
    );
  }
  