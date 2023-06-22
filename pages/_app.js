import "bootstrap/dist/css/bootstrap.min.css";
import SSRProvider from "react-bootstrap/SSRProvider";
import useSession from "@lib/session";
import Navigation from "@components/Navigation";
import "./_app.css";

export default function App({ Component, pageProps }) {
  const session = useSession();
  const newPageProps = {
    ...pageProps,
    session,
  };
  return (
    <SSRProvider>
      <Navigation session={session} />
      {/* <div className="balkenH" style={{ background:"turquoise", width:"1vw", height:"100vh", marginLeft:'8rem', position:"fixed", top:0}}/> */}
      {/* <div className="balkenW" style={{ background:"turquoise", width:"100vw", height:"1vw", marginBottom:'5rem', position:"fixed", bottom:0}}/> */}
      <main className="page">
        <Component {...newPageProps} />
      </main>
    </SSRProvider>
  );
}
