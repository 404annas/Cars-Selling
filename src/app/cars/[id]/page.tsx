import CarDetailsContent from "./CarDetailsContent";

interface CarPageProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetailsPage({ params }: CarPageProps) {
  const resolvedParams = await params;
  return <CarDetailsContent id={resolvedParams.id} />;
}
