import { ComingSoon } from "@/components/coming-soon";

export default function Page({ params }: PageProps<"/[locale]/doctor/calendar">) {
  return <ComingSoon params={params} />;
}
