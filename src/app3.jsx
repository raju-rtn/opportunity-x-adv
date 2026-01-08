import React, { useState, useRef, useEffect } from 'react';
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
  Briefcase,
  ChevronLeft,
  FolderPlus,
  Upload,
  ShieldCheck,
  TrendingUp,
  Award,
  Info,
  ChevronDown,
  ChevronUp,
  Save,
  CheckCircle2,
  HardDrive,
  Link as LinkIcon,
  Cloud,
  FileCode
} from 'lucide-react';

// --- Shared UI Components ---

const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-gradient-to-r from-[#d91d81] to-[#8a2be2] text-white hover:opacity-90 shadow-sm",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    ghost: "text-gray-600 hover:bg-gray-100",
    danger: "text-red-500 hover:bg-red-50",
    success: "bg-green-500 text-white hover:bg-green-600 shadow-sm"
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

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
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

// --- View: Company Details (Restored with Native Upload) ---

const CompanyDetailsView = ({ company, onBack, onSave }) => {
  const [activeSubTab, setActiveSubTab] = useState('profile'); 
  const [formData, setFormData] = useState({ ...company });
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [expandedSection, setExpandedSection] = useState('Registration & Identity');
  
  const [uploadedDocs, setUploadedDocs] = useState(company.documents || {}); 
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [activeDocItem, setActiveDocItem] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleProfileSave = (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onSave({ ...formData, documents: uploadedDocs });
      setIsSaving(false);
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 3000);
    }, 800);
  };

  const handleDocumentClick = (item) => {
    setActiveDocItem(item);
    setIsUploadModalOpen(true);
  };

  const handleViewDocument = (item) => {
    setActiveDocItem(item);
    setIsPreviewModalOpen(true);
  };

  const handlePCFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file || !activeDocItem) return;

    const newDoc = {
      name: activeDocItem.name,
      source: "Local PC",
      uploadDate: new Date().toLocaleDateString(),
      fileName: file.name,
      fileSize: (file.size / 1024 / 1024).toFixed(2) + " MB"
    };

    setUploadedDocs(prev => ({
      ...prev,
      [activeDocItem.name]: newDoc
    }));
    
    setIsUploadModalOpen(false);
    e.target.value = ''; // Reset
  };

  const simulateCloudUpload = (source) => {
    if (!activeDocItem) return;
    const newDoc = {
      name: activeDocItem.name,
      source: source,
      uploadDate: new Date().toLocaleDateString(),
      fileName: `${activeDocItem.name.replace(/\s+/g, '_').toLowerCase()}_v1.pdf`,
      fileSize: "N/A"
    };
    setUploadedDocs(prev => ({ ...prev, [activeDocItem.name]: newDoc }));
    setIsUploadModalOpen(false);
  };

  const docSections = [
    {
      title: "Registration & Identity",
      icon: ShieldCheck,
      items: [
        { name: "Company Incorporation Certificate", desc: "Certificate of Incorporation from MCA" },
        { name: "PAN Card", desc: "Company PAN issued by Income Tax Dept." },
        { name: "GST Registration Certificate", desc: "GSTIN registration document" },
        { name: "MSME/Udyam Certificate", desc: "If registered as MSME" }
      ]
    },
    {
      title: "Financial Documents",
      icon: TrendingUp,
      items: [
        { name: "ITR (Last 3 Years)", desc: "Income Tax Returns with acknowledgement" },
        { name: "Audited Balance Sheets", desc: "CA certified financial statements" },
        { name: "Turnover Certificate", desc: "CA certified annual turnover" },
        { name: "Bank Statements", desc: "Last 6-12 months bank statements" }
      ]
    },
    {
        title: "Work Experience",
        icon: Briefcase,
        items: [
          { name: "Purchase Orders / Work Orders", desc: "Previous POs from clients" },
          { name: "Client Completion Certificates", desc: "Project completion/satisfaction letters" }
        ]
      }
  ];

  return (
    <div className="space-y-6 relative">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={handlePCFileSelect}
      />

      {showSaveToast && (
        <div className="fixed top-20 right-8 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold">Company profile updated!</span>
          </div>
        </div>
      )}

      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title={`Upload: ${activeDocItem?.name}`}>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => fileInputRef.current.click()} className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-2xl hover:border-[#8a2be2] hover:bg-purple-50/30 transition-all group">
            <div className="p-4 rounded-full mb-3 bg-blue-50 group-hover:scale-110 transition-transform"><HardDrive className="w-8 h-8 text-blue-500" /></div>
            <span className="font-bold text-gray-700">My Computer</span>
            <span className="text-[10px] text-gray-400 uppercase mt-1">Local PC files</span>
          </button>
          <button onClick={() => simulateCloudUpload("Web Link")} className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-2xl hover:border-[#8a2be2] hover:bg-purple-50/30 transition-all group">
            <div className="p-4 rounded-full mb-3 bg-green-50 group-hover:scale-110 transition-transform"><LinkIcon className="w-8 h-8 text-green-500" /></div>
            <span className="font-bold text-gray-700">Web Link</span>
            <span className="text-[10px] text-gray-400 uppercase mt-1">Paste URL</span>
          </button>
          <button onClick={() => simulateCloudUpload("Google Drive")} className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-2xl hover:border-[#8a2be2] hover:bg-purple-50/30 transition-all group">
            <div className="p-4 rounded-full mb-3 bg-orange-50 group-hover:scale-110 transition-transform"><Cloud className="w-8 h-8 text-orange-500" /></div>
            <span className="font-bold text-gray-700">Google Drive</span>
            <span className="text-[10px] text-gray-400 uppercase mt-1">Cloud Access</span>
          </button>
          <button onClick={() => simulateCloudUpload("Dropbox")} className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-2xl hover:border-[#8a2be2] hover:bg-purple-50/30 transition-all group">
            <div className="p-4 rounded-full mb-3 bg-blue-600/10 group-hover:scale-110 transition-transform"><FolderPlus className="w-8 h-8 text-blue-600" /></div>
            <span className="font-bold text-gray-700">Dropbox</span>
            <span className="text-[10px] text-gray-400 uppercase mt-1">Shared Files</span>
          </button>
        </div>
      </Modal>

      <Modal isOpen={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)} title="Document Preview">
        {activeDocItem && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl aspect-[4/3] flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
              <FileCode className="w-16 h-16 text-[#8a2be2] mb-4" />
              <p className="font-bold text-gray-800">{uploadedDocs[activeDocItem.name]?.fileName}</p>
              <p className="text-xs text-gray-400">{uploadedDocs[activeDocItem.name]?.fileSize}</p>
              <div className="mt-8 px-4 py-2 bg-purple-100 text-[#8a2be2] text-[10px] font-bold rounded-lg uppercase">System Preview: Full Access</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Metadata</p>
                <h4 className="font-bold text-gray-800">{activeDocItem.name}</h4>
                <p className="text-xs text-gray-500">Source: {uploadedDocs[activeDocItem.name]?.source} • {uploadedDocs[activeDocItem.name]?.uploadDate}</p>
              </div>
              <Button variant="outline" className="text-xs"><Download className="w-4 h-4" /> Download</Button>
            </div>
          </div>
        )}
      </Modal>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5 text-gray-500" /></button>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <span>My Companies</span>
              <ChevronRight className="w-3 h-3" />
              <span className="font-medium text-gray-900">{company.name}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Company Management</h1>
          </div>
        </div>
      </div>

      <div className="flex border-b border-gray-200">
        {['profile', 'documents'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-8 py-3 font-bold text-sm border-b-2 transition-all capitalize ${activeSubTab === tab ? 'border-[#8a2be2] text-[#8a2be2]' : 'border-transparent text-gray-400'}`}
          >
            {tab === 'profile' ? 'Company Profile' : 'Document Center'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        {activeSubTab === 'profile' ? (
          <div className="lg:col-span-12">
            <form onSubmit={handleProfileSave} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg"><Building2 className="w-5 h-5 text-[#8a2be2]" /></div>
                  <h2 className="text-lg font-bold text-gray-800">Edit Profile</h2>
                </div>
                <Button type="submit" disabled={isSaving} className="px-6">{isSaving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Changes</>}</Button>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Company Name</label>
                    <input className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Industry</label>
                    <input className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none" value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Registration No</label>
                    <input className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none" value={formData.registrationNo} onChange={e => setFormData({...formData, registrationNo: e.target.value})} />
                </div>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="lg:col-span-8 space-y-4 pb-20">
              {docSections.map((section, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <button onClick={() => setExpandedSection(expandedSection === section.title ? null : section.title)} className={`w-full flex items-center justify-between p-5 transition-colors ${expandedSection === section.title ? 'bg-purple-50/30' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${expandedSection === section.title ? 'bg-white shadow-sm' : 'bg-gray-50'}`}><section.icon className={`w-5 h-5 ${expandedSection === section.title ? 'text-[#8a2be2]' : 'text-gray-400'}`} /></div>
                      <h3 className="font-bold text-gray-800">{section.title}</h3>
                    </div>
                    {expandedSection === section.title ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>
                  {expandedSection === section.title && (
                    <div className="border-t border-gray-50 divide-y divide-gray-50">
                      {section.items.map((item, iIdx) => {
                        const isUploaded = uploadedDocs[item.name];
                        return (
                          <div key={iIdx} className="p-5 flex items-center justify-between group bg-white hover:bg-gray-50/30 transition-colors">
                            <div className="flex-1">
                              <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                {item.name}
                                {isUploaded && <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Attached</span>}
                              </h4>
                              <p className="text-xs text-gray-400 mt-1">{isUploaded ? `File: ${uploadedDocs[item.name].fileName}` : item.desc}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {isUploaded ? (
                                <>
                                  <button onClick={() => handleViewDocument(item)} className="p-2 text-gray-400 hover:text-[#8a2be2] hover:bg-purple-50 rounded-lg"><Eye className="w-4 h-4" /></button>
                                  <button onClick={() => {
                                      const n = {...uploadedDocs}; delete n[item.name]; setUploadedDocs(n);
                                  }} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                </>
                              ) : (
                                <button onClick={() => handleDocumentClick(item)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold border border-gray-200 rounded-lg text-gray-500 hover:border-[#8a2be2] hover:text-[#8a2be2] transition-all bg-white"><Upload className="w-3.5 h-3.5" /> Upload</button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="lg:col-span-4">
              <div className="bg-[#f8f7ff] rounded-2xl border border-purple-100 p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-4"><div className="p-2 bg-white rounded-lg"><FileCheck className="w-5 h-5 text-[#8a2be2]" /></div><h2 className="text-lg font-bold text-gray-800">Compliance</h2></div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-8"><div className="bg-gradient-to-r from-[#d91d81] to-[#8a2be2] h-2 rounded-full transition-all duration-500" style={{ width: `${(Object.keys(uploadedDocs).length / 10) * 100}%` }}></div></div>
                <Button onClick={handleProfileSave} disabled={isSaving} className="w-full py-3">{isSaving ? "Syncing..." : "Sync All Documents"}</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// --- View: My Companies ---

const MyCompaniesView = ({ companies, onAddCompany, onSelectCompany }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', industry: 'Construction', location: '', registrationNo: '', documents: {} });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCompany({ ...formData, id: Date.now() });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Companies</h1>
          <p className="text-gray-500 text-sm">Manage company profiles for tender analysis</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="px-6"><Plus className="w-5 h-5" /> New Company</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map(company => (
          <div key={company.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-xl"><Building2 className="w-6 h-6 text-[#8a2be2]" /></div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{company.name}</h3>
            <p className="text-xs font-bold text-[#d91d81] uppercase tracking-wider mb-4">{company.industry}</p>
            <Button variant="outline" className="w-full text-sm" onClick={() => onSelectCompany(company)}>Manage Profile & Docs</Button>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Company">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required className="w-full px-4 py-2 border rounded-lg outline-none" placeholder="Company Legal Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <select className="w-full px-4 py-2 border rounded-lg outline-none bg-white" value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})}>
             <option value="Construction">Construction</option>
             <option value="IT Services">IT Services</option>
             <option value="Healthcare">Healthcare</option>
          </select>
          <div className="flex gap-3 pt-4"><Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button><Button type="submit" className="flex-1">Create Profile</Button></div>
        </form>
      </Modal>
    </div>
  );
};

// --- View: All Tenders (Restored) ---

const AllTendersView = () => {
  const tenders = [
    { id: 'T-102', title: 'Smart City Infrastructure Project', category: 'Construction', status: 'Open', date: '2023-10-25', location: 'Dubai, UAE' },
    { id: 'T-105', title: 'Solar Panel Maintenance Services', category: 'Energy', status: 'Open', date: '2023-11-02', location: 'Abu Dhabi, UAE' },
    { id: 'T-109', title: 'Cybersecurity Audit for Govt Dept', category: 'IT Services', status: 'Closed', date: '2023-09-15', location: 'Riyadh, KSA' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-gray-800">All Tenders</h1><p className="text-gray-500 text-sm">Browse available opportunities</p></div>
        <div className="flex items-center gap-2"><Button variant="outline"><Filter className="w-4 h-4" /> Filters</Button></div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="relative w-full max-w-md"><Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search tenders..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none" /></div>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest"><th className="px-6 py-4">ID</th><th className="px-6 py-4">Title</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {tenders.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs font-bold">{t.id}</td>
                <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 text-sm">{t.title}</div>
                    <div className="text-[10px] text-gray-400">{t.location}</div>
                </td>
                <td className="px-6 py-4"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${t.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{t.status}</span></td>
                <td className="px-6 py-4 text-right"><button className="p-2 text-gray-400 hover:text-[#8a2be2]"><Eye className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Auth Views (Restored) ---

const LoginPage = ({ onLogin, onToggle }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8"><h1 className="text-4xl font-black italic text-gray-900 tracking-tighter">minaions</h1><p className="text-gray-500 mt-2">Sign in to your account</p></div>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
        <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email</label><input type="email" required className="w-full px-4 py-2 border rounded-lg outline-none" placeholder="john@example.com" /></div>
        <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Password</label><input type="password" required className="w-full px-4 py-2 border rounded-lg outline-none" placeholder="••••••••" /></div>
        <Button className="w-full py-3 mt-4">Sign In</Button>
      </form>
      <p className="text-center mt-6 text-sm text-gray-600">No account? <button onClick={onToggle} className="text-[#d91d81] font-bold hover:underline">Register</button></p>
    </div>
  </div>
);

const RegisterPage = ({ onRegister, onToggle }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8"><h1 className="text-4xl font-black italic text-gray-900 tracking-tighter">minaions</h1><p className="text-gray-500 mt-2">Create your free account</p></div>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onRegister(); }}>
        <input required className="w-full px-4 py-2 border rounded-lg outline-none" placeholder="Full Name" />
        <input type="email" required className="w-full px-4 py-2 border rounded-lg outline-none" placeholder="john@example.com" />
        <input type="password" required className="w-full px-4 py-2 border rounded-lg outline-none" placeholder="Password" />
        <Button className="w-full py-3 mt-4">Create Account</Button>
      </form>
      <p className="text-center mt-6 text-sm text-gray-600">Already have an account? <button onClick={onToggle} className="text-[#d91d81] font-bold hover:underline">Sign In</button></p>
    </div>
  </div>
);

// --- Main App Shell ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authView, setAuthView] = useState('login'); 
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [companies, setCompanies] = useState([
    { id: 1, name: "Acme Constructions Ltd", industry: "Construction", registrationNo: "B-22345", location: "Mumbai, India", documents: {} }
  ]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const addCompany = (c) => setCompanies([...companies, c]);
  const updateCompany = (u) => {
    setCompanies(companies.map(c => c.id === u.id ? u : c));
    setSelectedCompany(u);
  };

  const handleSelectCompany = (c) => {
    setSelectedCompany(c);
    setActiveTab('CompanyDetails');
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
      {/* Sidebar Restored */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-4 shrink-0 overflow-y-auto">
        <div className="mb-8 px-4 pt-2">
          <h1 className="text-3xl font-black italic text-gray-900 tracking-tighter">minaions</h1>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
          <SidebarItem icon={FileSearch} label="All Tenders" active={activeTab === 'All Tenders'} onClick={() => setActiveTab('All Tenders')} />
          <SidebarItem icon={Building2} label="My Companies" active={activeTab === 'My Companies' || activeTab === 'CompanyDetails'} onClick={() => setActiveTab('My Companies')} />
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

      {/* Main Content Area Restored */}
      <main className="flex-1 overflow-y-auto bg-gray-50/30">
        <header className="h-16 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="font-bold text-gray-800">
            {activeTab === 'CompanyDetails' ? 'Company Details' : activeTab}
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600"><Search className="w-5 h-5" /></button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8a2be2] to-[#d91d81] flex items-center justify-center text-white text-xs font-bold">JD</div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {activeTab === 'Dashboard' && <DashboardView stats={{ companyCount: companies.length }} />}
          {activeTab === 'All Tenders' && <AllTendersView />}
          {activeTab === 'My Companies' && (
            <MyCompaniesView 
              companies={companies} 
              onAddCompany={addCompany} 
              onSelectCompany={handleSelectCompany} 
            />
          )}
          {activeTab === 'CompanyDetails' && selectedCompany && (
            <CompanyDetailsView 
              company={selectedCompany} 
              onBack={() => setActiveTab('My Companies')}
              onSave={updateCompany}
            />
          )}
          
          {!['Dashboard', 'All Tenders', 'My Companies', 'CompanyDetails'].includes(activeTab) && (
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