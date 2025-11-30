interface Props {
  params: Promise<{ slug: string; section_slug: string }>;
}

export default async function Page({ params }: Readonly<Props>) {
  const { section_slug } = await params;

  return <>{section_slug}</>;
}
