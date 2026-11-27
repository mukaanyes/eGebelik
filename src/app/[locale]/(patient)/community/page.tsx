import { ComingSoon } from "@/components/coming-soon";

export default function Page({ params }: PageProps<"/[locale]/community">) {
  return <ComingSoon params={params} />;
}
