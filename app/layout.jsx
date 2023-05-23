import "@styles/global.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
export const metadata = {
  title: "Promptopia",
  description: "This fullstack app is about sharing & making prompts",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="eng">
      <Provider>
        <body suppressHydrationWarning={true}>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </body>
      </Provider>
    </html>
  );
};

export default RootLayout;
