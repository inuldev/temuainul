"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { useConfirm } from "@/hooks/use-confirm";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

import { ActiveState } from "../components/active-state";
import { UpcomingState } from "../components/upcoming-state";
import { CancelledState } from "../components/cancelled-state";
import { CompletedState } from "../components/completed-state";
import { ProcessingState } from "../components/processing-state";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [UpdateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Kamu yakin?",
    "Tindakan ini akan menghapus pertemuan."
  );

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        // TODO: invalidate free tier usage

        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId });
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={UpdateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {isCancelled && <CancelledState />}
        {isProcessing && <ProcessingState />}
        {isCompleted && <CompletedState data={data} />}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && <UpcomingState meetingId={meetingId} />}
      </div>
    </>
  );
};

export const MeetingsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="Sedang memuat data pertemuan"
    />
  );
};

export const MeetingsIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="Sesuatu yang tidak diinginkan terjadi"
    />
  );
};
