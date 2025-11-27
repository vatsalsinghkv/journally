import EntryForm from "@/components/dashboard/EntryForm";

interface Props {
  params: {
    id: string;
  };
}

export default function EditEntryPage({ params }: Props) {
  const { id } = params;

  return <EntryForm mode="edit" id={id} />;
}
