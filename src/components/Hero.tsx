import { Button } from "./ui/button";
import heroImage from "@/assets/hero-food.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Delicious Food
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Delivered Fast
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Order from your favorite restaurants and get food delivered to your door in minutes. Fresh, hot, and always on time.
            </p>
            <div className="flex gap-4">
              <Button variant="hero" size="lg">
                Order Now
              </Button>
              <Button variant="outline" size="lg">
                View Menu
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-hover">
              <img 
                src={heroImage} 
                alt="Delicious assorted food" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
