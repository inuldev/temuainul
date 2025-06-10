"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
<<<<<<< HEAD
import { useTranslations } from "next-intl";
=======
>>>>>>> 78fdcc1 (prepare for part 2)

import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";

import { CallProvider } from "../components/call-provider";

interface Props {
  meeetingId: string;
}

export const CallView = ({ meeetingId }: Props) => {
  const trpc = useTRPC();
<<<<<<< HEAD
  const t = useTranslations("meetings.completed");
=======
>>>>>>> 78fdcc1 (prepare for part 2)

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meeetingId })
  );

  if (data.status === "completed") {
    return (
      <div className="h-screen flex items-center justify-center">
<<<<<<< HEAD
        <ErrorState title={t("title")} description={t("description")} />
=======
        <ErrorState
          title="Pertemuan selesai"
          description="Terima kasih telah bergabung"
        />
>>>>>>> 78fdcc1 (prepare for part 2)
      </div>
    );
  }

  return <CallProvider meetingId={meeetingId} meetingName={data.name} />;
};
