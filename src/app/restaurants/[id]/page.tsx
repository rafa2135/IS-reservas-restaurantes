// app/restaurants/[id]/page.tsx

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RestaurantPage(props: Props) {
  const { id } = await props.params;

  return (
    <main className="p-5">
      <h1 className="text-xl font-bold">Restaurant ID: {id}</h1>
    </main>
  );
}
