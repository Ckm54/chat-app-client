import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import * as z from "zod";
import React from "react";
import { Loader } from "lucide-react";
import axios from "axios";
import { BASE_API_URL } from "@/lib/constants";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IRegisterData {
  fullName: string;
  email: string;
  password: string;
  username: string;
}

const signupFormSchema = z
  .object({
    username: z.string().min(3, {
      message: "Username must be at least 3 characters",
    }),
    fullName: z.string(),
    password: z.string().min(6, {
      message: "Password too short.",
    }),
    email: z.string().email(),
    passwordConfirm: z.string().min(6),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

const SignupForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  // define form
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
  });

  form.formState.isValid &&
    form.register("passwordConfirm", {
      validate: (value) => {
        if (value !== form.getValues("password")) {
          return "passwords do not match";
        }
        return true;
      },
    });

  // login handler
  const loginHandler = async (values: z.infer<typeof signupFormSchema>) => {
    setError(false);
    setErrorMessage("");
    // todo:: add api call to login endpoint
    try {
      setIsLoading(true);
      const registerData: IRegisterData = {
        username: values.username,
        password: values.password,
        email: values.email,
        fullName: values.fullName,
      };

      const response = await axios.post(
        `${BASE_API_URL}/auth/register`,
        registerData
      );

      if (response.status !== 200) {
        setError(true);
        setErrorMessage(response.data.message);
      }
      console.log({ response });

      toast.success("Signup successful");
      // store user in localstorage
      localStorage.setItem("user", response.data.token);

      // navigate user to the chat page
      // delay of 1 second for toast to shows
      setTimeout(() => {
        navigate("/chat");
      }, 1000);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      console.log({ error });
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      {error && <p className="text-sm text-red-500">{errorMessage}</p>}
      <form onSubmit={form.handleSubmit(loginHandler)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
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

        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
          Register{" "}
          {isLoading && <Loader className="w-4 h-4 animate-spin ml-4" />}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
