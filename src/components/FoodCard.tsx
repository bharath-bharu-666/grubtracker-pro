import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";

interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  onAddToCart: (id: string) => void;
}

export const FoodCard = ({ 
  id, 
  name, 
  description, 
  price, 
  image, 
  category,
  onAddToCart 
}: FoodCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-hover cursor-pointer">
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <Badge className="absolute top-3 left-3 bg-background/90">
          {category}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-xl font-bold text-primary">${price.toFixed(2)}</span>
        <Button 
          size="icon" 
          variant="hero"
          onClick={() => onAddToCart(id)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
