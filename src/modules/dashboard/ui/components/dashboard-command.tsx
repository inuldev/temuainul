import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("navigation");

  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder={`Temukan ${t("meetings")} atau ${t("agents")}`}
      />
      <CommandList>
        <CommandItem>{t("meetings")}</CommandItem>
        <CommandItem>{t("agents")}</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
