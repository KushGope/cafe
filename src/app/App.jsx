import { HashRouter } from "react-router-dom";

import AppRoutes from "./routes";
import { CartProvider } from "../features/cart/CartProvider";

const App = () => {
  return (
    <HashRouter>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </HashRouter>
    
  );
};

export default App;
