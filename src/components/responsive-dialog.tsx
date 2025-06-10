"use client";

<<<<<<< HEAD
import * as React from "react";

=======
>>>>>>> 78fdcc1 (prepare for part 2)
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
<<<<<<< HEAD
  DrawerHeader,
  DrawerTitle,
=======
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
>>>>>>> 78fdcc1 (prepare for part 2)
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
<<<<<<< HEAD
  DialogDescription,
  DialogHeader,
  DialogTitle,
=======
  DialogHeader,
  DialogTitle,
  DialogDescription,
>>>>>>> 78fdcc1 (prepare for part 2)
} from "@/components/ui/dialog";

interface ResponsiveDialogProps {
  title: string;
  description: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResponsiveDialog = ({
  title,
  description,
  children,
  open,
  onOpenChange,
}: ResponsiveDialogProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
