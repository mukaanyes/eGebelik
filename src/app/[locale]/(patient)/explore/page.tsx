import { ComingSoon } from "@/components/coming-soon";

export default function Page({ params }: PageProps<"/[locale]/explore">) {
  return <ComingSoon params={params} />;
}
