import { useTranslations } from "next-intl";
import { EmptyState } from "@/components/empty-state";

export const CancelledState = () => {
  const t = useTranslations("meetings.cancelled");

  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/cancelled.svg"
        title={t("title")}
        description={t("description")}
      />
    </div>
  );
};
