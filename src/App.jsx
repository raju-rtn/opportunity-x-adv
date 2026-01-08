import React, { useState, useEffect, useRef } from 'react';
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
  ClipboardList
} from 'lucide-react';

// --- Shared Components ---

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
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
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
      <Card title="Total Tenders" value="124" icon={Search} />
      <Card title="Analyzed Tenders" value="18" icon={BarChart3} />
      <Card title="Eligible Tenders" value="5" icon={FileText} />
      <Card title="Generated Documents" value="42" icon={FileText} />
      <Card title="Total Companies" value={stats.companyCount} icon={Building2} />
      <Card title="Bookmarked Tenders" value="12" icon={Bookmark} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 min-h-[400px] flex flex-col">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Tender Status Overview</h2>
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
          <div className="mb-4">
            <BarChart3 className="w-16 h-16 opacity-20" />
          </div>
          <p className="text-sm font-medium">No active analysis data to display yet</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Usage Summary</h2>
        <div className="space-y-6 flex-1">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-50 rounded-lg"><FileText className="w-5 h-5 text-blue-500" /></div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Free Analysis Remaining</p>
              <p className="text-xl font-bold text-blue-500">3</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-50 rounded-lg"><FileSearch className="w-5 h-5 text-blue-500" /></div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Paid Analysis Remaining</p>
              <p className="text-xl font-bold text-blue-500">0</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-50 rounded-lg"><Building2 className="w-5 h-5 text-blue-500" /></div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Tenders Remaining</p>
              <p className="text-xl font-bold text-blue-500">15</p>
            </div>
          </div>
        </div>
        <Button className="w-full py-3 mt-8">Manage Subscription</Button>
      </div>
    </div>
  </div>
);

// --- View: Company Detailed (Edit + Documents) ---

