import "./globals.css";
import AppContext from "./context";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Blog",
  description: "My first blog",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body className="bg-gradient-to-b from-rose-100 to-rose-200 text-white">
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
