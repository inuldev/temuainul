"use client";

import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { DataPagination } from "@/components/data-pagination";

import { columns } from "../components/columns";
import { useAgentsFilters } from "../../hooks/use-agents-filters";

export const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentsFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Belum Ada Agensi"
          description="Buat agen untuk bergabung dalam rapat Anda. Setiap agen akan mengikuti instruksi Anda dan dapat berinteraksi dengan peserta selama panggilan berlangsung."
        />
      )}
    </div>
  );
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
