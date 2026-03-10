export default async function ClassicProposals({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main>
      <h1>Classic Proposals</h1>
    </main>
  );
}
