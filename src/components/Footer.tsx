import { Zap, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <Zap className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold tracking-tighter text-white uppercase italic text-nowrap">ACDC PROS</span>
            </div>
            <p className="text-white/40 text-sm font-light leading-relaxed uppercase tracking-widest max-w-xs">
              Elite home repair consulting for high-performance homeowners. 
              Precision DIY support for the next generation of masters.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={Github} />
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Linkedin} />
              <SocialIcon icon={Mail} />
            </div>
          </div>

          <FooterColumn title="Navigation">
            <FooterLink to="/services">Services</FooterLink>
            <FooterLink to="/online-consulting">Consulting</FooterLink>
            <FooterLink to="/shop">Market</FooterLink>
            <FooterLink to="/tutorials">Tutorials</FooterLink>
          </FooterColumn>

          <FooterColumn title="Elite Services">
            <FooterLink to="/online-consulting">Project Strategy</FooterLink>
            <FooterLink to="/online-consulting">Repair Optimization</FooterLink>
            <FooterLink to="/pros">Project Management</FooterLink>
            <FooterLink to="/estimator">Home Value Optimization</FooterLink>
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterLink to="#">Privacy Policy</FooterLink>
            <FooterLink to="#">Terms of Service</FooterLink>
            <FooterLink to="#">Cookie Policy</FooterLink>
            <FooterLink to="#">Disclaimer</FooterLink>
          </FooterColumn>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/10 gap-8">
          <div className="text-[10px] uppercase tracking-widest font-bold text-white/20">
            © 2026 ACDC PROS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest font-bold text-white/20">
            <button 
              onClick={() => {
                // Clear all cookies
                const cookies = document.cookie.split(";");
                for (let i = 0; i < cookies.length; i++) {
                  const cookie = cookies[i];
                  const eqPos = cookie.indexOf("=");
                  const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
                  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                }
                // Clear local storage
                localStorage.clear();
                // Reload
                window.location.reload();
              }}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              [ CLEAR_SESSION ]
            </button>
            <span>SYSTEM_STATUS: OPTIMAL</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>VERSION: 1.2.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-8">
      <h4 className="text-white font-bold uppercase tracking-widest text-xs">{title}</h4>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-white/40 hover:text-orange-500 text-xs uppercase tracking-widest font-bold transition-colors">
      {children}
    </Link>
  );
}

function SocialIcon({ icon: Icon }: { icon: any }) {
  return (
    <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:text-orange-500 hover:border-orange-500 transition-all">
      <Icon className="w-4 h-4" />
    </a>
  );
}