const CompanyDetailsView = ({ company, onBack, onSave }) => {
  const [activeSubTab, setActiveSubTab] = useState('profile'); 
  const [formData, setFormData] = useState({ ...company });
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [expandedSection, setExpandedSection] = useState('Registration & Identity');
  
  // State for managing uploaded files per document type
  const [filesMap, setFilesMap] = useState(company.filesMap || {});
  
  // Ref for handling real file uploads
  const fileInputRef = useRef(null);
  const [currentUploadItem, setCurrentUploadItem] = useState(null);

  const handleProfileSave = (e) => {
    if(e) e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onSave({ ...formData, filesMap });
      setIsSaving(false);
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 3000);
    }, 800);
  };

  const handleUploadClick = (itemName) => {
    setCurrentUploadItem(itemName);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && currentUploadItem) {
      const newFile = {
        id: Date.now(),
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        date: new Date().toLocaleDateString()
      };
      setFilesMap(prev => ({
        ...prev,
        [currentUploadItem]: [...(prev[currentUploadItem] || []), newFile]
      }));
      // Reset
      e.target.value = '';
      setCurrentUploadItem(null);
    }
  };

  const handleDeleteFile = (docName, fileId) => {
    setFilesMap(prev => ({
      ...prev,
      [docName]: prev[docName].filter(f => f.id !== fileId)
    }));
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
        { name: "Client Completion Certificates", desc: "Project completion/satisfaction letters" },
        { name: "Reference Letters", desc: "Client references and testimonials" }
      ]
    },
    {
      title: "Certifications & Licenses",
      icon: Award,
      items: [
        { name: "ISO Certifications", desc: "ISO 9001, 14001, 27001, etc." },
        { name: "Industry Licenses", desc: "Relevant industry-specific licenses" },
        { name: "Quality Certificates", desc: "Quality assurance certifications" }
      ]
    }
  ];

  const totalPossibleItems = docSections.reduce((acc, sec) => acc + sec.items.length, 0);
  const itemsWithFiles = Object.keys(filesMap).filter(k => filesMap[k].length > 0).length;

  return (
    <div className="space-y-6 relative">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />

      {showSaveToast && (
        <div className="fixed top-20 right-8 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold">Changes saved successfully!</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
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
        <button 
          onClick={() => setActiveSubTab('profile')}
          className={`px-8 py-3 font-bold text-sm border-b-2 transition-all ${activeSubTab === 'profile' ? 'border-[#8a2be2] text-[#8a2be2]' : 'border-transparent text-gray-400'}`}
        >
          Company Profile
        </button>
        <button 
          onClick={() => setActiveSubTab('documents')}
          className={`px-8 py-3 font-bold text-sm border-b-2 transition-all ${activeSubTab === 'documents' ? 'border-[#8a2be2] text-[#8a2be2]' : 'border-transparent text-gray-400'}`}
        >
          Document Center
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        {activeSubTab === 'profile' && (
          <div className="lg:col-span-12">
            <form onSubmit={handleProfileSave} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg"><Building2 className="w-5 h-5 text-[#8a2be2]" /></div>
                  <h2 className="text-lg font-bold text-gray-800">Edit Company Information</h2>
                </div>
                <Button type="submit" disabled={isSaving} className="px-6">
                  {isSaving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Changes</>}
                </Button>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Company Legal Name</label>
                  <input 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#8a2be2]/20"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Industry</label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none bg-white"
                    value={formData.industry}
                    onChange={e => setFormData({...formData, industry: e.target.value})}
                  >
                    <option value="Construction">Construction</option>
                    <option value="IT Services">IT Services</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Registration Number</label>
                  <input 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none"
                    value={formData.registrationNo}
                    onChange={e => setFormData({...formData, registrationNo: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Website</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-2.5 w-4 h-4 text-gray-300" />
                    <input 
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none"
                      value={formData.website}
                      onChange={e => setFormData({...formData, website: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Headquarters Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-300" />
                    <input 
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>
                <div className="md:col-span-2 lg:col-span-3 space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Company Description</label>
                  <textarea 
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none"
                    placeholder="Describe your company's core services..."
                    value={formData.description || ''}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {activeSubTab === 'documents' && (
          <>
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-2">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-2xl">
                    <ClipboardList className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">Recommended Documents for Tendering Profile</h2>
                    <p className="text-sm text-gray-500 mt-1">Upload the following documents to build a strong company profile. Our AI will automatically extract and organize relevant information.</p>
                  </div>
                </div>
              </div>

              {docSections.map((section, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <button 
                    onClick={() => setExpandedSection(expandedSection === section.title ? null : section.title)}
                    className={`w-full flex items-center justify-between p-5 transition-colors ${expandedSection === section.title ? 'bg-purple-50/30' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${expandedSection === section.title ? 'bg-white shadow-sm' : 'bg-gray-50'}`}>
                        <section.icon className={`w-5 h-5 ${expandedSection === section.title ? 'text-[#8a2be2]' : 'text-gray-400'}`} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-gray-800">{section.title}</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{section.items.length} Document Types</p>
                      </div>
                    </div>
                    {expandedSection === section.title ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>

                  {expandedSection === section.title && (
                    <div className="border-t border-gray-50 divide-y divide-gray-50">
                      {section.items.map((item, iIdx) => {
                        const uploadedForThisItem = filesMap[item.name] || [];
                        return (
                          <div key={iIdx} className="bg-white">
                            <div className="p-5 flex items-center justify-between group hover:bg-gray-50/30 transition-colors">
                              <div className="flex-1">
                                <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                  {item.name}
                                  <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-normal">Recommended</span>
                                  {uploadedForThisItem.length > 0 && (
                                    <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" /> {uploadedForThisItem.length} Files
                                    </span>
                                  )}
                                </h4>
                                <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => handleUploadClick(item.name)}
                                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold border border-gray-200 rounded-lg text-gray-500 hover:border-[#8a2be2] hover:text-[#8a2be2] transition-all bg-white shadow-sm active:scale-95"
                                >
                                  <Upload className="w-3.5 h-3.5" /> Upload
                                </button>
                              </div>
                            </div>
                            
                            {/* File List */}
                            {uploadedForThisItem.length > 0 && (
                              <div className="px-5 pb-4 space-y-2">
                                {uploadedForThisItem.map((file) => (
                                  <div key={file.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                      <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                                      <span className="text-xs text-gray-600 font-medium truncate">{file.name}</span>
                                      <span className="text-[10px] text-gray-400 shrink-0">{file.size}</span>
                                    </div>
                                    <div className="flex gap-1">
                                      <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                                      <button 
                                        onClick={() => handleDeleteFile(item.name, file.id)}
                                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-3">
                <div className="bg-white p-1.5 h-fit rounded shadow-sm">
                  <Info className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-xs text-blue-800 leading-relaxed">
                  <span className="font-bold">💡 Tip:</span> Having all required documents ready will significantly improve your tender submission success rate and streamline the bidding process.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-[#f8f7ff] rounded-2xl border border-purple-100 p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-white rounded-lg"><FileCheck className="w-5 h-5 text-[#8a2be2]" /></div>
                  <h2 className="text-lg font-bold text-gray-800">Compliance Status</h2>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                  Recommended documents for full eligibility:
                  <span className="block mt-1 font-bold text-[#8a2be2]"> {itemsWithFiles} / {totalPossibleItems} Document Types Present </span>
                </p>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-8 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#d91d81] to-[#8a2be2] h-2 rounded-full transition-all duration-700 ease-out" 
                    style={{ width: `${(itemsWithFiles / totalPossibleItems) * 100}%` }}
                  ></div>
                </div>

                <div className="bg-white/50 p-4 rounded-xl border border-white space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                    <TrendingUp className="w-4 h-4 text-[#d91d81]" /> AI Guidance
                  </div>
                  <p className="text-[11px] text-gray-500 italic">
                    "Consistent financial history and valid ISO certifications increase your tender eligibility scoring by up to 40%."
                  </p>
                </div>
                
                <Button className="w-full mt-6 py-3" onClick={handleProfileSave}>Save All Changes</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// --- View: My Companies ---

const MyCompaniesView = ({ companies, onAddCompany, onSelectCompany, onDeleteCompany }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', industry: '', website: '', location: '', registrationNo: '', description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCompany({ ...formData, id: Date.now(), filesMap: {} });
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
            Add your first company profile to begin analysis.
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
                  <button 
                    onClick={() => onDeleteCompany(company.id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{company.name}</h3>
              <p className="text-xs font-semibold text-[#d91d81] uppercase tracking-wider mb-4">{company.industry}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" /> {company.location || 'Not Specified'}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Globe className="w-4 h-4" /> {company.website || 'No Website'}
                </div>
              </div>

              <Button variant="outline" className="w-full text-sm" onClick={() => onSelectCompany(company)}>Manage Details & Docs</Button>
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
              <label className="block text-sm font-semibold text-gray-700 mb-1">Registration No</label>
              <input 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none" 
                placeholder="e.g. REG-12345"
                value={formData.registrationNo}
                onChange={e => setFormData({...formData, registrationNo: e.target.value})}
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

// // Tender Select View

// const TenderDetailView = ({ tender, onBack }) => {
//   const [activeTab, setActiveTab] = useState('Overview');

//   return (
//     <div className="flex flex-col h-full bg-white overflow-y-auto">
//       {/* Detail Header */}
//       <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={onBack}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <div>
//             <div className="flex items-center gap-2 mb-0.5">
//               <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">BID NO: {tender.id}</span>
//               <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-[9px] font-black uppercase">Active</span>
//             </div>
//             <h2 className="text-lg font-bold text-gray-900 leading-tight truncate max-w-xl uppercase">{tender.title}</h2>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg border border-gray-200"><Share2 className="w-4 h-4" /></button>
//           <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg border border-gray-200"><Bookmark className="w-4 h-4" /></button>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
//             Apply Now
//           </button>
//         </div>
//       </div>

//       <div className="p-6 max-w-6xl mx-auto w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
//           {/* Main Content Area */}
//           <div className="lg:col-span-2 space-y-6">
            
//             {/* Summary Stats Grid */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {[
//                 { label: 'Published On', value: tender.publishedDate.split(' ')[0], icon: Calendar, color: 'text-blue-500' },
//                 { label: 'End Date', value: tender.closingDate.split(' ')[0], icon: Clock, color: 'text-red-500' },
//                 { label: 'Quantity', value: tender.quantity, icon: Info, color: 'text-orange-500' },
//                 { label: 'Location', value: 'New Delhi, IN', icon: MapPin, color: 'text-green-500' }
//               ].map((stat, i) => (
//                 <div key={i} className="bg-gray-50/50 border border-gray-100 p-4 rounded-xl">
//                   <div className={`p-2 w-fit rounded-lg bg-white border border-gray-100 mb-3 ${stat.color}`}>
//                     <stat.icon className="w-4 h-4" />
//                   </div>
//                   <div className="text-[11px] font-bold text-gray-400 uppercase mb-1">{stat.label}</div>
//                   <div className="text-sm font-black text-gray-900">{stat.value}</div>
//                 </div>
//               ))}
//             </div>

//             {/* Tabs Navigation */}
//             <div className="border-b border-gray-100 flex items-center gap-8">
//               {['Overview', 'Financial Details', 'Documents', 'Corrigendum'].map(tab => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`py-3 text-sm font-bold transition-all border-b-2 relative -mb-[2px] ${
//                     activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             {/* Tab Content */}
//             <div className="py-2">
//               {activeTab === 'Overview' && (
//                 <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
//                   <section>
//                     <h4 className="text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
//                       <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
//                       Department Details
//                     </h4>
//                     <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
//                       <table className="w-full text-sm">
//                         <tbody className="divide-y divide-gray-50">
//                           <tr>
//                             <td className="px-4 py-3 bg-gray-50/50 text-gray-500 font-medium w-1/3">Ministry</td>
//                             <td className="px-4 py-3 text-gray-900 font-semibold">Ministry of Heavy Industries</td>
//                           </tr>
//                           <tr>
//                             <td className="px-4 py-3 bg-gray-50/50 text-gray-500 font-medium">Department</td>
//                             <td className="px-4 py-3 text-gray-900 font-semibold">Department of Heavy Industry</td>
//                           </tr>
//                           <tr>
//                             <td className="px-4 py-3 bg-gray-50/50 text-gray-500 font-medium">Organization</td>
//                             <td className="px-4 py-3 text-gray-900 font-semibold">BHEL - Bharat Heavy Electricals Ltd.</td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </section>

//                   <section>
//                     <h4 className="text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
//                       <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
//                       Item Technical Specification
//                     </h4>
//                     <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
//                       The scope of work includes design, engineering, supply, installation, and commissioning of the item: <span className="font-bold text-gray-900 uppercase">{tender.title}</span>. 
//                       Standard compliance as per GeM GTC version 4.0 and additional SITC requirements apply.
//                     </p>
//                   </section>
//                 </div>
//               )}
              
//               {activeTab === 'Documents' && (
//                 <div className="space-y-4 animate-in fade-in">
//                   {[
//                     { name: 'Technical_Specification.pdf', size: '2.4 MB', type: 'Technical' },
//                     { name: 'Financial_Bid_Format.xlsx', size: '156 KB', type: 'Financial' },
//                     { name: 'General_Terms_and_Conditions.pdf', size: '1.1 MB', type: 'GTC' }
//                   ].map((doc, i) => (
//                     <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 group transition-all">
//                       <div className="flex items-center gap-4">
//                         <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
//                           <FileText className="w-5 h-5" />
//                         </div>
//                         <div>
//                           <div className="text-sm font-bold text-gray-900">{doc.name}</div>
//                           <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{doc.type} • {doc.size}</div>
//                         </div>
//                       </div>
//                       <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
//                         <Download className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Sidebar */}
//           <div className="space-y-6">
//             {/* Status Timeline */}
//             <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
//               <h4 className="text-sm font-black text-gray-900 mb-6 uppercase tracking-wider">Tender Timeline</h4>
//               <div className="space-y-8 relative">
//                 <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100"></div>
//                 {[
//                   { label: 'Published', date: tender.publishedDate, completed: true },
//                   { label: 'Clarification End', date: '28-12-2025', completed: true },
//                   { label: 'Bid Submission End', date: tender.closingDate, completed: false },
//                   { label: 'Technical Opening', date: '06-01-2026', completed: false }
//                 ].map((step, i) => (
//                   <div key={i} className="flex gap-4 relative">
//                     <div className={`w-6 h-6 rounded-full border-4 shrink-0 z-10 flex items-center justify-center bg-white ${
//                       step.completed ? 'border-blue-600' : 'border-gray-200'
//                     }`}>
//                       {step.completed && <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>}
//                     </div>
//                     <div>
//                       <div className={`text-xs font-bold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</div>
//                       <div className="text-[10px] font-medium text-gray-400">{step.date}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Assistance Card */}
//             <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl shadow-blue-200">
//               <ShieldCheck className="w-10 h-10 mb-4 opacity-50" />
//               <h4 className="font-bold mb-2">Need Bidding Assistance?</h4>
//               <p className="text-xs text-blue-100 mb-4 leading-relaxed">Our experts can help you with documentation and technical submission for this tender.</p>
//               <button className="w-full bg-white text-blue-700 py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-50 transition-all">
//                 Contact Consultant
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };



// /**Tender Card Component: Optimized for high-density information display */

// const TenderCard = ({ tender, onDetails }) => (
//   <div className="bg-white border-b border-gray-100 p-4 md:p-6 hover:bg-gray-50/80 transition-all group">
//     <div className="flex flex-col xl:flex-row xl:items-start gap-5">
      
//       {/* 1. ID & Category Tag */}
//       <div className="w-full xl:w-48 shrink-0 flex xl:block justify-between items-start">
//         <div className="space-y-2">
//           <div className="flex items-center gap-2">
//             <span className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">BID NO:</span>
//             <span className="text-[11px] font-bold text-gray-700 font-mono">{tender.id}</span>
//           </div>
//           <span className="inline-flex px-2 py-0.5 text-[10px] font-black rounded uppercase tracking-wider bg-green-100 text-green-700">
//             GeM Tender
//           </span>
//         </div>
//         <button className="xl:hidden p-2 text-gray-400 hover:text-blue-600 transition-colors">
//           <Bookmark className="w-5 h-5" />
//         </button>
//       </div>

//       {/* 2. Primary Details */}
//       <div className="flex-1 min-w-0">
//         <h3 className="text-[15px] font-bold text-[#1a73e8] hover:text-blue-700 hover:underline cursor-pointer leading-tight mb-2 break-words uppercase">
//           {tender.title}
//         </h3>
//         <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
//           <div className="flex items-center gap-1.5">
//             <Building2 className="w-3.5 h-3.5 text-gray-400" />
//             <span className="text-gray-500 font-medium">Dept:</span>
//             <span className="text-gray-800 font-semibold truncate max-w-[300px] md:max-w-none">
//               {tender.department}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* 3. Metadata Grid (Dates/Qty/Loc) */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 xl:w-[480px] text-[12px] pt-4 xl:pt-0 border-t border-gray-50 xl:border-t-0">
//         <div className="space-y-1">
//           <span className="text-gray-400 block font-medium">Published</span>
//           <span className="text-gray-800 font-bold">{tender.publishedDate.split(' ')[0]}</span>
//         </div>
//         <div className="space-y-1">
//           <span className="text-gray-400 block font-medium">End Date</span>
//           <span className={`block font-bold ${tender.isUrgent ? 'text-red-500' : 'text-gray-800'}`}>
//             {tender.closingDate.split(' ')[0]}
//           </span>
//         </div>
//         <div className="space-y-1">
//           <span className="text-gray-400 block font-medium">Quantity</span>
//           <span className="text-gray-800 font-bold">{tender.quantity}</span>
//         </div>
//         <div className="space-y-1">
//           <span className="text-gray-400 block font-medium">Status</span>
//           <span className="text-green-600 font-bold flex items-center gap-1">
//             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
//             Active
//           </span>
//         </div>
//       </div>

//       {/* 4. Action Bar */}
//       <div className="flex items-center gap-2 shrink-0 pt-2 xl:pt-0">
//         <button 
//           onClick={() => onDetails(tender)}
//           className="flex-1 xl:flex-none bg-white border border-gray-200 px-4 py-2 rounded-lg text-xs font-bold text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all active:scale-95"
//         >
//           <Eye className="w-4 h-4" /> Details
//         </button>
//         <button className="hidden xl:flex p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all active:scale-95">
//           <Bookmark className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   </div>
// );


// const AllTendersView = () => {
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedTender, setSelectedTender] = useState(null);

  
//   const tenders = [
//     {
//       id: "GEM/2025/B/6999790",
//       title: "964614520000-HPBP VALVE ACTUAT...",
//       department: "Ministry of Heavy Industries | Dept of Heavy Industry",
//       publishedDate: "09-12-2025 8:57 AM",
//       closingDate: "08-01-2026 11:00 AM",
//       quantity: "113",
//       isUrgent: false
//     },
//     {
//       id: "GEM/2025/B/7043958",
//       title: "Gem Schedule 1 - CS & SS PIPES...",
//       department: "Ministry of Heavy Industries | Dept of Heavy Industry",
//       publishedDate: "13-12-2025 4:57 PM",
//       closingDate: "03-01-2026 5:00 PM",
//       quantity: "12",
//       isUrgent: true
//     },
//     {
//       id: "GEM/2025/B/7038564",
//       title: "HEAVY DUTY PNEUMATIC VERTICAL ...",
//       department: "Ministry of Heavy Industries | Dept of Heavy Industry",
//       publishedDate: "26-12-2025 9:59 AM",
//       closingDate: "05-01-2026 10:00 AM",
//       quantity: "45",
//       isUrgent: true
//     },
//     {
//       id: "GEM/2025/B/7036279",
//       title: "MOBILE PLATFORM",
//       department: "Ministry of Heavy Industries | Dept of Heavy Industry",
//       publishedDate: "26-12-2025 9:59 AM",
//       closingDate: "05-01-2026 10:00 AM",
//       quantity: "20",
//       isUrgent: true
//     },
//     {
//       id: "GEM/2025/B/7044244",
//       title: "Polyester Enamelled Round Copp...",
//       department: "Ministry of Heavy Industries | Dept of Heavy Industry",
//       publishedDate: "26-12-2025 10:58 AM",
//       closingDate: "05-01-2026 2:00 PM",
//       quantity: "1313",
//       isUrgent: true
//     },
//     {
//       id: "GEM/2025/B/7040299",
//       title: "350 MICRON X 750 TO 900 MM WID...",
//       department: "Ministry of Heavy Industries | Dept of Heavy Industry",
//       publishedDate: "26-12-2025 11:07 AM",
//       closingDate: "05-01-2026 4:00 PM",
//       quantity: "15000",
//       isUrgent: true
//     },
//     {
//       id: "GEM/2025/B/7044665",
//       title: "160132670000_REV TOP SW ARM,16...",
//       department: "Ministry of Heavy Industries | Dept of Heavy Industry",
//       publishedDate: "26-12-2025 11:36 AM",
//       closingDate: "05-01-2026 4:00 PM",
//       quantity: "460",
//       isUrgent: true
//     },
//     {
//       id: "GEM/2025/B/7044620",
//       title: "DOUBLE ADHESIVE PAPER TAPE TO ...",
//       department: "Ministry of Heavy Industries | Dept of Heavy Industry",
//       publishedDate: "26-12-2025 11:58 AM",
//       closingDate: "05-01-2026 4:00 PM",
//       quantity: "2000",
//       isUrgent: true
//     },
//     {
//       id: "GEM/2025/B/7044094",
//       title: "ITEM 1: SEPERATOR, DRG. 462110...",
//       department: "Ministry of Heavy Industries | Dept of Heavy Industry",
//       publishedDate: "26-12-2025 11:52 AM",
//       closingDate: "05-01-2026 12:00 PM",
//       quantity: "80000",
//       isUrgent: true
//     },
//     {
//       id: "GEM/2025/B/XXXXX",
//       title: "Electronic component cleaner (...",
//       department: "Ministry of Heavy Industries | Dept of Heavy Industry",
//       publishedDate: "26-12-2025 11:50 AM",
//       closingDate: "05-01-2026 4:00 PM",
//       quantity: "100",
//       isUrgent: true
//     }
//   ];

//     // If a tender is selected, show detail view instead of the list
//   if (selectedTender) {
//     return (
//       <TenderDetailView 
//         tender={selectedTender} 
//         onBack={() => setSelectedTender(null)} 
//       />
//     );
//   }


//   return (
//    <div className="flex flex-col h-full overflow-hidden bg-gray-50/30">
//       {/* Header Bar */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-xl font-black text-gray-900">All Tenders</h1>
//           <p className="text-[12px] text-gray-400 font-medium">Showing {tenders.length} items from Ministry of Heavy Industries</p>
//         </div>
        
//         <div className="flex items-center gap-3">
//           <div className="relative flex-1 md:w-80">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input 
//               type="text" 
//               placeholder="Search items or Bid numbers..." 
//               className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
//             />
//           </div>
//           <button 
//             onClick={() => setShowFilters(!showFilters)}
//             className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 ${
//               showFilters 
//                 ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
//                 : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 shadow-sm'
//             }`}
//           >
//             <Filter className="w-4 h-4" />
//             <span className="text-xs font-bold hidden sm:inline">Filters</span>
//           </button>
//           <button className="bg-gray-900 text-white p-2.5 sm:px-4 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-black transition-all shadow-md">
//             <Download className="w-4 h-4" />
//             <span className="hidden sm:inline">Export CSV</span>
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-1 overflow-hidden relative">
//         {/* Animated Sidebar Filters */}
//         <aside className={`
//           ${showFilters ? 'w-64 translate-x-0 opacity-100 p-6' : 'w-0 -translate-x-full opacity-0 p-0 pointer-events-none'}
//           transition-all duration-300 ease-in-out border-r border-gray-200 bg-white h-full z-20 flex-shrink-0 absolute lg:relative
//         `}>
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Advanced Filters</h3>
//             <button className="text-[10px] font-bold text-blue-600 hover:underline">Clear All</button>
//           </div>
          
//           <div className="space-y-8">
//             <section>
//               <h4 className="text-[12px] font-bold text-gray-900 mb-4">Ministry</h4>
//               <div className="space-y-3">
//                 {['Heavy Industries', 'Military Affairs', 'MSME', 'Railways'].map(cat => (
//                   <label key={cat} className="flex items-center gap-3 cursor-pointer group">
//                     <input type="checkbox" defaultChecked={cat === 'Heavy Industries'} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/20" />
//                     <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{cat}</span>
//                   </label>
//                 ))}
//               </div>
//             </section>

//             <section>
//               <h4 className="text-[12px] font-bold text-gray-900 mb-4">Deadline Status</h4>
//               <div className="space-y-3">
//                 {['Closing Soon', 'Open', 'Under Review'].map(status => (
//                   <label key={status} className="flex items-center gap-3 cursor-pointer group">
//                     <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
//                     <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{status}</span>
//                   </label>
//                 ))}
//               </div>
//             </section>
//           </div>
//         </aside>

//         {/* List Content */}
//         <div className="flex-1 overflow-y-auto bg-white">
//           <div className="flex flex-col">
//             {tenders.map((tender, index) => (
//               <TenderCard key={index} tender={tender} onDetails={setSelectedTender} />
//             ))}
//           </div>
          
//           {/* Footer / Pagination */}
//           <div className="p-10 flex flex-col items-center gap-4 bg-gray-50/50">
//             <div className="flex items-center gap-1">
//               <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
//               {[1, 2, 3, '...', 12].map((p, i) => (
//                 <button key={i} className={`hidden sm:flex w-10 h-10 items-center justify-center rounded-lg text-xs font-bold transition-all ${
//                   p === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border border-gray-100 text-gray-600 hover:border-gray-300'
//                 }`}>
//                   {p}
//                 </button>
//               ))}
//               <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
//             </div>
//             <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Page 1 of 12</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



/**
 * Tender Detail View Component
 * Based on the reference images provided.
 */
const TenderDetailView = ({ tender, onBack }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto">
      {/* Detail Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">BID NO: {tender.id}</span>
              <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-[9px] font-black uppercase">Active</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight truncate max-w-xl uppercase">{tender.title}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg border border-gray-200"><Share2 className="w-4 h-4" /></button>
          <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg border border-gray-200"><Bookmark className="w-4 h-4" /></button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            Apply Now
          </button>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Summary Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Published On', value: tender.publishedDate.split(' ')[0], icon: Calendar, color: 'text-blue-500' },
                { label: 'End Date', value: tender.closingDate.split(' ')[0], icon: Clock, color: 'text-red-500' },
                { label: 'Quantity', value: tender.quantity, icon: Info, color: 'text-orange-500' },
                { label: 'Location', value: 'New Delhi, IN', icon: MapPin, color: 'text-green-500' }
              ].map((stat, i) => (
                <div key={i} className="bg-gray-50/50 border border-gray-100 p-4 rounded-xl">
                  <div className={`p-2 w-fit rounded-lg bg-white border border-gray-100 mb-3 ${stat.color}`}>
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase mb-1">{stat.label}</div>
                  <div className="text-sm font-black text-gray-900">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-100 flex items-center gap-8">
              {['Overview', 'Financial Details', 'Documents', 'Corrigendum'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 text-sm font-bold transition-all border-b-2 relative -mb-[2px] ${
                    activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="py-2">
              {activeTab === 'Overview' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                  <section>
                    <h4 className="text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
                      Department Details
                    </h4>
                    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                      <table className="w-full text-sm">
                        <tbody className="divide-y divide-gray-50">
                          <tr>
                            <td className="px-4 py-3 bg-gray-50/50 text-gray-500 font-medium w-1/3">Ministry</td>
                            <td className="px-4 py-3 text-gray-900 font-semibold">Ministry of Heavy Industries</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 bg-gray-50/50 text-gray-500 font-medium">Department</td>
                            <td className="px-4 py-3 text-gray-900 font-semibold">Department of Heavy Industry</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 bg-gray-50/50 text-gray-500 font-medium">Organization</td>
                            <td className="px-4 py-3 text-gray-900 font-semibold">BHEL - Bharat Heavy Electricals Ltd.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
                      Item Technical Specification
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                      The scope of work includes design, engineering, supply, installation, and commissioning of the item: <span className="font-bold text-gray-900 uppercase">{tender.title}</span>. 
                      Standard compliance as per GeM GTC version 4.0 and additional SITC requirements apply.
                    </p>
                  </section>
                </div>
              )}
              
              {activeTab === 'Documents' && (
                <div className="space-y-4 animate-in fade-in">
                  {[
                    { name: 'Technical_Specification.pdf', size: '2.4 MB', type: 'Technical' },
                    { name: 'Financial_Bid_Format.xlsx', size: '156 KB', type: 'Financial' },
                    { name: 'General_Terms_and_Conditions.pdf', size: '1.1 MB', type: 'GTC' }
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 group transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{doc.name}</div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{doc.type} • {doc.size}</div>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Status Timeline */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h4 className="text-sm font-black text-gray-900 mb-6 uppercase tracking-wider">Tender Timeline</h4>
              <div className="space-y-8 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100"></div>
                {[
                  { label: 'Published', date: tender.publishedDate, completed: true },
                  { label: 'Clarification End', date: '28-12-2025', completed: true },
                  { label: 'Bid Submission End', date: tender.closingDate, completed: false },
                  { label: 'Technical Opening', date: '06-01-2026', completed: false }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className={`w-6 h-6 rounded-full border-4 shrink-0 z-10 flex items-center justify-center bg-white ${
                      step.completed ? 'border-blue-600' : 'border-gray-200'
                    }`}>
                      {step.completed && <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>}
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</div>
                      <div className="text-[10px] font-medium text-gray-400">{step.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assistance Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl shadow-blue-200">
              <ShieldCheck className="w-10 h-10 mb-4 opacity-50" />
              <h4 className="font-bold mb-2">Need Bidding Assistance?</h4>
              <p className="text-xs text-blue-100 mb-4 leading-relaxed">Our experts can help you with documentation and technical submission for this tender.</p>
              <button className="w-full bg-white text-blue-700 py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-50 transition-all">
                Contact Consultant
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/**
 * Tender Card Component: Optimized for high-density information display
 */
const TenderCard = ({ tender, onDetails }) => (
  <div className="bg-white border-b border-gray-100 p-4 md:p-6 hover:bg-gray-50/80 transition-all group">
    <div className="flex flex-col xl:flex-row xl:items-start gap-5">
      
      {/* 1. ID & Category Tag */}
      <div className="w-full xl:w-48 shrink-0 flex xl:block justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">BID NO:</span>
            <span className="text-[11px] font-bold text-gray-700 font-mono">{tender.id}</span>
          </div>
          <span className="inline-flex px-2 py-0.5 text-[10px] font-black rounded uppercase tracking-wider bg-green-100 text-green-700">
            GeM Tender
          </span>
        </div>
        <button className="xl:hidden p-2 text-gray-400 hover:text-blue-600 transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Primary Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[15px] font-bold text-[#1a73e8] hover:text-blue-700 hover:underline cursor-pointer leading-tight mb-2 break-words uppercase">
          {tender.title}
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-500 font-medium">Dept:</span>
            <span className="text-gray-800 font-semibold truncate max-w-[300px] md:max-w-none">
              {tender.department}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Metadata Grid (Dates/Qty/Loc) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 xl:w-[480px] text-[12px] pt-4 xl:pt-0 border-t border-gray-50 xl:border-t-0">
        <div className="space-y-1">
          <span className="text-gray-400 block font-medium">Published</span>
          <span className="text-gray-800 font-bold">{tender.publishedDate.split(' ')[0]}</span>
        </div>
        <div className="space-y-1">
          <span className="text-gray-400 block font-medium">End Date</span>
          <span className={`block font-bold ${tender.isUrgent ? 'text-red-500' : 'text-gray-800'}`}>
            {tender.closingDate.split(' ')[0]}
          </span>
        </div>
        <div className="space-y-1">
          <span className="text-gray-400 block font-medium">Quantity</span>
          <span className="text-gray-800 font-bold">{tender.quantity}</span>
        </div>
        <div className="space-y-1">
          <span className="text-gray-400 block font-medium">Status</span>
          <span className="text-green-600 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Active
          </span>
        </div>
      </div>

      {/* 4. Action Bar */}
      <div className="flex items-center gap-2 shrink-0 pt-2 xl:pt-0">
        <button 
          onClick={() => onDetails(tender)}
          className="flex-1 xl:flex-none bg-white border border-gray-200 px-4 py-2 rounded-lg text-xs font-bold text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all active:scale-95"
        >
          <Eye className="w-4 h-4" /> Details
        </button>
        <button className="hidden xl:flex p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all active:scale-95">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

const AllTendersView = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTender, setSelectedTender] = useState(null);
  
  const tenders = [
    {
      id: "GEM/2025/B/6999790",
      title: "964614520000-HPBP VALVE ACTUAT...",
      department: "Ministry of Heavy Industries | Dept of Heavy Industry",
      publishedDate: "09-12-2025 8:57 AM",
      closingDate: "08-01-2026 11:00 AM",
      quantity: "113",
      isUrgent: false
    },
    {
      id: "GEM/2025/B/7043958",
      title: "Gem Schedule 1 - CS & SS PIPES...",
      department: "Ministry of Heavy Industries | Dept of Heavy Industry",
      publishedDate: "13-12-2025 4:57 PM",
      closingDate: "03-01-2026 5:00 PM",
      quantity: "12",
      isUrgent: true
    },
    {
      id: "GEM/2025/B/7038564",
      title: "HEAVY DUTY PNEUMATIC VERTICAL ...",
      department: "Ministry of Heavy Industries | Dept of Heavy Industry",
      publishedDate: "26-12-2025 9:59 AM",
      closingDate: "05-01-2026 10:00 AM",
      quantity: "45",
      isUrgent: true
    },
    {
      id: "GEM/2025/B/7036279",
      title: "MOBILE PLATFORM",
      department: "Ministry of Heavy Industries | Dept of Heavy Industry",
      publishedDate: "26-12-2025 9:59 AM",
      closingDate: "05-01-2026 10:00 AM",
      quantity: "20",
      isUrgent: true
    },
    {
      id: "GEM/2025/B/7044244",
      title: "Polyester Enamelled Round Copp...",
      department: "Ministry of Heavy Industries | Dept of Heavy Industry",
      publishedDate: "26-12-2025 10:58 AM",
      closingDate: "05-01-2026 2:00 PM",
      quantity: "1313",
      isUrgent: true
    },
    {
      id: "GEM/2025/B/7040299",
      title: "350 MICRON X 750 TO 900 MM WID...",
      department: "Ministry of Heavy Industries | Dept of Heavy Industry",
      publishedDate: "26-12-2025 11:07 AM",
      closingDate: "05-01-2026 4:00 PM",
      quantity: "15000",
      isUrgent: true
    },
    {
      id: "GEM/2025/B/7044665",
      title: "160132670000_REV TOP SW ARM,16...",
      department: "Ministry of Heavy Industries | Dept of Heavy Industry",
      publishedDate: "26-12-2025 11:36 AM",
      closingDate: "05-01-2026 4:00 PM",
      quantity: "460",
      isUrgent: true
    },
    {
      id: "GEM/2025/B/7044620",
      title: "DOUBLE ADHESIVE PAPER TAPE TO ...",
      department: "Ministry of Heavy Industries | Dept of Heavy Industry",
      publishedDate: "26-12-2025 11:58 AM",
      closingDate: "05-01-2026 4:00 PM",
      quantity: "2000",
      isUrgent: true
    },
    {
      id: "GEM/2025/B/7044094",
      title: "ITEM 1: SEPERATOR, DRG. 462110...",
      department: "Ministry of Heavy Industries | Dept of Heavy Industry",
      publishedDate: "26-12-2025 11:52 AM",
      closingDate: "05-01-2026 12:00 PM",
      quantity: "80000",
      isUrgent: true
    },
    {
      id: "GEM/2025/B/7044100",
      title: "Electronic component cleaner (...",
      department: "Ministry of Heavy Industries | Dept of Heavy Industry",
      publishedDate: "26-12-2025 11:50 AM",
      closingDate: "05-01-2026 4:00 PM",
      quantity: "100",
      isUrgent: true
    }
  ];

  // If a tender is selected, show detail view instead of the list
  if (selectedTender) {
    return (
      <TenderDetailView 
        tender={selectedTender} 
        onBack={() => setSelectedTender(null)} 
      />
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50/30">
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900">All Tenders</h1>
          <p className="text-[12px] text-gray-400 font-medium">Showing {tenders.length} items from Ministry of Heavy Industries</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search items or Bid numbers..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 ${
              showFilters 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 shadow-sm'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-xs font-bold hidden sm:inline">Filters</span>
          </button>
          <button className="bg-gray-900 text-white p-2.5 sm:px-4 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-black transition-all shadow-md">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Animated Sidebar Filters */}
        <aside className={`
          ${showFilters ? 'w-64 translate-x-0 opacity-100 p-6' : 'w-0 -translate-x-full opacity-0 p-0 pointer-events-none'}
          transition-all duration-300 ease-in-out border-r border-gray-200 bg-white h-full z-20 flex-shrink-0 absolute lg:relative
        `}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Advanced Filters</h3>
            <button className="text-[10px] font-bold text-blue-600 hover:underline">Clear All</button>
          </div>
          
          <div className="space-y-8">
            <section>
              <h4 className="text-[12px] font-bold text-gray-900 mb-4">Ministry</h4>
              <div className="space-y-3">
                {['Heavy Industries', 'Military Affairs', 'MSME', 'Railways'].map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" defaultChecked={cat === 'Heavy Industries'} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/20" />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </section>

            <section>
              <h4 className="text-[12px] font-bold text-gray-900 mb-4">Deadline Status</h4>
              <div className="space-y-3">
                {['Closing Soon', 'Open', 'Under Review'].map(status => (
                  <label key={status} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{status}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>
        </aside>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="flex flex-col">
            {tenders.map((tender, index) => (
              <TenderCard key={index} tender={tender} onDetails={setSelectedTender} />
            ))}
          </div>
          
          {/* Footer / Pagination */}
          <div className="p-10 flex flex-col items-center gap-4 bg-gray-50/50">
            <div className="flex items-center gap-1">
              <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
              {[1, 2, 3, '...', 12].map((p, i) => (
                <button key={i} className={`hidden sm:flex w-10 h-10 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                  p === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border border-gray-100 text-gray-600 hover:border-gray-300'
                }`}>
                  {p}
                </button>
              ))}
              <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Page 1 of 12</p>
          </div>
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
        <h1 className="text-4xl font-black italic text-gray-900 tracking-tighter">Opportunity X </h1>
        <p className="text-gray-500 mt-2">Sign in to manage your tenders</p>
      </div>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input type="email" defaultValue="admin@example.com" required className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8a2be2] outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input type="password" defaultValue="password" required className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8a2be2] outline-none" />
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
        <h1 className="text-4xl font-black italic text-gray-900 tracking-tighter">Opportunity X </h1>
        <p className="text-gray-500 mt-2">Create your free account</p>
      </div>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onRegister(); }}>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" required className="w-full px-4 py-2 border rounded-lg outline-none" placeholder="First Name" />
          <input type="text" required className="w-full px-4 py-2 border rounded-lg outline-none" placeholder="Last Name" />
        </div>
        <input type="email" required className="w-full px-4 py-2 border rounded-lg outline-none" placeholder="john@example.com" />
        <input type="password" required className="w-full px-4 py-2 border rounded-lg outline-none" placeholder="Password" />
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [companies, setCompanies] = useState([
    { id: 1, name: 'QistonPe', industry: 'Financial Services', location: 'Pune, India', website: 'Wwww.QistonPe.com', filesMap: {} }
  ]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const addCompany = (newCompany) => {
    setCompanies([...companies, newCompany]);
  };

  const updateCompany = (updatedCompany) => {
    setCompanies(companies.map(c => c.id === updatedCompany.id ? updatedCompany : c));
    setSelectedCompany(updatedCompany);
  };

  const deleteCompany = (id) => {
    setCompanies(companies.filter(c => c.id !== id));
  };

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
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
    <div className="flex h-screen bg-blue-500 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-4 shrink-0 overflow-y-auto">
        <div className="mb-8 px-4 pt-2">
          <h1 className="text-3xl font-black italic text-gray-900 tracking-tighter">Opportunity X </h1>
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

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-gray-50/30">
        <header className="h-16 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="font-bold text-gray-800">
            {activeTab === 'CompanyDetails' ? 'Company Details' : activeTab}
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors"><Search className="w-5 h-5" /></button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8a2be2] to-[#d91d81] flex items-center justify-center text-white text-xs font-bold shadow-sm">JD</div>
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
              onDeleteCompany={deleteCompany}
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
              <Button variant="outline" className="mt-4" onClick={() => setActiveTab('Dashboard')}>Go Home</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}