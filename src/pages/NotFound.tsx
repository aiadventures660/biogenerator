import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import Footer from "@/components/ui/footer";
import { AlertTriangle, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useDarkMode } from "@/contexts/DarkModeContext";

const NotFound = () => {
  const location = useLocation();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-gray-50/30 to-blue-50/30'}`}>
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <AlertTriangle className="h-20 w-20 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Page Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors font-medium"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            
            <div className="text-sm text-gray-500">
              If you believe this is an error, please contact support.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
