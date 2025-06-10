import { z } from "zod";
<<<<<<< HEAD
=======
import { toast } from "sonner";
>>>>>>> 78fdcc1 (prepare for part 2)
import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
<<<<<<< HEAD
import { useToast, toastMessages } from "@/hooks/use-toast-notifications";
=======
>>>>>>> 78fdcc1 (prepare for part 2)
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { MeetingGetOne } from "../../types";
import { meetingsInsertSchema } from "../../schemas";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

export const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
<<<<<<< HEAD
  const toast = useToast();
=======
>>>>>>> 78fdcc1 (prepare for part 2)
  const [agentSearch, setAgentSearch] = useState("");
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );

<<<<<<< HEAD
        toast.success(toastMessages.meeting.created);
=======
>>>>>>> 78fdcc1 (prepare for part 2)
        // TODO: invalidate free tier usage

        onSuccess?.(data.id);
      },
      onError: (error) => {
<<<<<<< HEAD
        toast.error(error.message || toastMessages.meeting.createError);
=======
        toast.error(error.message);
>>>>>>> 78fdcc1 (prepare for part 2)

        // TODO: check if error code is "forbidden", redirect to "/upgrade"
      },
    })
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }
<<<<<<< HEAD
        toast.success(toastMessages.meeting.updated);
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message || toastMessages.meeting.updateError);
=======
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
>>>>>>> 78fdcc1 (prepare for part 2)

        // TODO: check if error code is "forbidden", redirect to "/upgrade"
      },
    })
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues.id });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
      <NewAgentDialog
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
      />
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="mis: Konsultasi" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="agentId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agen</FormLabel>
                <FormControl>
                  <CommandSelect
                    options={(agents.data?.items ?? []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-x-2">
                          <GeneratedAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="border size-6"
                          />
                          <span>{agent.name}</span>
                        </div>
                      ),
                    }))}
                    onSelect={field.onChange}
                    onSearch={setAgentSearch}
                    value={field.value}
                    placeholder="Pilih agen"
                  />
                </FormControl>
                <FormDescription>
                  Tidak menemukan agen yang sesuai?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => setOpenNewAgentDialog(true)}
                  >
                    Buat baru
                  </button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-x-2">
            {onCancel && (
              <Button
                variant="ghost"
                disabled={isPending}
                type="button"
                onClick={() => onCancel()}
              >
                Batal
              </Button>
            )}
            <Button disabled={isPending} type="submit">
              {isEdit ? "Ubah" : "Tambah"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
