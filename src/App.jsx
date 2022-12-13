import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { UsuarioContextProvider } from './context/usuarioContext'
import AppRoute from './routes/AppRoute'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {

  return (
    <UsuarioContextProvider>
      <Elements stripe={stripePromise}>
        <AppRoute />
      </Elements>
    </UsuarioContextProvider>
  )
}

export default App
