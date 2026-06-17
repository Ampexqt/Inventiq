import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, PackageSearch, ReceiptText, Menu, X } from 'lucide-react';
import { Toaster } from 'sonner';

const MainLayout: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Products', path: '/products', icon: <PackageSearch className="w-4 h-4" /> },
    { name: 'Point of Sale', path: '/pos', icon: <ShoppingBag className="w-4 h-4" /> },
    { name: 'Sales Transactions', path: '/sales', icon: <ReceiptText className="w-4 h-4" /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-white flex flex-col border-r border-slate-200 transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-6 flex items-center gap-1">
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <img src="/Inventiq-no-backrgound.png" alt="Inventiq Logo" className="w-full h-full object-contain scale-[2.5]" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Inventiq<span className="text-primary">POS</span>
          </h1>
          <button 
            className="md:hidden ml-auto p-1 text-slate-400 hover:bg-slate-100 rounded-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-md font-medium transition-colors text-sm ${
                  isActive 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Minimalist Store Status Block */}
        <div className="px-6 pb-6 mt-auto">
          <p className="text-sm font-medium text-slate-700">Store: Downtown Branch</p>
          <p className="text-xs text-slate-500 mt-1">Open &middot; 9:00 AM – 9:00 PM</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Toaster 
          position="top-center" 
          toastOptions={{
            classNames: {
              toast: 'bg-white border border-slate-200 shadow-lg rounded-xl flex items-center gap-3 px-4 py-3 font-sans w-full',
              title: 'text-slate-800 font-semibold text-sm',
              icon: 'text-primary w-5 h-5',
              success: 'border-l-4 border-l-primary',
              error: 'border-l-4 border-l-rose-500 text-rose-600',
            }
          }} 
        />
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between md:justify-end px-4 md:px-8 shrink-0">
          <button 
            className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-md"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center">
            <div className="flex items-center gap-3 bg-slate-100/80 px-4 py-2 rounded-full border border-slate-200 shadow-sm text-sm">
              <span className="font-medium text-slate-600">
                {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
              <div className="h-4 w-px bg-slate-300"></div>
              <span className="font-bold text-slate-900 tracking-tight min-w-[85px] text-center">
                {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
