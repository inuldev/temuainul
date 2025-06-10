import { z } from "zod";
<<<<<<< HEAD
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
=======
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
>>>>>>> 78fdcc1 (prepare for part 2)

import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneratedAvatar } from "@/components/generated-avatar";
<<<<<<< HEAD
import { useToast, useToastMessages } from "@/hooks/use-toast-notifications";
=======
>>>>>>> 78fdcc1 (prepare for part 2)

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { AgentGetOne } from "../../types";
<<<<<<< HEAD
import { createAgentsInsertSchema } from "../../schemas";
=======
import { agentsInsertSchema } from "../../schemas";
>>>>>>> 78fdcc1 (prepare for part 2)

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

export const AgentForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: AgentFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
<<<<<<< HEAD
  const toast = useToast();
  const toastMessages = useToastMessages();
  const t = useTranslations("agents");
=======
>>>>>>> 78fdcc1 (prepare for part 2)

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );

<<<<<<< HEAD
        toast.success(toastMessages.agent.created);
=======
>>>>>>> 78fdcc1 (prepare for part 2)
        // TODO: invalidate free tier usage
        onSuccess?.();
      },

      onError: (error) => {
<<<<<<< HEAD
        toast.error(error.message || toastMessages.agent.createError);
=======
        toast.error(error.message);
>>>>>>> 78fdcc1 (prepare for part 2)
        // TODO: check if error code is "forbidden" redirect to "/upgrade"
      },
    })
  );

  const updateAgent = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })
          );
        }
<<<<<<< HEAD
        toast.success(toastMessages.agent.updated);
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message || toastMessages.agent.updateError);
=======
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
>>>>>>> 78fdcc1 (prepare for part 2)
        // TODO: check if error code is "forbidden" redirect to "/upgrade"
      },
    })
  );

<<<<<<< HEAD
  const agentsInsertSchema = createAgentsInsertSchema(t);

=======
>>>>>>> 78fdcc1 (prepare for part 2)
  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending || updateAgent.isPending;

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      updateAgent.mutate({ ...values, id: initialValues.id });
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar
          seed={form.watch("name")}
          variant="botttsNeutral"
          className="border size-16"
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
<<<<<<< HEAD
              <FormLabel>{t("name")}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t("namePlaceholder")} />
=======
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g Guru Matematika" />
>>>>>>> 78fdcc1 (prepare for part 2)
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
<<<<<<< HEAD
              <FormLabel>{t("instructions")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t("instructionsPlaceholder")}
=======
              <FormLabel>Instruksi</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Anda adalah asisten matematika yang membantu menjawab pertanyaan dan membantu tugas dan rumus"
>>>>>>> 78fdcc1 (prepare for part 2)
                />
              </FormControl>
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
  );
};
