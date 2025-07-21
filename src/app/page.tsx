import { SearchForm } from "@/components/SearchForm";

export default function Home() {
  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50/30 via-white to-blue-50/30 dark:from-gray-950/30 dark:via-gray-900 dark:to-blue-950/30">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Agente ITFolks
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Configure parâmetros específicos para encontrar exatamente o que
            você procura
          </p>
        </div>

        <SearchForm />
      </div>
    </div>
  );
}
