import EntryForm from "@/components/dashboard/EntryForm";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditEntryPage({ params }: Props) {
  const { id } = await params;

  return <EntryForm mode="edit" id={id} />;
}
