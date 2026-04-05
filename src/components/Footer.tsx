import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-border/70 bg-secondary text-secondary-foreground">
      <div className="container py-14">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div className="max-w-md space-y-4">
            <h4 className="text-lg font-semibold uppercase tracking-[0.28em]">SuperK</h4>
            <p className="text-sm text-secondary-foreground/72">
              A quicker, calmer way to browse standout finds across fashion, home, and everyday tech.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-white"
            >
              Explore the catalog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div>
            <h5 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white">Company</h5>
            <ul className="space-y-2 text-sm text-secondary-foreground/72">
              <li className="cursor-pointer transition-colors hover:text-white">About Us</li>
              <li className="cursor-pointer transition-colors hover:text-white">Careers</li>
              <li className="cursor-pointer transition-colors hover:text-white">Journal</li>
            </ul>
          </div>
          <div>
            <h5 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white">Help</h5>
            <ul className="space-y-2 text-sm text-secondary-foreground/72">
              <li className="cursor-pointer transition-colors hover:text-white">FAQ</li>
              <li className="cursor-pointer transition-colors hover:text-white">Contact Us</li>
              <li className="cursor-pointer transition-colors hover:text-white">Shipping</li>
            </ul>
          </div>
          <div>
            <h5 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white">Policies</h5>
            <ul className="space-y-2 text-sm text-secondary-foreground/72">
              <li className="cursor-pointer transition-colors hover:text-white">Privacy Policy</li>
              <li className="cursor-pointer transition-colors hover:text-white">Terms of Service</li>
              <li className="cursor-pointer transition-colors hover:text-white">Returns</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-xs text-secondary-foreground/55">
          © 2026 SuperK. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
