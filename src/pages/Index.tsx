import { Header } from "@/components/Header";
import { OrderForwardingForm } from "@/components/OrderForwardingForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Professional Order Forwarding
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seamlessly forward order confirmations through your proxy shopping service. 
              Create professional-looking emails that maintain your privacy while keeping you informed.
            </p>
          </div>
          
          <OrderForwardingForm />
        </div>
      </main>
      
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Proxy Shopping Dashboard • Private Use Only</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
