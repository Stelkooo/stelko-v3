import Header from '@/components/global/header/header.global';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
