type Props = {
  children?: React.ReactNode;
};

export default function Provider({ children }: Props) {
  return <>{children}</>;
}
