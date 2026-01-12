export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12 shadow-inner">
      <div className="max-w-6xl mx-auto text-center space-y-2">
        <p className="text-lg font-medium animate-fadeIn">
          &copy; {new Date().getFullYear()} MyBlog. All rights reserved.
        </p>
        <p className="text-gray-400 text-sm animate-fadeIn delay-200">
          Built with{" "}
          <span className="text-green-400 font-semibold">React</span>,{" "}
          <span className="text-blue-400 font-semibold">Tailwind CSS</span> &{" "}
          <span className="text-yellow-400 font-semibold">MERN Stack</span>
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
