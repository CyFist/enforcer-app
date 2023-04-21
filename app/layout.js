import Layouthelper from "components/layouthelper";
import TopBar from "components/TopBar";

//refer to https://beta.nextjs.org/docs/api-reference/metadata
export const metadata = {
  title: "Enforcer App",
  icons: {
    icon: "/icons/icon-512x512.png",
    apple: "/icons/icon-144x144.png",
  },
  themeColor: "#1f1f1f",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Layouthelper>
          <nav>
            <TopBar />
          </nav>
          <main>{children}</main>
        </Layouthelper>
      </body>
    </html>
  );
}
