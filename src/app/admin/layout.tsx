import { Toaster } from "learning/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      {children}
      <Toaster />
    </div>
  );
}
