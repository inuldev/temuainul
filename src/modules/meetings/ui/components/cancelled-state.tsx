<<<<<<< HEAD
import { useTranslations } from "next-intl";
import { EmptyState } from "@/components/empty-state";

export const CancelledState = () => {
  const t = useTranslations("meetings.cancelled");

=======
import { EmptyState } from "@/components/empty-state";

export const CancelledState = () => {
>>>>>>> 78fdcc1 (prepare for part 2)
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/cancelled.svg"
<<<<<<< HEAD
        title={t("title")}
        description={t("description")}
=======
        title="Pertemuan dibatalkan"
        description="Pertemuan telah dibatalkan oleh pemilik pertemuan"
>>>>>>> 78fdcc1 (prepare for part 2)
      />
    </div>
  );
};
