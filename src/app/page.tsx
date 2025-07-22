// app/page.tsx
import { fetchSiteLabels } from "@/lib/fetchSiteLabels";

export default async function Home() {
  // Busca os labels do Strapi (API site-ui-label)
  const labels = await fetchSiteLabels();

  // Fallback caso não venha nada
  const welcomeTitle = labels?.welcomeTitle || "Bem-vindo ao Dealer Space";
  const welcomeSubtitle = labels?.welcomeSubtitle || "Selecione uma ferramenta no menu lateral para começar.";

  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-gray-50/30 via-white to-blue-50/30 dark:from-gray-950/30 dark:via-gray-900 dark:to-blue-950/30">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          {welcomeTitle}
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
          {welcomeSubtitle}
        </p>
      </div>
    </div>
  );
}
