import { ComingSoon } from "@/components/coming-soon";

export default function Page({ params }: PageProps<"/[locale]/tools">) {
  return <ComingSoon params={params} />;
}
