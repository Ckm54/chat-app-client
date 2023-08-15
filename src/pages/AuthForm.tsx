import React from "react";
import LoginForm from "./auth/Login";
import SignupForm from "./auth/Signup";

const AuthForm = () => {
  const [isLogin, setisLogin] = React.useState(true);

  return (
    <div className="gap-y-4 flex flex-col">
      <h1 className="text-2xl font-semibold">
        {isLogin ? "Login" : "Create account"}
      </h1>
      {isLogin ? <LoginForm /> : <SignupForm />}
      <p>
        {isLogin ? "Not yet registered" : "Already a user"}?{" "}
        <span
          className="text-blue-500 underline underline-offset-4 hover:text-blue-600 transition cursor-pointer"
          onClick={() => setisLogin(!isLogin)}
        >
          {isLogin ? "Signup" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;
