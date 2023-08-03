export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-4xl mx-auto h-full w-full">{children}</div>;
}
