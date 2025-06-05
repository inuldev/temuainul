import { Dispatch, SetStateAction } from "react";

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
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Temukan Ruang atau Agen AI" />
      <CommandList>
        <CommandItem>Ruang Temu</CommandItem>
        <CommandItem>Agen AI</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
