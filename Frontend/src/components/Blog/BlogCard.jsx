import { Link } from "react-router-dom";

export default function BlogCard({ blog, user, onDelete, onLike }) {
  const isOwner = user?.id === blog.author?._id;

  return (
    <div
      className="group bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 
                 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-2 
                 transition-all duration-500 ease-out hover:border-blue-500 
                 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 
                      opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

  
      <div className="relative mb-4">
        <h2 className="text-2xl font-bold text-gray-100 group-hover:text-blue-400 
                       transition-colors duration-300 leading-tight">
          {blog.title}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          By{" "}
          <span className="font-semibold text-blue-400">
            {blog.author?.username || "Unknown"}
          </span>
          {blog.createdAt && (
            <span className="ml-2 text-gray-500">
              • {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          )}
        </p>
      </div>

    
      <p className="relative text-gray-300 leading-relaxed mb-5 line-clamp-3">
        {blog.content.slice(0, 150)}...
      </p>

      
      <Link
        to={`/blog/${blog._id}`}
        className="relative inline-flex items-center gap-2 text-blue-400 font-semibold text-sm 
                   hover:text-blue-300 transition-colors duration-300 
                   after:absolute after:left-0 after:-bottom-1 
                   after:h-[2px] after:w-0 after:bg-blue-400 
                   after:transition-all after:duration-300 
                   hover:after:w-full"
      >
        Read more
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>

  
      <div className="relative my-5 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

    
      <div className="relative flex justify-between items-center">
        <div className="flex gap-6">
      
          <button
            onClick={() => onLike(blog._id)}
            className="flex items-center gap-2 text-red-400 hover:text-red-500 
                       hover:scale-110 transition-all duration-200 group/like"
          >
            <svg
              className="w-5 h-5 fill-current group-hover/like:animate-pulse"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                       2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 
                       3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 
                       3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span className="text-sm font-medium">{blog.likes?.length || 0}</span>
          </button>

          <Link
            to={`/blog/${blog._id}`}
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 
                       transition-colors duration-200 group/comment"
          >
            <svg
              className="w-5 h-5 fill-current group-hover/comment:animate-pulse"
              viewBox="0 0 24 24"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 
                       2 0 012 2z"/>
            </svg>
            <span className="text-sm font-medium">{blog.comments?.length || 0}</span>
          </Link>
        </div>

        {isOwner && (
          <div className="flex gap-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              to={`/edit-blog/${blog._id}`}
              className="flex items-center gap-1 text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 
                         002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 
                         2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Link>
            <button
              onClick={() => onDelete(blog._id)}
              className="flex items-center gap-1 text-red-400 hover:text-red-300 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M19 7l-.867 12.142A2 2 0 
                         0116.138 21H7.862a2 2 0 
                         01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 
                         1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}