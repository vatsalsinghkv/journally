import { JournalProvider } from "@/lib/hooks/use-journal";

type Props = {
  children?: React.ReactNode;
};

export default function Provider({ children }: Props) {
  return <JournalProvider>{children}</JournalProvider>;
}
