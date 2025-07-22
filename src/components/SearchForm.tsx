"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Building,
  Users,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Send,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

// Tipagem baseada no que vem do Strapi
interface QuickExample {
  title: string;
  description: string;
  location: string;
}

interface AgentITFolksContent {
  mainTitle: string;
  subtitle: string;
  searchTitle: string;
  searchSubtitle: string;
  groupLabel: string;
  groupPlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  cityLabel: string;
  cityPlaceholder: string;
  stateLabel: string;
  statePlaceholder: string;
  searchButton: string;
  clearButton: string;
  BuscaPersonalizadaSub?: string;
  completeLabel?: string;
  subITFolks?: string;
  quickExample: QuickExample[];
  comoFunciona?: {
    labelComoFunciona: string;
    discricao: { children: { text: string }[] }[];
  };
}

interface SearchFormProps {
  agentContent: AgentITFolksContent;
  className?: string;
}

const ESTADOS_BRASIL = [
  { value: "", label: "Selecione o estado" },
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

interface FormData {
  grupo: string;
  marca: string;
  cidade: string;
  estado: string;
}

export function SearchForm({ agentContent}: SearchFormProps) {
  const [formData, setFormData] = useState<FormData>({
    grupo: "",
    marca: "",
    cidade: "",
    estado: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>(
    {}
  );

  const N8N_WEBHOOK_URL =
    "https://n8n.itfolkstech.com/webhook/abe18e3c-e8d0-4cd7-b3b8-53b9abf0697f";

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Limpa erro de validação ao digitar
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};

    if (!formData.grupo.trim()) errors.grupo = "Campo obrigatório";
    if (!formData.marca.trim()) errors.marca = "Campo obrigatório";
    if (!formData.cidade.trim()) errors.cidade = "Campo obrigatório";
    if (!formData.estado.trim()) errors.estado = "Campo obrigatório";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const fillExample = (example: QuickExample) => {
    setFormData({
      grupo: example.description,
      marca: example.title,
      cidade: example.location.split(",")[0].trim(),
      estado: example.location.split(",")[1]?.trim() || "",
    });
    setValidationErrors({});
    toast.success("Exemplo preenchido!", {
      description: "Você pode editar os campos conforme necessário.",
    });
  };

  const clearForm = () => {
    setFormData({ grupo: "", marca: "", cidade: "", estado: "" });
    setValidationErrors({});
    toast.info("Formulário limpo");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Preencha todos os campos obrigatórios", {
        description: "Verifique os campos destacados em vermelho.",
      });
      return;
    }

    setIsLoading(true);

    // Toast de loading
    const loadingToast = toast.loading("Enviando sua busca...", {
      description: "Processando dados e conectando com o sistema.",
    });

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      toast.dismiss(loadingToast);

      toast.success("🎉 Busca enviada com sucesso!", {
        description:
          "Verifique seu dashboard em alguns minutos para ver os resultados.",
        duration: 5000,
        action: {
          label: "Ver Dashboard",
          onClick: () => console.log("Navegar para dashboard"),
        },
      });

      setFormData({ grupo: "", marca: "", cidade: "", estado: "" });
    } catch (error) {
      toast.dismiss(loadingToast);

      toast.error("❌ Erro ao enviar busca", {
        description:
          error instanceof Error
            ? error.message
            : "Erro desconhecido. Tente novamente.",
        duration: 7000,
        action: {
          label: "Tentar novamente",
          onClick: () => handleSubmit(e),
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.grupo && formData.marca && formData.cidade && formData.estado;
  const completionPercentage =
    Object.values(formData).filter(Boolean).length * 25;

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white/80 to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 backdrop-blur-sm">
        {/* Header com gradiente */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-purple-500" />

        <CardHeader className="space-y-4 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-primary/20 to-blue-500/20 ring-1 ring-primary/30">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {agentContent.searchTitle}
                </CardTitle>
                <CardDescription className="text-base">
                  {agentContent.searchSubtitle}
                </CardDescription>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1" />
                {completionPercentage}% {agentContent.completeLabel || "completo"}
              </Badge>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-700 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Linha 1: Grupo e Marca */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label
                  htmlFor="grupo"
                  className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  <Users className="h-4 w-4 text-primary" />
                  {agentContent.groupLabel} <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="grupo"
                    type="text"
                    placeholder={agentContent.groupPlaceholder}
                    value={formData.grupo}
                    onChange={(e) => handleInputChange("grupo", e.target.value)}
                    onFocus={() => setFocusedField("grupo")}
                    onBlur={() => setFocusedField(null)}
                    disabled={isLoading}
                    className={`transition-all duration-200 ${focusedField === "grupo"
                        ? "ring-2 ring-primary/50 border-primary"
                        : validationErrors.grupo
                          ? "ring-2 ring-red-500/50 border-red-500"
                          : ""
                      }`}
                  />
                  {validationErrors.grupo && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                      <AlertTriangle className="h-3 w-3" />
                      {validationErrors.grupo}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="marca"
                  className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  <Building className="h-4 w-4 text-primary" />
                  {agentContent.companyLabel} <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="marca"
                    type="text"
                    placeholder={agentContent.companyPlaceholder}
                    value={formData.marca}
                    onChange={(e) => handleInputChange("marca", e.target.value)}
                    onFocus={() => setFocusedField("marca")}
                    onBlur={() => setFocusedField(null)}
                    disabled={isLoading}
                    className={`transition-all duration-200 ${focusedField === "marca"
                        ? "ring-2 ring-primary/50 border-primary"
                        : validationErrors.marca
                          ? "ring-2 ring-red-500/50 border-red-500"
                          : ""
                      }`}
                  />
                  {validationErrors.marca && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                      <AlertTriangle className="h-3 w-3" />
                      {validationErrors.marca}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Linha 2: Cidade e Estado */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label
                  htmlFor="cidade"
                  className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  {agentContent.cityLabel} <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="cidade"
                    type="text"
                    placeholder={agentContent.cityPlaceholder}
                    value={formData.cidade}
                    onChange={(e) =>
                      handleInputChange("cidade", e.target.value)
                    }
                    onFocus={() => setFocusedField("cidade")}
                    onBlur={() => setFocusedField(null)}
                    disabled={isLoading}
                    className={`transition-all duration-200 ${focusedField === "cidade"
                        ? "ring-2 ring-primary/50 border-primary"
                        : validationErrors.cidade
                          ? "ring-2 ring-red-500/50 border-red-500"
                          : ""
                      }`}
                  />
                  {validationErrors.cidade && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                      <AlertTriangle className="h-3 w-3" />
                      {validationErrors.cidade}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="estado"
                  className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  {agentContent.stateLabel} <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <select
                    id="estado"
                    value={formData.estado}
                    onChange={(e) =>
                      handleInputChange("estado", e.target.value)
                    }
                    onFocus={() => setFocusedField("estado")}
                    onBlur={() => setFocusedField(null)}
                    disabled={isLoading}
                    className={`w-full px-3 py-2 text-sm border rounded-md bg-background focus:outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${focusedField === "estado"
                        ? "ring-2 ring-primary/50 border-primary"
                        : validationErrors.estado
                          ? "ring-2 ring-red-500/50 border-red-500"
                          : "border-input"
                      }`}
                  >
                    {ESTADOS_BRASIL.map((estado) => (
                      <option key={estado.value} value={estado.value}>
                        {estado.label}
                      </option>
                    ))}
                  </select>
                  {validationErrors.estado && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                      <AlertTriangle className="h-3 w-3" />
                      {validationErrors.estado}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                size="lg"
                className="flex-1 h-12 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {agentContent.searchButton}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    {agentContent.searchButton}
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={clearForm}
                disabled={isLoading}
                className="h-12 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                {agentContent.clearButton}
              </Button>
            </div>
          </form>

          {/* Exemplos rápidos */}
          {agentContent.quickExample && agentContent.quickExample.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-border/50">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Exemplos rápidos para começar:
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {agentContent.quickExample.map((example, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => fillExample(example)}
                    disabled={isLoading}
                    className="p-3 text-left rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                      {example.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {example.description}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {example.location}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Informações adicionais */}
          {agentContent.comoFunciona && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50 mt-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                    {agentContent.comoFunciona.labelComoFunciona}
                  </h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    {agentContent.comoFunciona.discricao.map((d, i) => (
                      <li key={i}>
                        {d.children.map((c, j) => c.text).join(" ")}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
