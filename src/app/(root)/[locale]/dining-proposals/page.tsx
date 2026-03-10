export default async function DiningProposals({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main>
      <h1>Dining Proposals</h1>
    </main>
  );
}
