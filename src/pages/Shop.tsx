import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, ExternalLink, Download, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { AFFILIATES, type Product } from "../data/market";
import { db } from "../lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    fetchProducts();
    
    const params = new URLSearchParams(window.location.search);
    if (params.get('success')) {
      setNotification({ type: 'success', message: 'Payment successful! Your elite digital asset is now available.' });
      window.history.replaceState({}, '', window.location.pathname);
    } else if (params.get('canceled')) {
      setNotification({ type: 'error', message: 'Checkout canceled. Your order has not been processed.' });
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, "products"), orderBy("name", "asc"));
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDigitalCheckout = async (product: Product) => {
    try {
      setIsCheckoutLoading(product.id);
      
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          price: product.price,
          successUrl: window.location.origin + "/shop?success=true",
          cancelUrl: window.location.origin + "/shop?canceled=true",
        }),
      });

      const session = await response.json();

      if (session.error) {
        // If keys are missing, show a demo success message for now
        if (session.error.includes("environment variable is required") || session.error.includes("API key")) {
          console.warn("Stripe keys missing, simulating success for demo.");
          alert(`DEMO MODE: Stripe keys not configured in Settings. In a live environment, this would redirect to a secure checkout for "${product.name}" ($${product.price}).`);
          window.location.href = window.location.origin + "/shop?success=true";
          return;
        }
        throw new Error(session.error);
      }

      if (session.url) {
        // Direct redirect to Stripe Checkout page
        window.location.href = session.url;
      } else {
        throw new Error("No checkout URL returned from server");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      alert(`Checkout failed: ${err.message || "Please ensure Stripe keys are configured in the Settings menu."}`);
    } finally {
      setIsCheckoutLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-8 p-4 flex items-center gap-4 border ${
                notification.type === 'success' 
                  ? 'bg-green-500/10 border-green-500/50 text-green-400' 
                  : 'bg-red-500/10 border-red-500/50 text-red-400'
              }`}
            >
              {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              <span className="text-sm font-bold uppercase tracking-widest">{notification.message}</span>
              <button 
                onClick={() => setNotification(null)}
                className="ml-auto text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100"
              >
                [Dismiss]
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
              Elite Equipment / 03
            </span>
            <h1 className="text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.85] mb-8">
              Elite <br />
              <span className="text-orange-500">Market</span>
            </h1>
            <p className="text-white/40 text-lg font-light leading-relaxed">
              Our curated selection of professional-grade tools and step-by-step DIY projects. 
              One-stop access to elite equipment and strategic digital blueprints.
            </p>
          </motion.div>

          <div className="flex gap-4">
            <div className="flex items-center gap-4 px-6 py-3 border border-white/10 bg-white/5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 mr-2">Shop Partners:</span>
              {AFFILIATES.map((partner) => (
                <a 
                  key={partner.id}
                  href={partner.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`group/partner p-2 bg-${partner.color}-500/5 border border-${partner.color}-500/30 hover:border-${partner.color}-500 transition-all duration-300`}
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-6 grayscale opacity-50 group-hover/partner:grayscale-0 group-hover/partner:opacity-100 group-hover/partner:scale-110 transition-all duration-500" 
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {loading ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">Syncing Elite Inventory...</span>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onCheckout={() => handleDigitalCheckout(product)}
                isLoading={isCheckoutLoading === product.id}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">No Products Available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onCheckout, isLoading }: { product: Product, onCheckout: () => void, isLoading: boolean }) {
  const affiliate = product.affiliateId ? AFFILIATES.find(a => a.id === product.affiliateId) : null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group bg-black p-8 hover:bg-orange-500 transition-all duration-700 cursor-pointer relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <span className="text-white/20 group-hover:text-black/40 font-mono text-xs tracking-widest">[{product.id}]</span>
          <div className="flex flex-col items-end">
            <span className="text-orange-500 group-hover:text-black font-bold text-[8px] uppercase tracking-widest italic">{product.category}</span>
            {product.hasTutorial && (
              <span className="flex items-center gap-1 text-blue-400 group-hover:text-black mt-1">
                <Zap className="w-2 h-2 fill-current" />
                <span className="text-[7px] font-black uppercase tracking-widest">Tutorial Available</span>
              </span>
            )}
          </div>
        </div>
        
        <div className="aspect-[3/4] mb-8 overflow-hidden bg-white/5">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-black uppercase italic tracking-tighter mb-2">{product.name}</h3>
        <p className="text-white/40 group-hover:text-black/60 text-[10px] font-light leading-relaxed mb-8 uppercase tracking-widest h-12 overflow-hidden">{product.desc}</p>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-black text-white group-hover:text-black italic tracking-tighter">${product.price}</p>
            {product.type === 'physical' && affiliate && (
              <span className="text-[8px] font-bold uppercase tracking-widest text-white/20 group-hover:text-black/40">via {affiliate.name}</span>
            )}
            {product.type === 'digital' && (
              <span className="text-[8px] font-bold uppercase tracking-widest text-blue-400 group-hover:text-black">Digital Asset</span>
            )}
          </div>
          
          {product.type === 'physical' ? (
            <a 
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-white/5 group-hover:bg-black text-white group-hover:text-orange-500 text-[10px] font-bold uppercase tracking-widest text-center border border-white/10 group-hover:border-black transition-all flex items-center justify-center gap-2"
            >
              Buy on {affiliate?.name}
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onCheckout();
              }}
              disabled={isLoading}
              className="w-full py-3 bg-blue-500/10 group-hover:bg-black text-blue-400 group-hover:text-orange-500 text-[10px] font-bold uppercase tracking-widest text-center border border-blue-500/20 group-hover:border-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <>
                  Get Digital Access
                  <Download className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
