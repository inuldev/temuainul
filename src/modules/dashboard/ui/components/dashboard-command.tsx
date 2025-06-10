import { Dispatch, SetStateAction } from "react";
<<<<<<< HEAD
import { useTranslations } from "next-intl";
=======
>>>>>>> 78fdcc1 (prepare for part 2)

import {
  CommandResponsiveDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
<<<<<<< HEAD
  const t = useTranslations("navigation");

  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder={`Temukan ${t("meetings")} atau ${t("agents")}`}
      />
      <CommandList>
        <CommandItem>{t("meetings")}</CommandItem>
        <CommandItem>{t("agents")}</CommandItem>
=======
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Temukan Ruang atau Agen AI" />
      <CommandList>
        <CommandItem>Ruang Temu</CommandItem>
        <CommandItem>Agen AI</CommandItem>
>>>>>>> 78fdcc1 (prepare for part 2)
      </CommandList>
    </CommandResponsiveDialog>
  );
};
