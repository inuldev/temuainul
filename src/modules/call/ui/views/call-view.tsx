"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";

import { CallProvider } from "../components/call-provider";

interface Props {
  meeetingId: string;
}

export const CallView = ({ meeetingId }: Props) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meeetingId })
  );

  if (data.status === "completed") {
    return (
      <div className="h-screen flex items-center justify-center">
        <ErrorState
          title="Pertemuan selesai"
          description="Terima kasih telah bergabung"
        />
      </div>
    );
  }

  return <CallProvider meetingId={meeetingId} meetingName={data.name} />;
};
