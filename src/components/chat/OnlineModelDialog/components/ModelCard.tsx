import React from "react";
import { Brain, Eye, Zap, Cloud, Code, AlertTriangle } from "lucide-react";
import { Badge } from "../../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { type OpenRouterModel } from "../../../../lib/openrouter";

interface ModelCardProps {
  model: OpenRouterModel;
  isSelected: boolean;
  onSelect: (model: OpenRouterModel) => void;
  isFree: boolean;
  isEnabled: boolean;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "reasoning":
      return <Brain className="w-4 h-4" />;
    case "multimodal":
      return <Eye className="w-4 h-4" />;
    case "efficient":
      return <Zap className="w-4 h-4" />;
    case "general":
      return <Cloud className="w-4 h-4" />;
    case "instruction":
      return <Code className="w-4 h-4" />;
    default:
      return <Cloud className="w-4 h-4" />;
  }
};

export const ModelCard: React.FC<ModelCardProps> = ({
  model,
  isSelected,
  onSelect,
  isFree,
  isEnabled,
}) => {
  return (
    <Card
      className={`transition-colors ${
        isEnabled
          ? "cursor-pointer hover:bg-accent"
          : "opacity-50 cursor-not-allowed"
      } ${isSelected ? "ring-2 ring-primary" : ""}`}
      onClick={() => isEnabled && onSelect(model)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getCategoryIcon(model.category)}
            {model.name}
          </div>
          <Badge variant={isFree ? "secondary" : "default"} className="text-xs">
            {isFree ? "FREE" : "PAID"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        <p className="text-xs text-muted-foreground h-8">{model.description}</p>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {model.provider}
          </Badge>
          {isFree ? (
            <div className="flex items-center gap-1 text-xs text-amber-600">
              <AlertTriangle className="w-3 h-3" />
              Learns from prompts
            </div>
          ) : (
            <Badge variant="secondary" className="text-xs capitalize">
              {model.category}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
