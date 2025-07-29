import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Package, Send, Mail } from "lucide-react";

interface FormData {
  senderName: string;
  senderEmail: string;
  recipientEmail: string;
  storeName: string;
  customStore: string;
  orderNumber: string;
  productName: string;
  price: string;
  trackingNumber: string;
  estimatedDelivery: string;
  orderStatus: string;
}

const stores = [
  { value: "amazon", label: "Amazon" },
  { value: "temu", label: "Temu" },
  { value: "ebay", label: "eBay" },
  { value: "custom", label: "Custom" }
];

const orderStatuses = [
  { value: "ordered", label: "Ordered" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" }
];

const forwardOrderEmail = async (formData: FormData) => {
  // Mock email forwarding function
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log("Forwarding email with data:", formData);
  return true;
};

export function OrderForwardingForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    senderName: "Joking Shopping Proxy",
    senderEmail: "",
    recipientEmail: "",
    storeName: "",
    customStore: "",
    orderNumber: "",
    productName: "",
    price: "",
    trackingNumber: "",
    estimatedDelivery: "",
    orderStatus: "ordered"
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.senderEmail || !formData.recipientEmail || !formData.orderNumber || !formData.productName) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await forwardOrderEmail(formData);
      toast({
        title: "Email forwarded successfully! 📧",
        description: `Order confirmation for ${formData.productName} has been sent to ${formData.recipientEmail}`,
      });
      
      // Reset form
      setFormData(prev => ({
        ...prev,
        orderNumber: "",
        productName: "",
        price: "",
        trackingNumber: "",
        estimatedDelivery: "",
        orderStatus: "ordered"
      }));
    } catch (error) {
      toast({
        title: "Failed to forward email",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-soft animate-slide-up">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-2">
          <Package className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold">Proxy Order Forwarding</CardTitle>
        <CardDescription className="text-base">
          Forward order confirmations through your proxy shopping service
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sender Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground">Sender Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="senderName">Sender Name *</Label>
                <Input
                  id="senderName"
                  value={formData.senderName}
                  onChange={(e) => handleInputChange("senderName", e.target.value)}
                  placeholder="Joking Shopping Proxy"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="senderEmail">Sender Email *</Label>
                <Input
                  id="senderEmail"
                  type="email"
                  value={formData.senderEmail}
                  onChange={(e) => handleInputChange("senderEmail", e.target.value)}
                  placeholder="proxy@joking.wtf"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipientEmail">Your Email Address *</Label>
              <Input
                id="recipientEmail"
                type="email"
                value={formData.recipientEmail}
                onChange={(e) => handleInputChange("recipientEmail", e.target.value)}
                placeholder="your.real.email@gmail.com"
                required
              />
            </div>
          </div>

          {/* Order Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-accent" />
              <h3 className="font-semibold text-foreground">Order Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Store *</Label>
                <Select value={formData.storeName} onValueChange={(value) => handleInputChange("storeName", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select store" />
                  </SelectTrigger>
                  <SelectContent>
                    {stores.map((store) => (
                      <SelectItem key={store.value} value={store.value}>
                        {store.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {formData.storeName === "custom" && (
                <div className="space-y-2">
                  <Label htmlFor="customStore">Custom Store Name</Label>
                  <Input
                    id="customStore"
                    value={formData.customStore}
                    onChange={(e) => handleInputChange("customStore", e.target.value)}
                    placeholder="Enter custom store name"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="orderStatus">Order Status</Label>
                <Select value={formData.orderStatus} onValueChange={(value) => handleInputChange("orderStatus", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {orderStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orderNumber">Order Number *</Label>
                <Input
                  id="orderNumber"
                  value={formData.orderNumber}
                  onChange={(e) => handleInputChange("orderNumber", e.target.value)}
                  placeholder="#ORD-123456789"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="$29.99"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name *</Label>
              <Textarea
                id="productName"
                value={formData.productName}
                onChange={(e) => handleInputChange("productName", e.target.value)}
                placeholder="Wireless Bluetooth Headphones - Black"
                className="min-h-[80px]"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trackingNumber">Tracking Number</Label>
                <Input
                  id="trackingNumber"
                  value={formData.trackingNumber}
                  onChange={(e) => handleInputChange("trackingNumber", e.target.value)}
                  placeholder="1Z999AA1234567890"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
                <Input
                  id="estimatedDelivery"
                  type="date"
                  value={formData.estimatedDelivery}
                  onChange={(e) => handleInputChange("estimatedDelivery", e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="xl"
            variant="gradient"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Forwarding Email...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Forwarded Email
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}