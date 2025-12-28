import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "School Fees Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ padding: "2rem" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
