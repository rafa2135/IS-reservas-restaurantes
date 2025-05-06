type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReservaPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="p-5">
      <h1 className="text-xl font-bold">Reserva ID: {id}</h1>
    </main>
  );
}
