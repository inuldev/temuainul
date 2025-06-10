"use client";

import { useEffect, useState } from "react";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
<<<<<<< HEAD
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { LocaleSwitcher } from "@/components/locale-switcher";
=======

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
>>>>>>> 78fdcc1 (prepare for part 2)

import { DashboardCommand } from "./dashboard-command";

export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);
<<<<<<< HEAD
  const t = useTranslations("common");
=======
>>>>>>> 78fdcc1 (prepare for part 2)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
<<<<<<< HEAD
        e.preventDefault();
=======
        e.preventDefault;
>>>>>>> 78fdcc1 (prepare for part 2)
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
        <Button className="size-9" variant="outline" onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
<<<<<<< HEAD

        {/* Search button - responsive width */}
        <Button
          className="h-9 flex-1 max-w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
=======
        <Button
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
>>>>>>> 78fdcc1 (prepare for part 2)
          variant="outline"
          size="sm"
          onClick={() => setCommandOpen((open) => !open)}
        >
<<<<<<< HEAD
          <SearchIcon className="size-4" />
          <span className="hidden sm:inline ml-2">
            {t("search")} Ruang atau Agen AI
          </span>
          <span className="sm:hidden ml-2">{t("search")}...</span>

          {/* Hide keyboard shortcut on mobile */}
          <kbd className="ml-auto pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>

        {/* Locale Switcher */}
        <LocaleSwitcher />
=======
          <SearchIcon />
          Cari Ruang atau Agen AI
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>
>>>>>>> 78fdcc1 (prepare for part 2)
      </nav>
    </>
  );
};
