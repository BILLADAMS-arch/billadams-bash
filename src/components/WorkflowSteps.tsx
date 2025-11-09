import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowStepsProps {
  currentStep: "rsvp" | "gifts" | "guestbook";
}

export const WorkflowSteps = ({ currentStep }: WorkflowStepsProps) => {
  const steps = [
    { id: "rsvp", label: "RSVP", description: "Confirm attendance" },
    { id: "gifts", label: "Bill's Wish List", description: "Reserve a gift" },
    { id: "guestbook", label: "Guestbook", description: "Leave a message" },
  ];

  const getStepStatus = (stepId: string) => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    const stepIndex = steps.findIndex(s => s.id === stepId);
    
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-2 md:space-x-4">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                    status === "completed" && "bg-primary border-primary text-primary-foreground",
                    status === "current" && "bg-accent border-accent text-accent-foreground animate-pulse",
                    status === "upcoming" && "bg-muted border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {status === "completed" ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      status === "current" && "text-foreground",
                      status !== "current" && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground hidden md:block">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-12 md:w-24 h-0.5 mx-2",
                    status === "completed" ? "bg-primary" : "bg-muted-foreground/30"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};