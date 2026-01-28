export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <h1>MainLayout</h1>
            {children}
        </div>
    )
}
