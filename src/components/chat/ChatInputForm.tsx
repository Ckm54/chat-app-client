import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, SendHorizonal } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

// interface IChatMessage {
//   message: string;
// }

const chatInputFormSchema = z.object({
  message: z.string(),
});

const ChatInputForm = ({
  handleSendMessage,
  isLoading,
  error,
  errorMessage,
}: {
  handleSendMessage: (message: string) => void;
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
}) => {
  // define form
  const form = useForm<z.infer<typeof chatInputFormSchema>>({
    resolver: zodResolver(chatInputFormSchema),
    defaultValues: {
      message: "",
    },
  });

  // login handler
  const loginHandler = (values: z.infer<typeof chatInputFormSchema>) => {
    handleSendMessage(values.message);
    form.reset();
  };

  return (
    <Form {...form}>
      {error && <p className="text-sm text-red-500">{errorMessage}</p>}
      <form
        onSubmit={form.handleSubmit(loginHandler)}
        className="flex w-full items-center justify-between gap-x-2 p-4 "
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col h-full relative">
              <FormControl>
                <Input placeholder="Start typing a message..." {...field} />
              </FormControl>
              <FormMessage className="absolute -top-6" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="flex items-center justify-center w-[150px]"
        >
          Send{" "}
          {isLoading ? (
            <Loader className="w-4 h-4 animate-spin ml-4" />
          ) : (
            <SendHorizonal className="w-4 h-4 ml-4" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ChatInputForm;
