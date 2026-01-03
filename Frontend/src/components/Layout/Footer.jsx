export default function Footer() {
  return (
    <footer className=" text-white py-6 mt-12">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
        <p className="text-gray-400 text-sm">
          Built with React, Tailwind CSS & MERN Stack
        </p>
      </div>
    </footer>
  );
}
