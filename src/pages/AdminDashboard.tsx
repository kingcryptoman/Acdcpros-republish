import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Plus, Trash2, Edit2, Save, X, LayoutDashboard, Package, Users, Settings, LogOut, Globe } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { Navigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user, profile, loading, isAdmin, logout } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [contractors, setContractors] = useState<any[]>([]);
  const [tutorials, setTutorials] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'leads' | 'contractors' | 'tutorials' | 'services'>('products');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "Step-by-Step",
    image: "",
    desc: "",
    type: "digital",
    affiliateId: "",
    affiliateUrl: "",
    downloadUrl: "",
    hasTutorial: true
  });

  const [contractorForm, setContractorForm] = useState({
    businessName: "",
    email: "",
    trade: "Carpentry",
    experience: "5-10 Years",
    image: "",
    commissionRate: 0.25,
    status: "active"
  });

  const [tutorialForm, setTutorialForm] = useState({
    title: "",
    duration: "",
    author: "",
    category: "Electrical",
    image: "",
    videoUrl: "",
    desc: "",
    isPremium: false
  });

  const [serviceForm, setServiceForm] = useState({
    title: "",
    desc: "",
    iconName: "Shield",
    features: "Feature 1, Feature 2, Feature 3",
    category: "Emergency"
  });

  useEffect(() => {
    if (isAdmin) {
      if (activeTab === 'products') fetchProducts();
      if (activeTab === 'leads') fetchLeads();
      if (activeTab === 'contractors') fetchContractors();
      if (activeTab === 'tutorials') fetchTutorials();
      if (activeTab === 'services') fetchServices();
    }
  }, [isAdmin, activeTab]);

  const fetchProducts = async () => {
    const q = query(collection(db, "products"), orderBy("name", "asc"));
    const querySnapshot = await getDocs(q);
    const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productsList);
  };

  const fetchLeads = async () => {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const leadsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLeads(leadsList);
  };

  const fetchContractors = async () => {
    const q = query(collection(db, "contractors"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const contractorsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setContractors(contractorsList);
  };

  const fetchTutorials = async () => {
    const q = query(collection(db, "tutorials"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const tutorialsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTutorials(tutorialsList);
  };

  const fetchServices = async () => {
    const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const servicesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setServices(servicesList);
  };

  const seedDatabase = async () => {
    if (window.confirm("This will populate the database with initial elite products. Continue?")) {
      const initialProducts = [
        {
          id: "01",
          name: "ACDC-X1 Smart Multimeter",
          price: 249,
          category: "Electrical",
          image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
          desc: "Precision-engineered diagnostic tool with AI-powered fault detection.",
          type: 'physical',
          affiliateId: 'homedepot',
          affiliateUrl: "https://www.homedepot.com/s/multimeter",
          hasTutorial: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "02",
          name: "Elite Disaster Relief Kit",
          price: 899,
          category: "Emergency",
          image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800",
          desc: "Complete sensor suite for water mitigation, cleanup, and structural stabilization.",
          type: 'physical',
          affiliateId: 'lowes',
          affiliateUrl: "https://www.lowes.com/search?searchTerm=disaster+relief+tools",
          hasTutorial: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "07",
          name: "DIY: Master Bathroom Remodel",
          price: 199,
          category: "Step-by-Step",
          image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
          desc: "Complete elite guide to a full bathroom renovation from demolition to final tile.",
          type: 'digital',
          downloadUrl: "#",
          hasTutorial: true,
          createdAt: new Date().toISOString()
        }
      ];

      for (const p of initialProducts) {
        await addDoc(collection(db, "products"), p);
      }
      fetchProducts();
      alert("Database seeded successfully!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, "products", editingId), formData);
      } else {
        await addDoc(collection(db, "products"), {
          ...formData,
          createdAt: new Date().toISOString()
        });
      }
      setFormData({
        name: "",
        price: 0,
        category: "Step-by-Step",
        image: "",
        desc: "",
        type: "digital",
        affiliateId: "",
        affiliateUrl: "",
        downloadUrl: "",
        hasTutorial: true
      });
      setIsAdding(false);
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", id));
      fetchProducts();
    }
  };

  const handleEdit = (product: any) => {
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      desc: product.desc || "",
      type: product.type,
      affiliateId: product.affiliateId || "",
      affiliateUrl: product.affiliateUrl || "",
      downloadUrl: product.downloadUrl || "",
      hasTutorial: product.hasTutorial
    });
    setEditingId(product.id);
    setIsAdding(true);
  };

  const handleContractorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, "contractors", editingId), contractorForm);
      } else {
        await addDoc(collection(db, "contractors"), {
          ...contractorForm,
          createdAt: new Date().toISOString()
        });
      }
      setContractorForm({
        businessName: "",
        email: "",
        trade: "Carpentry",
        experience: "5-10 Years",
        image: "",
        commissionRate: 0.25,
        status: "active"
      });
      setIsAdding(false);
      setEditingId(null);
      fetchContractors();
    } catch (error) {
      console.error("Error saving contractor:", error);
    }
  };

  const handleEditContractor = (con: any) => {
    setContractorForm({
      businessName: con.businessName,
      email: con.email,
      trade: con.trade,
      experience: con.experience,
      image: con.image || "",
      commissionRate: con.commissionRate || 0.25,
      status: con.status
    });
    setEditingId(con.id);
    setIsAdding(true);
  };

  const handleDeleteContractor = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this contractor?")) {
      await deleteDoc(doc(db, "contractors", id));
      fetchContractors();
    }
  };

  const handleTutorialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, "tutorials", editingId), tutorialForm);
      } else {
        await addDoc(collection(db, "tutorials"), {
          ...tutorialForm,
          createdAt: new Date().toISOString()
        });
      }
      setTutorialForm({
        title: "",
        duration: "",
        author: "",
        category: "Electrical",
        image: "",
        videoUrl: "",
        desc: "",
        isPremium: false
      });
      setIsAdding(false);
      setEditingId(null);
      fetchTutorials();
    } catch (error) {
      console.error("Error saving tutorial:", error);
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const serviceData = {
        ...serviceForm,
        features: serviceForm.features.split(',').map(f => f.trim())
      };
      if (editingId) {
        await updateDoc(doc(db, "services", editingId), serviceData);
      } else {
        await addDoc(collection(db, "services"), {
          ...serviceData,
          createdAt: new Date().toISOString()
        });
      }
      setServiceForm({
        title: "",
        desc: "",
        iconName: "Shield",
        features: "Feature 1, Feature 2, Feature 3",
        category: "Emergency"
      });
      setIsAdding(false);
      setEditingId(null);
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div>
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
              Control Center / 09
            </span>
            <h1 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
              Admin <span className="text-orange-500">Dashboard</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={seedDatabase}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-orange-500 hover:text-black transition-all"
            >
              Seed Database
            </button>
            {activeTab !== 'leads' && (
              <button 
                onClick={() => { setIsAdding(true); setEditingId(null); }}
                className="px-8 py-4 bg-orange-500 text-black font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-white transition-all"
              >
                <Plus className="w-4 h-4" /> Add {
                  activeTab === 'products' ? 'Product' : 
                  activeTab === 'contractors' ? 'Contractor' : 
                  activeTab === 'tutorials' ? 'Tutorial' : 'Service'
                }
              </button>
            )}
            <button 
              onClick={logout}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-red-500 hover:border-red-500 transition-all"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <AdminNavItem 
              icon={Package} 
              label="Products" 
              active={activeTab === 'products'} 
              onClick={() => setActiveTab('products')}
            />
            <AdminNavItem 
              icon={LayoutDashboard} 
              label="Project Leads" 
              active={activeTab === 'leads'} 
              onClick={() => setActiveTab('leads')}
            />
            <AdminNavItem 
              icon={Users} 
              label="Contractors" 
              active={activeTab === 'contractors'} 
              onClick={() => setActiveTab('contractors')}
            />
            <AdminNavItem 
              icon={Settings} 
              label="Tutorials" 
              active={activeTab === 'tutorials'} 
              onClick={() => setActiveTab('tutorials')}
            />
            <AdminNavItem 
              icon={Globe} 
              label="Services" 
              active={activeTab === 'services'} 
              onClick={() => setActiveTab('services')}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'products' && (
              isAdding ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 p-8"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold uppercase italic tracking-tighter">
                      {editingId ? "Edit Product" : "Add New Product"}
                    </h2>
                    <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-white/40 hover:text-white">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Product Name</label>
                      <input 
                        required
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Price ($)</label>
                      <input 
                        required
                        type="number"
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none"
                        value={formData.price}
                        onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Category</label>
                      <select 
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none"
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                      >
                        <option>Electrical</option>
                        <option>Plumbing</option>
                        <option>Emergency</option>
                        <option>Pros & Handyman</option>
                        <option>Step-by-Step</option>
                        <option>Strategy</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Type</label>
                      <select 
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none"
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value as any})}
                      >
                        <option value="digital">Digital Asset</option>
                        <option value="physical">Physical Equipment</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Image URL</label>
                      <input 
                        required
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none"
                        value={formData.image}
                        onChange={e => setFormData({...formData, image: e.target.value})}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Description</label>
                      <textarea 
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none h-32"
                        value={formData.desc}
                        onChange={e => setFormData({...formData, desc: e.target.value})}
                      />
                    </div>
                    
                    {formData.type === 'physical' ? (
                      <>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Affiliate ID</label>
                          <input 
                            className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none"
                            value={formData.affiliateId}
                            onChange={e => setFormData({...formData, affiliateId: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Affiliate URL</label>
                          <input 
                            className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none"
                            value={formData.affiliateUrl}
                            onChange={e => setFormData({...formData, affiliateUrl: e.target.value})}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Download URL (Blueprint/Guide)</label>
                        <input 
                          className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none"
                          value={formData.downloadUrl}
                          onChange={e => setFormData({...formData, downloadUrl: e.target.value})}
                        />
                      </div>
                    )}

                    <div className="md:col-span-2 pt-4">
                      <button 
                        type="submit"
                        className="w-full py-4 bg-orange-500 text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all flex items-center justify-center gap-2"
                      >
                        <Save className="w-4 h-4" /> {editingId ? "Update Product" : "Save Product"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <div className="bg-white/5 border border-white/10 overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Product</th>
                        <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Category</th>
                        <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Price</th>
                        <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Type</th>
                        <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-white/10 hover:bg-white/5 transition-colors group">
                          <td className="p-6">
                            <div className="flex items-center gap-4">
                              <img src={product.image} className="w-10 h-10 object-cover border border-white/10" />
                              <span className="font-bold uppercase italic tracking-tighter">{product.name}</span>
                            </div>
                          </td>
                          <td className="p-6 text-xs text-white/60">{product.category}</td>
                          <td className="p-6 font-bold text-orange-500">${product.price}</td>
                          <td className="p-6">
                            <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-1 border ${
                              product.type === 'digital' ? 'border-blue-500/50 text-blue-400' : 'border-orange-500/50 text-orange-500'
                            }`}>
                              {product.type}
                            </span>
                          </td>
                          <td className="p-6">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleEdit(product)}
                                className="p-2 bg-white/5 hover:bg-orange-500 hover:text-black transition-all"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete(product.id)}
                                className="p-2 bg-white/5 hover:bg-red-500 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}

            {activeTab === 'leads' && (
              <div className="bg-white/5 border border-white/10 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Client</th>
                      <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Trade</th>
                      <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Location</th>
                      <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Status</th>
                      <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-white/10 hover:bg-white/5 transition-colors group">
                        <td className="p-6">
                          <div className="flex flex-col">
                            <span className="font-bold uppercase italic tracking-tighter">{lead.name || lead.clientName}</span>
                            <span className="text-[10px] text-white/20 uppercase tracking-widest">{lead.email}</span>
                          </div>
                        </td>
                        <td className="p-6 text-xs text-orange-500 font-bold uppercase">{lead.trade}</td>
                        <td className="p-6 text-xs text-white/60">{lead.location}</td>
                        <td className="p-6">
                          <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-1 border ${
                            lead.status === 'new' ? 'border-green-500 text-green-400' : 'border-white/20 text-white/40'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-6">
                          <button 
                            onClick={async () => {
                              await updateDoc(doc(db, "leads", lead.id), { status: 'dispatched' });
                              fetchLeads();
                            }}
                            className="p-2 bg-white/5 hover:bg-orange-500 hover:text-black transition-all"
                          >
                            Dispatch
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'contractors' && (
              isAdding ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 p-8"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold uppercase italic tracking-tighter">
                      {editingId ? "Edit Contractor" : "Add New Contractor"}
                    </h2>
                    <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-white/40 hover:text-white">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={handleContractorSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Business Name</label>
                      <input 
                        required
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none"
                        value={contractorForm.businessName}
                        onChange={e => setContractorForm({...contractorForm, businessName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Email</label>
                      <input 
                        required
                        type="email"
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none"
                        value={contractorForm.email}
                        onChange={e => setContractorForm({...contractorForm, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Trade</label>
                      <select 
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none"
                        value={contractorForm.trade}
                        onChange={e => setContractorForm({...contractorForm, trade: e.target.value})}
                      >
                        <option>Carpentry</option>
                        <option>Plumbing</option>
                        <option>Landscaping</option>
                        <option>Flooring</option>
                        <option>Roofing</option>
                        <option>Remodeling</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Experience</label>
                      <select 
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none"
                        value={contractorForm.experience}
                        onChange={e => setContractorForm({...contractorForm, experience: e.target.value})}
                      >
                        <option>3-5 Years</option>
                        <option>5-10 Years</option>
                        <option>10+ Years</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Image URL</label>
                      <input 
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none"
                        value={contractorForm.image}
                        onChange={e => setContractorForm({...contractorForm, image: e.target.value})}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Commission Rate (%)</label>
                      <input 
                        type="number"
                        step="0.01"
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none"
                        value={contractorForm.commissionRate}
                        onChange={e => setContractorForm({...contractorForm, commissionRate: Number(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Status</label>
                      <select 
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none"
                        value={contractorForm.status}
                        onChange={e => setContractorForm({...contractorForm, status: e.target.value})}
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>

                    <div className="md:col-span-2 pt-4">
                      <button 
                        type="submit"
                        className="w-full py-4 bg-orange-500 text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all"
                      >
                        <Save className="w-4 h-4 inline mr-2" /> {editingId ? "Update Contractor" : "Save Contractor"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <div className="bg-white/5 border border-white/10 overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Business</th>
                        <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Trade</th>
                        <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Exp</th>
                        <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Status</th>
                        <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contractors.map((con) => (
                        <tr key={con.id} className="border-b border-white/10 hover:bg-white/5 transition-colors group">
                          <td className="p-6">
                            <div className="flex items-center gap-4">
                              {con.image && <img src={con.image} className="w-8 h-8 rounded-full object-cover grayscale" />}
                              <div className="flex flex-col">
                                <span className="font-bold uppercase italic tracking-tighter">{con.businessName}</span>
                                <span className="text-[10px] text-white/20 uppercase tracking-widest">{con.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-6 text-xs text-white/60">{con.trade}</td>
                          <td className="p-6 text-xs text-white/60">{con.experience}</td>
                          <td className="p-6">
                            <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-1 border ${
                              con.status === 'active' ? 'border-orange-500 text-orange-500' : 'border-white/20 text-white/40'
                            }`}>
                              {con.status}
                            </span>
                          </td>
                          <td className="p-6">
                            <div className="flex gap-2">
                              {con.status === 'pending' && (
                                <button 
                                  onClick={async () => {
                                    await updateDoc(doc(db, "contractors", con.id), { status: 'active' });
                                    fetchContractors();
                                  }}
                                  className="px-3 py-1 bg-orange-500 text-black text-[8px] font-bold uppercase tracking-widest"
                                >
                                  Approve
                                </button>
                              )}
                              <button 
                                onClick={() => handleEditContractor(con)}
                                className="p-2 bg-white/5 hover:bg-orange-500 hover:text-black transition-all"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button 
                                onClick={() => handleDeleteContractor(con.id)}
                                className="p-2 bg-white/5 hover:bg-red-500 transition-all"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}

            {activeTab === 'tutorials' && (
              isAdding ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 p-8"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold uppercase italic tracking-tighter">
                      {editingId ? "Edit Tutorial" : "Add New Tutorial"}
                    </h2>
                    <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-white/40 hover:text-white">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <form onSubmit={handleTutorialSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Title</label>
                      <input required className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none" value={tutorialForm.title} onChange={e => setTutorialForm({...tutorialForm, title: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Duration</label>
                      <input required className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none" value={tutorialForm.duration} onChange={e => setTutorialForm({...tutorialForm, duration: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Author</label>
                      <input required className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none" value={tutorialForm.author} onChange={e => setTutorialForm({...tutorialForm, author: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Category</label>
                      <select className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none" value={tutorialForm.category} onChange={e => setTutorialForm({...tutorialForm, category: e.target.value})}>
                        <option>Electrical</option>
                        <option>Plumbing</option>
                        <option>Disaster Relief</option>
                        <option>Remodeling</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Image URL</label>
                      <input required className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none" value={tutorialForm.image} onChange={e => setTutorialForm({...tutorialForm, image: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Video URL</label>
                      <input className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none" value={tutorialForm.videoUrl} onChange={e => setTutorialForm({...tutorialForm, videoUrl: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Description</label>
                      <textarea className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none h-32" value={tutorialForm.desc} onChange={e => setTutorialForm({...tutorialForm, desc: e.target.value})} />
                    </div>
                    <div className="flex items-center gap-4">
                      <input type="checkbox" checked={tutorialForm.isPremium} onChange={e => setTutorialForm({...tutorialForm, isPremium: e.target.checked})} />
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Premium Access</label>
                    </div>
                    <div className="md:col-span-2 pt-4">
                      <button type="submit" className="w-full py-4 bg-orange-500 text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all">
                        <Save className="w-4 h-4 inline mr-2" /> {editingId ? "Update Tutorial" : "Save Tutorial"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <div className="bg-white/5 border border-white/10 overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Tutorial</th>
                        <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Category</th>
                        <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Premium</th>
                        <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tutorials.map((t) => (
                        <tr key={t.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                          <td className="p-6 font-bold uppercase italic tracking-tighter">{t.title}</td>
                          <td className="p-6 text-xs text-white/60">{t.category}</td>
                          <td className="p-6">{t.isPremium ? "YES" : "NO"}</td>
                          <td className="p-6">
                            <div className="flex gap-2">
                              <button onClick={() => { setTutorialForm({...t}); setEditingId(t.id); setIsAdding(true); }} className="p-2 bg-white/5 hover:bg-orange-500 hover:text-black">
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button onClick={async () => { if(window.confirm("Delete?")) { await deleteDoc(doc(db, "tutorials", t.id)); fetchTutorials(); } }} className="p-2 bg-white/5 hover:bg-red-500">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}

            {activeTab === 'services' && (
              isAdding ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 p-8"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold uppercase italic tracking-tighter">
                      {editingId ? "Edit Service" : "Add New Service"}
                    </h2>
                    <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-white/40 hover:text-white">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <form onSubmit={handleServiceSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Title</label>
                      <input required className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none" value={serviceForm.title} onChange={e => setServiceForm({...serviceForm, title: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Category</label>
                      <select className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none" value={serviceForm.category} onChange={e => setServiceForm({...serviceForm, category: e.target.value})}>
                        <option>Emergency</option>
                        <option>Electrical</option>
                        <option>Plumbing</option>
                        <option>Landscaping</option>
                        <option>Remodeling</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Icon (Lucide name)</label>
                      <input required className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none" value={serviceForm.iconName} onChange={e => setServiceForm({...serviceForm, iconName: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Features (comma separated)</label>
                      <input required className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none" value={serviceForm.features} onChange={e => setServiceForm({...serviceForm, features: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Description</label>
                      <textarea required className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none h-32" value={serviceForm.desc} onChange={e => setServiceForm({...serviceForm, desc: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 pt-4">
                      <button type="submit" className="w-full py-4 bg-orange-500 text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all">
                        <Save className="w-4 h-4 inline mr-2" /> {editingId ? "Update Service" : "Save Service"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <div className="bg-white/5 border border-white/10 overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Service</th>
                        <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Category</th>
                        <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((s) => (
                        <tr key={s.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                          <td className="p-6 font-bold uppercase italic tracking-tighter">{s.title}</td>
                          <td className="p-6 text-xs text-white/60">{s.category}</td>
                          <td className="p-6">
                            <div className="flex gap-2">
                              <button onClick={() => { 
                                setServiceForm({
                                  title: s.title,
                                  desc: s.desc,
                                  iconName: s.iconName,
                                  features: s.features.join(', '),
                                  category: s.category
                                }); 
                                setEditingId(s.id); 
                                setIsAdding(true); 
                              }} className="p-2 bg-white/5 hover:bg-orange-500 hover:text-black">
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button onClick={async () => { if(window.confirm("Delete?")) { await deleteDoc(doc(db, "services", s.id)); fetchServices(); } }} className="p-2 bg-white/5 hover:bg-red-500">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminNavItem({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 font-bold uppercase tracking-widest text-xs transition-all ${
        active ? 'bg-orange-500 text-black' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
