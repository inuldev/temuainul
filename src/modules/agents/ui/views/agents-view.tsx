"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Memuat Agensi"
      description="Sedang memuat data agensi"
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Gagal Memuat Agensi"
      description="Sesuatu yang tidak diinginkan terjadi"
    />
  );
};
