import { SearchForm } from "@/components/SearchForm";
import { fetchSiteLabels } from "@/lib/fetchSiteLabels";
import { fetchAgentItFolksContent } from "@/lib/fetchAgentItFolksContent";

export default async function AgentePage() {
    const labels = await fetchSiteLabels();
    const apiData = await fetchAgentItFolksContent();

    // Pega o objeto completo do conteúdo (Strapi retorna um array!)
    const agentContent = apiData?.AgentITFolksContent?.[0]
        ? {
            ...apiData.AgentITFolksContent[0],
            quickExample: apiData.quickExample || [],
            comoFunciona: apiData.comoFunciona,
        }
        : null;

    // Pega título global da outra API
    const mainTitle = labels?.headerTitle?.trim() || "Agentes DealerSpace";
    const subTitle = agentContent?.subITFolks || labels?.siteSubtitle || "";

    return (
        <div className="flex-1 min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50/30 via-white to-blue-50/30 dark:from-gray-950/30 dark:via-gray-900 dark:to-blue-950/30">
            <div className="container mx-auto px-4 py-8 space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        {mainTitle}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {subTitle}
                    </p>
                </div>
                {/* Só renderiza se vier tudo certinho */}
                {agentContent && <SearchForm agentContent={agentContent} />}
            </div>
        </div>
    );
}
