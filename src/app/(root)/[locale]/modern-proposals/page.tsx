export default async function ModernProposals({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main>
      <h1>Modern Proposals</h1>
    </main>
  );
}
