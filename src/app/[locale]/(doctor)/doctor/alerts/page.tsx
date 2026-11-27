import { ComingSoon } from "@/components/coming-soon";

export default function Page({ params }: PageProps<"/[locale]/doctor/alerts">) {
  return <ComingSoon params={params} />;
}
