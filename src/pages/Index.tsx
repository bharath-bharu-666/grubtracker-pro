import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FoodCard } from "@/components/FoodCard";
import { Cart } from "@/components/Cart";
import { OrderTracking } from "@/components/OrderTracking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Import food images
import burgerImg from "@/assets/burger.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import sushiImg from "@/assets/sushi.jpg";
import saladImg from "@/assets/salad.jpg";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

type OrderStatus = "preparing" | "ready" | "on-the-way" | "delivered";

interface Order {
  id: string;
  status: OrderStatus;
  estimatedTime: string;
}

const foodItems = [
  {
    id: "1",
    name: "Classic Burger",
    description: "Juicy beef patty with fresh lettuce, tomatoes, cheese on a sesame bun",
    price: 12.99,
    image: burgerImg,
    category: "Burgers",
  },
  {
    id: "2",
    name: "Margherita Pizza",
    description: "Fresh mozzarella, basil leaves, and tomato sauce on thin crust",
    price: 15.99,
    image: pizzaImg,
    category: "Pizza",
  },
  {
    id: "3",
    name: "Sushi Platter",
    description: "Assorted nigiri and maki rolls with fresh fish and avocado",
    price: 24.99,
    image: sushiImg,
    category: "Sushi",
  },
  {
    id: "4",
    name: "Healthy Salad Bowl",
    description: "Mixed greens, cherry tomatoes, cucumbers, avocado, and grilled chicken",
    price: 10.99,
    image: saladImg,
    category: "Salads",
  },
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  const handleAddToCart = (id: string) => {
    const item = foodItems.find((f) => f.id === id);
    if (!item) return;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // Simulate order creation
    const orderId = Math.random().toString(36).substring(7).toUpperCase();
    setCurrentOrder({
      id: orderId,
      status: "preparing",
      estimatedTime: "25-30 mins",
    });

    // Simulate status updates
    setTimeout(() => {
      setCurrentOrder((prev) => prev ? { ...prev, status: "ready" } : null);
    }, 3000);

    setTimeout(() => {
      setCurrentOrder((prev) => prev ? { ...prev, status: "on-the-way" } : null);
    }, 6000);

    setTimeout(() => {
      setCurrentOrder((prev) => prev ? { ...prev, status: "delivered" } : null);
    }, 9000);

    setCartItems([]);
    setIsCartOpen(false);

    toast({
      title: "Order placed!",
      description: `Your order #${orderId} has been placed successfully.`,
    });
  };

  const categories = ["All", ...new Set(foodItems.map((item) => item.category))];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <Hero />

      <section className="container py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Popular Dishes</h2>
          <p className="text-muted-foreground">
            Order your favorite meals from top restaurants
          </p>
        </div>

        <Tabs defaultValue="All" className="w-full">
          <TabsList className="mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {foodItems
                  .filter((item) => category === "All" || item.category === category)
                  .map((item) => (
                    <FoodCard
                      key={item.id}
                      {...item}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {currentOrder && (
        <section className="container pb-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Track Your Order</h2>
            <OrderTracking
              orderId={currentOrder.id}
              status={currentOrder.status}
              estimatedTime={currentOrder.estimatedTime}
            />
          </div>
        </section>
      )}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;
