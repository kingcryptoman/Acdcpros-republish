import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Plus, Trash2, Edit2, Save, X, LayoutDashboard, Package, Users, Settings, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { Navigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user, profile, loading, isAdmin, logout } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
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

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
    const q = query(collection(db, "products"), orderBy("name", "asc"));
    const querySnapshot = await getDocs(q);
    const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productsList);
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
            <button 
              onClick={() => setIsAdding(true)}
              className="px-8 py-4 bg-orange-500 text-black font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-white transition-all"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
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
            <AdminNavItem icon={LayoutDashboard} label="Overview" active />
            <AdminNavItem icon={Package} label="Products" />
            <AdminNavItem icon={Users} label="Users" />
            <AdminNavItem icon={Settings} label="Settings" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {isAdding ? (
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
                      <option>Handyman</option>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminNavItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-4 p-4 font-bold uppercase tracking-widest text-xs transition-all ${
      active ? 'bg-orange-500 text-black' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
    }`}>
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
