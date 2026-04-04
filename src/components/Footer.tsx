import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-muted/30 mt-12">
      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-lg gradient-pink-purple bg-clip-text text-transparent mb-4">
              ShopZone
            </h4>
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for everything you need at unbeatable prices.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-3">Company</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Blog</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-3">Help</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">FAQ</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Shipping</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-3">Policies</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Returns</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
          © 2026 ShopZone. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
