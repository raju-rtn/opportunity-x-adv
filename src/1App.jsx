import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Building2, 
  FileCheck, 
  Bookmark, 
  CreditCard, 
  HelpCircle, 
  BookOpen, 
  Settings, 
  LogOut, 
  Search, 
  BarChart3, 
  FileSearch,
  ChevronRight,
  User,
  Lock,
  Mail,
  Filter,
  Download,
  Eye,
  Trash2,
  Plus,
  X,
  Globe,
  MapPin,
  Briefcase
} from 'lucide-react';

// --- Components ---

const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-gradient-to-r from-[#d91d81] to-[#8a2be2] text-white hover:opacity-90 shadow-sm",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    ghost: "text-gray-600 hover:bg-gray-100",
    danger: "text-red-500 hover:bg-red-50"
  };
  
  return (
    <button 
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ title, value, icon: Icon, color = "text-[#d91d81]" }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-32 relative group hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      {Icon && <Icon className="text-gray-400 w-5 h-5" />}
    </div>
    <div className={`${color} text-3xl font-bold`}>{value}</div>
  </div>
);

const SidebarItem = ({ icon: Icon, label, active, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
      active 
        ? "bg-gradient-to-r from-[#d91d81] to-[#8a2be2] text-white shadow-md" 
        : danger 
          ? "text-red-500 hover:bg-red-50" 
          : "text-gray-500 hover:bg-gray-50"
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? "text-white" : danger ? "text-red-500" : "text-gray-400 group-hover:text-[#8a2be2]"}`} />
    <span className="font-medium">{label}</span>
  </button>
);

// --- Modal Component ---

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- View: Dashboard ---

const DashboardView = ({ stats }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Total Tenders" value="0" icon={Search} />
      <Card title="Analyzed Tenders" value="0" icon={BarChart3} />
      <Card title="Eligible Tenders" value="0" icon={FileText} />
      <Card title="Total Generated Documents" value="0" icon={FileText} />
      <Card title="Total Companies" value={stats.companyCount} icon={Building2} />
      <Card title="Total Bookmarked Tenders" value="0" icon={Bookmark} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 min-h-[400px] flex flex-col">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Tender Status Overview</h2>
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
          <div className="mb-4">
            <BarChart3 className="w-16 h-16 opacity-20" />
          </div>
          <p className="text-sm font-medium">No data available to display</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Usage Summary</h2>
        <div className="space-y-6 flex-1">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-50 rounded-lg"><FileText className="w-5 h-5 text-[#8a2be2]" /></div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Free Analysis Remaining</p>
              <p className="text-xl font-bold text-[#d91d81]">0</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-50 rounded-lg"><FileSearch className="w-5 h-5 text-[#8a2be2]" /></div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Paid Analysis Remaining</p>
              <p className="text-xl font-bold text-[#d91d81]">0</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-50 rounded-lg"><Building2 className="w-5 h-5 text-blue-500" /></div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Tenders Remaining</p>
              <p className="text-xl font-bold text-[#d91d81]">0</p>
            </div>
          </div>
        </div>
        <Button className="w-full py-3 mt-8">Manage Subscription</Button>
      </div>
    </div>
  </div>
);

// --- View: My Companies ---

const MyCompaniesView = ({ companies, onAddCompany }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    website: '',
    location: '',
    registrationNo: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCompany({ ...formData, id: Date.now() });
    setIsModalOpen(false);
    setFormData({ name: '', industry: '', website: '', location: '', registrationNo: '', description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Companies</h1>
          <p className="text-gray-500 text-sm">Manage the company profiles used for tender analysis</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="px-6">
          <Plus className="w-5 h-5" /> New Company
        </Button>
      </div>

      {companies.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">No Companies Found</h3>
          <p className="text-gray-500 text-sm max-w-xs mb-6">
            You haven't added any company profiles yet. Add one to start processing tenders.
          </p>
          <Button variant="outline" onClick={() => setIsModalOpen(true)}>
            Add Your First Company
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map(company => (
            <div key={company.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#8a2be2]" />
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{company.name}</h3>
              <p className="text-xs font-semibold text-[#d91d81] uppercase tracking-wider mb-4">{company.industry}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" /> {company.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Globe className="w-4 h-4" /> {company.website}
                </div>
              </div>

              <Button variant="outline" className="w-full text-sm">View Details</Button>
            </div>
          ))}
        </div>
        
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Company">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Company Name *</label>
              <input 
                required 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#8a2be2]/20" 
                placeholder="e.g. Acme Corporation"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Industry Type *</label>
              <select 
                required 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none bg-white"
                value={formData.industry}
                onChange={e => setFormData({...formData, industry: e.target.value})}
              >
                <option value="">Select Industry</option>
                <option value="Construction">Construction</option>
                <option value="IT Services">IT Services</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Registration Number</label>
              <input 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none" 
                placeholder="e.g. REG-12345"
                value={formData.registrationNo}
                onChange={e => setFormData({...formData, registrationNo: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Website URL</label>
              <input 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none" 
                placeholder="https://example.com"
                value={formData.website}
                onChange={e => setFormData({...formData, website: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">HQ Location</label>
              <input 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none" 
                placeholder="City, Country"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Company Description</label>
              <textarea 
                rows="4" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none resize-none" 
                placeholder="Briefly describe what your company does..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="flex-1">Create Company Profile</Button>
          </div>
        </form>
      </Modal>
    </div>
    
    

  );
};

// --- View: All Tenders --- (Keeping existing view)

const AllTendersView = () => {
  const tenders = [
    { id: 'T-102', title: 'Smart City Infrastructure Project', category: 'Construction', status: 'Open', date: '2023-10-25', location: 'Dubai, UAE' },
    { id: 'T-105', title: 'Solar Panel Maintenance Services', category: 'Energy', status: 'Open', date: '2023-11-02', location: 'Abu Dhabi, UAE' },
    { id: 'T-109', title: 'Cybersecurity Audit for Govt Dept', category: 'IT Services', status: 'Closed', date: '2023-09-15', location: 'Riyadh, KSA' },
    { id: 'T-112', title: 'Educational Equipment Supply', category: 'Education', status: 'Open', date: '2023-11-10', location: 'Doha, Qatar' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Tenders</h1>
          <p className="text-gray-500 text-sm">Browse and manage available tender opportunities</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline"><Filter className="w-4 h-4" /> Filters</Button>
          <Button variant="outline"><Download className="w-4 h-4" /> Export</Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search tenders..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none" />
          </div>
          <div className="text-sm text-gray-500 font-medium">Showing {tenders.length} Tenders</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Tender ID</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Closing Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tenders.map((tender) => (
                <tr key={tender.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs font-bold">{tender.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 text-sm">{tender.title}</div>
                    <div className="text-xs text-gray-400">{tender.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${tender.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{tender.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{tender.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-[#8a2be2] rounded-lg"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-[#d91d81] rounded-lg"><Bookmark className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Auth Views ---

const LoginPage = ({ onLogin, onToggle }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black italic text-gray-900 tracking-tighter">QistonPe</h1>
        <p className="text-gray-500 mt-2">Sign in to manage your tenders</p>
      </div>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input type="email" required className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8a2be2] outline-none" placeholder="john@example.com" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input type="password" required className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8a2be2] outline-none" placeholder="••••••••" />
          </div>
        </div>
        <Button className="w-full py-3 mt-4">Sign In</Button>
      </form>
      <p className="text-center mt-6 text-sm text-gray-600">
        Don't have an account? <button onClick={onToggle} className="text-[#d91d81] font-bold hover:underline">Register</button>
      </p>
    </div>
  </div>
);

const RegisterPage = ({ onRegister, onToggle }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black italic text-gray-900 tracking-tighter">QistonPe</h1>
        <p className="text-gray-500 mt-2">Create your free account</p>
      </div>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onRegister(); }}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input type="text" required className="w-full px-4 py-2 border rounded-lg outline-none" placeholder="John" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input type="text" required className="w-full px-4 py-2 border rounded-lg outline-none" placeholder="Doe" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" required className="w-full px-4 py-2 border rounded-lg outline-none" placeholder="john@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" required className="w-full px-4 py-2 border rounded-lg outline-none" placeholder="••••••••" />
        </div>
        <Button className="w-full py-3 mt-4">Create Account</Button>
      </form>
      <p className="text-center mt-6 text-sm text-gray-600">
        Already have an account? <button onClick={onToggle} className="text-[#d91d81] font-bold hover:underline">Sign In</button>
      </p>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authView, setAuthView] = useState('login'); 
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [companies, setCompanies] = useState([]);

  const addCompany = (newCompany) => {
    setCompanies([...companies, newCompany]);
  };

  if (!isLoggedIn) {
    return authView === 'login' ? (
      <LoginPage onLogin={() => setIsLoggedIn(true)} onToggle={() => setAuthView('register')} />
    ) : (
      <RegisterPage onRegister={() => setIsLoggedIn(true)} onToggle={() => setAuthView('login')} />
    );
  }

  return (
    <div className="flex h-screen bg-[#fcfcfd] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-4 shrink-0 overflow-y-auto">
        <div className="mb-8 px-4 pt-2">
          <h1 className="text-3xl font-black italic text-gray-900 tracking-tighter">QistonPe</h1>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
          <SidebarItem icon={FileSearch} label="All Tenders" active={activeTab === 'All Tenders'} onClick={() => setActiveTab('All Tenders')} />
          <SidebarItem icon={Building2} label="My Companies" active={activeTab === 'My Companies'} onClick={() => setActiveTab('My Companies')} />
          <SidebarItem icon={FileCheck} label="Processed Tenders" active={activeTab === 'Processed Tenders'} onClick={() => setActiveTab('Processed Tenders')} />
          <SidebarItem icon={Bookmark} label="Bookmarks" active={activeTab === 'Bookmarks'} onClick={() => setActiveTab('Bookmarks')} />
          <SidebarItem icon={CreditCard} label="Plans" active={activeTab === 'Plans'} onClick={() => setActiveTab('Plans')} />
          <SidebarItem icon={HelpCircle} label="Help" active={activeTab === 'Help'} onClick={() => setActiveTab('Help')} />
          <SidebarItem icon={BookOpen} label="User Manual" active={activeTab === 'User Manual'} onClick={() => setActiveTab('User Manual')} />
          <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
        </nav>

        <div className="pt-4 mt-4 border-t border-gray-100">
          <SidebarItem icon={LogOut} label="Logout" danger onClick={() => setIsLoggedIn(false)} />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-gray-50/30">
        <header className="h-16 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="font-bold text-gray-800">{activeTab}</div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600"><Search className="w-5 h-5" /></button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8a2be2] to-[#d91d81] flex items-center justify-center text-white text-xs font-bold">JD</div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {activeTab === 'Dashboard' && <DashboardView stats={{ companyCount: companies.length }} />}
          {activeTab === 'All Tenders' && <AllTendersView />}
          {activeTab === 'My Companies' && <MyCompaniesView companies={companies} onAddCompany={addCompany} />}
          
          {!['Dashboard', 'All Tenders', 'My Companies'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400 bg-white rounded-2xl border border-gray-100">
              <FileSearch className="w-16 h-16 opacity-10 mb-4" />
              <p className="text-lg font-medium">The {activeTab} view is coming soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}