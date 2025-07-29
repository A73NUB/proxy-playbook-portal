import { Package, ShoppingBag, Mail } from "lucide-react";

export function Header() {
  return (
    <header className="bg-gradient-subtle border-b border-border/50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Proxy Shopping Dashboard</h1>
              <p className="text-sm text-muted-foreground">Private order forwarding service</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>Email Forwarding</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-accent" />
              <span>Order Management</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}