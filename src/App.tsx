import { Toaster } from "react-hot-toast";
import AuthForm from "./pages/AuthForm";

function App() {
  return (
    <>
      <main className="max-w-2xl mx-auto h-screen flex flex-col justify-center ">
        <AuthForm />
        <Toaster />
      </main>
    </>
  );
}

export default App;
