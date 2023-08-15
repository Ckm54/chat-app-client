import { BASE_API_URL } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { useNavigate } from "react-router-dom";

const loginFormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters",
  }),
  password: z.string().min(8, {
    message: "Password too short.",
  }),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  // define form
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // login handler
  const loginHandler = async (values: z.infer<typeof loginFormSchema>) => {
    // todo:: add api call to login endpoint
    setError(false);
    setErrorMessage("");
    // todo:: add api call to login endpoint
    try {
      const { username, password } = values;
      setIsLoading(true);

      const response = await axios.post(`${BASE_API_URL}/auth/login`, {
        username,
        password,
      });

      if (response.status !== 200) {
        console.log(response);
        setError(true);
        setErrorMessage(response.data.message);
      }

      toast.success("Login successful");
      // store user in localstorage
      localStorage.setItem("user", response.data.token);

      // navigate user to the chat page
      // delay of 1 second for toast to shows
      setTimeout(() => {
        navigate("/chat", { replace: true });
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      {error && (
        <p className="text-sm text-red-500">
          {errorMessage ?? "Something went wrong"}
        </p>
      )}
      <form onSubmit={form.handleSubmit(loginHandler)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="your cool username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full flex items-center justify-center"
        >
          Login
          {isLoading && <Loader className="w-4 h-4 animate-spin ml-4" />}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
