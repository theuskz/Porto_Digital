import "./globals.css";
import QueryProvider from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Porto Digital ERP",
  description: "Sistema de Gestão Portuária",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-950 text-white">
        <QueryProvider>
          {children}
          <Toaster richColors />
        </QueryProvider>
      </body>
    </html>
  );
}