import { useCallback, useMemo } from "react";
import { toast } from "sonner";
import {
  OpenRouterClient,
  type OpenRouterModel,
} from "../../../../lib/openrouter";
import { functions } from "@/lib/appwriteClient";
import { useUserConfig } from "@/hooks/useUserConfig";
import { useModels } from "../../../../hooks/api/useModels";

export const useOnlineModels = (
  onModelSelect: (
    model: OpenRouterModel,
    client: OpenRouterClient | null
  ) => void,
  onOpenChange?: (open: boolean) => void
) => {
  const { config } = useUserConfig();
  const { models, isLoading, error } = useModels();

  const freeModels = useMemo(() => models.filter(m => m.isFree), [models]);
  const paidModels = useMemo(() => models.filter(m => !m.isFree), [models]);

  const hasOpenRouterKey = !!config?.openrouterApiKey;
  
  // Commented out for now - focus only on OpenRouter
  // const hasPaidKey = !!(
  //   config?.openaiApiKey ||
  //   config?.googleApiKey ||
  //   config?.anthropicApiKey
  // );
  const hasPaidKey = hasOpenRouterKey; // For now, paid models also use OpenRouter key

  const handleModelSelect = useCallback(
    (model: OpenRouterModel) => {
      // For now, all models use OpenRouter key
      if (!config?.openrouterApiKey) {
        toast.error(`Please add your OpenRouter API key first in Settings.`);
        return;
      }

      // Create keys config with only OpenRouter key for now
      const keys = {
        openrouterApiKey: config?.openrouterApiKey,
        // Future keys - commented out for now
        // openaiApiKey: config?.openaiApiKey,
        // anthropicApiKey: config?.anthropicApiKey,
        // googleApiKey: config?.googleApiKey,
      };

      const client = new OpenRouterClient({
        functions,
        siteUrl: window.location.origin,
        siteName: "Local GPT",
        keys,
      });

      onModelSelect(model, client);
      onOpenChange?.(false);
    },
    [config, onModelSelect, onOpenChange]
  );

  const handleOpenChange = (isOpen: boolean) => {
      onOpenChange?.(isOpen);
  };

  return {
    storedKeys: {
      openrouter: config?.openrouterApiKey,
      // Commented out for now
      // openai: config?.openaiApiKey,
      // google: config?.googleApiKey,
      // anthropic: config?.anthropicApiKey,
    },
    freeModels,
    paidModels,
    isLoading,
    error,
    hasOpenRouterKey,
    hasPaidKey,
    handleModelSelect,
    handleOpenChange,
  };
}; 