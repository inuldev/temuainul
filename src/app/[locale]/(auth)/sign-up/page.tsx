import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";

interface Props {
  params: Promise<{ locale: string }>;
}

const Page = async ({ params }: Props) => {
  const { locale } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect(`/${locale}/dashboard`);
  }

  return <SignUpView />;
};

export default Page;
