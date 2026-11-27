import { ComingSoon } from "@/components/coming-soon";

export default function Page({ params }: PageProps<"/[locale]/doctor/profile">) {
  return <ComingSoon params={params} />;
}
