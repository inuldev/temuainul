import Link from "next/link";
import {
  ChevronRight,
  MoreVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  meetingId: string;
  meetingName: string;
  onEdit: () => void;
  onRemove: () => void;
}

export const MeetingIdViewHeader = ({
  meetingId,
  meetingName,
  onEdit,
  onRemove,
}: Props) => {
  return (
    <div className="flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="font-medium text-xl">
              <Link href="/meetings">Ruang Temu</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-foreground text-xl font-medium [&svg]:size-4">
            <ChevronRight />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className="font-medium text-xl text-foreground"
            >
              <Link href={`/meetings/${meetingId}`}>{meetingName}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit}>
            <PencilIcon className="sie-4  text-black" />
            Ubah
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onRemove}>
            <TrashIcon className="sie-4  text-black" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
