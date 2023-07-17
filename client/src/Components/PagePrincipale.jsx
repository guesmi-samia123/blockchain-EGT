import {
    Footer,
    Services,
    Transactions,
    Welcomee,
    Loader,
    PendingTransaction,
  } from "./Components";
  import { BrowserRouter } from "react-router-dom";
  
  const PagePrincipale = () => (
    <>
      <Welcomee />
      <PendingTransaction />
      <Services />
      <Transactions />
      <Footer />
    </>
  );
  
  export default PagePrincipale;
  