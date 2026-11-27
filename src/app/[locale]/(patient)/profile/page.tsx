import { ComingSoon } from "@/components/coming-soon";

export default function Page({ params }: PageProps<"/[locale]/profile">) {
  return <ComingSoon params={params} />;
}
