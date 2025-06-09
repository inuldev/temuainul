# 🌍 Internationalization (i18n) Guide

Temu.AI mendukung multi-language dengan menggunakan `next-intl` untuk memberikan pengalaman yang lebih baik bagi pengguna dari berbagai negara.

## 🚀 Bahasa yang Didukung

- 🇮🇩 **Bahasa Indonesia** (default) - `id`
- 🇺🇸 **English** - `en`

## 📁 Struktur File

```
src/
├── i18n/
│   ├── config.ts              # Konfigurasi i18n
│   ├── messages/
│   │   ├── id.json           # Terjemahan Bahasa Indonesia
│   │   └── en.json           # Terjemahan English
│   └── __tests__/
│       └── config.test.ts    # Test untuk konfigurasi
├── middleware.ts             # Middleware untuk routing locale
└── app/
    └── [locale]/            # Route dengan locale parameter
```

## 🔧 Konfigurasi

### next.config.ts

```typescript
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/config.ts");

export default withNextIntl(nextConfig);
```

### middleware.ts

```typescript
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/config";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});
```

## 📝 Cara Menggunakan

### 1. Menggunakan Translations dalam Component

```typescript
import { useTranslations } from "next-intl";

export const MyComponent = () => {
  const t = useTranslations("common");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
```

### 2. Menggunakan Toast Messages dengan i18n

```typescript
import { useToast, useToastMessages } from "@/hooks/use-toast-notifications";

export const MyComponent = () => {
  const toast = useToast();
  const toastMessages = useToastMessages();

  const handleSuccess = () => {
    toast.success(toastMessages.agent.created);
  };
};
```

### 3. Menggunakan Schema Validation dengan i18n

```typescript
import { useTranslations } from "next-intl";
import { createAgentsInsertSchema } from "@/modules/agents/schemas";

export const AgentForm = () => {
  const t = useTranslations("agents");
  const schema = createAgentsInsertSchema(t);

  // Use schema with react-hook-form
};
```

## 🎯 Komponen yang Sudah Mendukung i18n

### ✅ UI Components

- `ErrorState` - Error messages dan button labels
- `LoadingState` - Loading messages
- `LocaleSwitcher` - Language switcher

### ✅ Dashboard Components

- `DashboardNavbar` - Search placeholder dan labels
- `DashboardSidebar` - Navigation labels
- `DashboardCommand` - Search placeholder
- `DashboardUserButton` - Sign out label

### ✅ Feature Modules

- `AgentForm` - Form labels dan validation messages
- `CancelledState` - Meeting cancelled messages
- `CallView` - Meeting completed messages

### ✅ Hooks

- `useToastMessages` - Internationalized toast messages
- `useToast` - Compatible dengan i18n messages

## 📋 Translation Keys Structure

### Common Keys

```json
{
  "common": {
    "loading": "Loading...",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "create": "Create",
    "search": "Search"
  }
}
```

### Navigation Keys

```json
{
  "navigation": {
    "dashboard": "Dashboard",
    "agents": "AI Agents",
    "meetings": "Meetings",
    "signOut": "Sign Out"
  }
}
```

### Feature-specific Keys

```json
{
  "agents": {
    "title": "AI Agents",
    "create": "Create Agent",
    "name": "Agent Name",
    "instructions": "Instructions",
    "validation": {
      "nameRequired": "Name is required",
      "instructionsRequired": "Instructions are required"
    }
  }
}
```

## 🔄 Menambah Bahasa Baru

### 1. Update Konfigurasi

```typescript
// src/i18n/config.ts
export const locales = ["id", "en", "fr"] as const; // Tambah "fr"

export const localeNames: Record<Locale, string> = {
  id: "Bahasa Indonesia",
  en: "English",
  fr: "Français", // Tambah French
};

export const localeFlags: Record<Locale, string> = {
  id: "🇮🇩",
  en: "🇺🇸",
  fr: "🇫🇷", // Tambah flag French
};
```

### 2. Buat File Translation

```bash
# Buat file translation baru
touch src/i18n/messages/fr.json
```

### 3. Copy dan Translate

```json
// src/i18n/messages/fr.json
{
  "common": {
    "loading": "Chargement...",
    "save": "Enregistrer",
    "cancel": "Annuler"
  }
}
```

## 🧪 Testing

### Test Konfigurasi

```bash
npm run test:i18n
```

### Test Components dengan i18n

```typescript
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

const renderWithIntl = (component: React.ReactElement, locale = "id") => {
  const messages = require(`../i18n/messages/${locale}.json`);

  return render(
    <NextIntlClientProvider messages={messages} locale={locale}>
      {component}
    </NextIntlClientProvider>
  );
};
```

## 🚀 Best Practices

### 1. Konsistensi Key Names

- Gunakan camelCase untuk key names
- Kelompokkan keys berdasarkan feature/module
- Gunakan nested objects untuk organisasi yang lebih baik

### 2. Fallback Values

- Selalu sediakan fallback untuk missing translations
- Gunakan English sebagai fallback language

### 3. Performance

- Lazy load translations jika diperlukan
- Gunakan static generation untuk better performance

### 4. Maintenance

- Update semua language files saat menambah key baru
- Gunakan TypeScript untuk type safety
- Test semua languages secara regular

## 🔗 Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js Internationalization](https://nextjs.org/docs/advanced-features/i18n)
- [React Intl](https://formatjs.io/docs/react-intl/)

## 🆘 Troubleshooting

### Missing Translation Keys

Jika ada key yang missing, component akan menampilkan key name sebagai fallback.

### Locale Not Found

Middleware akan redirect ke default locale jika locale tidak ditemukan.

### Hydration Errors

Pastikan locale yang sama digunakan di server dan client side.
