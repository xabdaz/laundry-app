import { getEtalase } from "@/services/pos";
import MainContent from "@/components/MainContent";

export default async function EtalasePage() {
  const response = await getEtalase();
  const data = response?.data || [];

  return <MainContent data={data} />;
}
