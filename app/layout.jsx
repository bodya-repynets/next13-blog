import "./globals.css";
import AppContext from "./context";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Blog",
  description: "My first blog",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <AppContext>
        <div className="min-h-screen flex flex-col">
        <Navbar />
        {children}
        </div>
      </AppContext>
    </body>
  </html>
);

export default RootLayout;
