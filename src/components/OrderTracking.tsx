import { Check, Clock, Package, Truck, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

type OrderStatus = "preparing" | "ready" | "on-the-way" | "delivered";

interface OrderTrackingProps {
  status: OrderStatus;
  orderId: string;
  estimatedTime?: string;
}

export const OrderTracking = ({ status, orderId, estimatedTime }: OrderTrackingProps) => {
  const steps = [
    { id: "preparing", label: "Preparing", icon: Clock },
    { id: "ready", label: "Ready", icon: Package },
    { id: "on-the-way", label: "On the Way", icon: Truck },
    { id: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  const statusIndex = steps.findIndex(step => step.id === status);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Order #{orderId}</span>
          {estimatedTime && (
            <span className="text-sm font-normal text-muted-foreground">
              Est. {estimatedTime}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-border">
            <div 
              className="h-full bg-gradient-primary transition-all duration-500"
              style={{ width: `${(statusIndex / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= statusIndex;
              const isCurrent = index === statusIndex;

              return (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                      isCompleted
                        ? "bg-gradient-primary text-primary-foreground shadow-hover"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted && !isCurrent ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className={cn("w-5 h-5", isCurrent && "animate-pulse")} />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium text-center",
                      isCompleted ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
