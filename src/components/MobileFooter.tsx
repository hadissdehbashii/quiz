import { Home, Plus, History } from 'lucide-react'
import { Link } from 'react-router'

const MobileFooter = () => {
  const isActive = (path:string)=>location.pathname===path;
  return (
    <div className='md:hidden'>
        <nav className='fixed bottom-0 left-0 right-0 bg-gray-100 flex justify-between items-center px-10 py-6 gap-3'>
           <Link to="/dashboard" className={`flex items-center gap-1 transition-all ${isActive('/dashboard')?'text-purple-700 font-semibold':'text-gray-600'}`} >
             <Home/>
             {isActive('/dashboard')&&<span className='text-sm'>Home</span>}
           </Link>
           <Link
              to="/quiz/new"
              className={`
                absolute  left-1/2 -translate-x-1/2
                text-white border-4 border-purple-300 rounded-full 
                flex items-center justify-center shadow-lg 
                transition-transform duration-800
                ${isActive("/quiz/new") ? "bg-purple-700 scale-125 -top-2" : "bg-purple-700"}
              `}
              style={{ width: "56px", height: "56px" }}
            >
              <Plus className="w-6 h-6" />
            </Link>
           <Link to="/dashboard" className={`flex items-center gap-1 transition-all ${isActive('/history')?'text-purple-700 font-semibold':'text-gray-600'} `}>
             <History/>
             {isActive('/history')&& <span className='text-sm'>History</span>}
           </Link>



        </nav>
    </div>
  )
}

export default MobileFooter