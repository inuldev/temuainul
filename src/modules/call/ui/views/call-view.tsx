"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";

import { CallProvider } from "../components/call-provider";

interface Props {
  meeetingId: string;
}

export const CallView = ({ meeetingId }: Props) => {
  const trpc = useTRPC();
  const t = useTranslations("meetings.completed");

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meeetingId })
  );

  if (data.status === "completed") {
    return (
      <div className="h-screen flex items-center justify-center">
        <ErrorState title={t("title")} description={t("description")} />
      </div>
    );
  }

  return <CallProvider meetingId={meeetingId} meetingName={data.name} />;
};
