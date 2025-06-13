// components/PayPalProvider.jsx
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PayPalProvider({ children }) {
  return (
    <PayPalScriptProvider options={{ "client-id": "AQv6n3H1QQU06eoSwmLmo2mDjXS83CUxThSIz4M65bvOpfOxGakDCOxyk0F5tUFxKYsar35P9utQHjca" }}>
      {children}
    </PayPalScriptProvider>
  );
}
