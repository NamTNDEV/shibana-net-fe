export default async function AdminMainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <h1>AdminMainLayout</h1>
            {children}
        </div>
    );
}
