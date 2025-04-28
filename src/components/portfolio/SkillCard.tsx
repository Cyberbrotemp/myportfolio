
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  level: number;
  className?: string;
}

export function SkillCard({ icon, title, level, className }: SkillCardProps) {
  const getLevelText = (level: number) => {
    if (level >= 90) return "Expert";
    if (level >= 75) return "Advanced";
    if (level >= 60) return "Intermediate";
    return "Beginner";
  };

  return (
    <Card className={cn("overflow-hidden group hover:shadow-lg transition-all duration-300", className)}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{title}</h3>
            <div className="mt-2 flex items-center justify-between">
              <div className="w-full max-w-[130px] h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${level}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground ml-2">{getLevelText(level)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
