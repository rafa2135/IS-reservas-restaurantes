interface ReservaPageProps {
  params: { id: string };
}

export default async function ReservaPage(props: ReservaPageProps) {
  const { id } = await props.params;

  return (
    <main className="p-5">
      <h1 className="text-xl font-bold">Reserva ID: {id}</h1>
    </main>
  );
}
