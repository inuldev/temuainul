"use client";

<<<<<<< HEAD
=======
import { toast } from "sonner";
>>>>>>> 78fdcc1 (prepare for part 2)
import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useSuspenseQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { useConfirm } from "@/hooks/use-confirm";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { GeneratedAvatar } from "@/components/generated-avatar";
<<<<<<< HEAD
import { useToast, useToastMessages } from "@/hooks/use-toast-notifications";
=======
>>>>>>> 78fdcc1 (prepare for part 2)

import { UpdateAgentDialog } from "../components/update-agent-dialog";
import { AgentIdViewHeader } from "../components/agent-id-view-header";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
<<<<<<< HEAD
  const toast = useToast();
  const toastMessages = useToastMessages();
=======
>>>>>>> 78fdcc1 (prepare for part 2)
  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
<<<<<<< HEAD
        toast.success(toastMessages.agent.deleted);
=======
>>>>>>> 78fdcc1 (prepare for part 2)
        // TODO: invalidate free tier usage
        router.push("/agents");
      },
      onError: (error) => {
<<<<<<< HEAD
        toast.error(error.message || toastMessages.agent.deleteError);
=======
        toast.error(error.message);
>>>>>>> 78fdcc1 (prepare for part 2)
      },
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Kamu yakin?",
    `Tindakan ini akan menghapus ${data.meetingCount} pertemuan.`
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();
    if (!ok) return;

    await removeAgent.mutateAsync({ id: agentId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemoveAgent}
        />
        <div className="bg-white rounded-lg border">
          <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
            <div className="flex items-center gap-x-3">
              <GeneratedAvatar
                variant="botttsNeutral"
                seed={data.name}
                className="size-10"
              />
              <h2 className="text-2xl font-medium">{data.name}</h2>
            </div>
            <Badge
              variant="outline"
              className="flex items-center gap-x-2 [&>svg]:size-4"
            >
              <VideoIcon className="text-blue-700" />
              {data.meetingCount} Pertemuan
            </Badge>
            <div className="flex flex-col gap-y-4">
              <p className="text-lg font-medium">Instruksi</p>
              <p className="text-neutral-800">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentsIdViewLoading = () => {
  return (
    <LoadingState title="Loading Agent" description="Sedang memuat data agen" />
  );
};

export const AgentsIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agent"
      description="Sesuatu yang tidak diinginkan terjadi"
    />
  );
};
