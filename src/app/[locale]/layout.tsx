import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  return children;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
