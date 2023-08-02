"use client";

import {
  CompanionFormSchema,
  CompanionFormType,
} from "@/lib/validators/companion-form-schema";
import { Category, Companion } from "@prisma/client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PREAMBLE = `You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.
`;

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`;

interface CompanionFormProps {
  initialData?: Companion | null;
  categories?: Array<Category>;
}

const CompanionForm: React.FC<CompanionFormProps> = ({
  initialData,
  categories,
}) => {
  const form = useForm<CompanionFormType>({
    resolver: zodResolver(CompanionFormSchema),
    defaultValues: initialData || {
      name: "",
      categoryId: undefined,
      description: "",
      instructions: "",
      seed: "",
      src: "",
    },
  });

  const { mutate: createCompanion, isLoading } = useMutation({
    mutationFn: async ({
      name,
      categoryId,
      description,
      instructions,
      seed,
      src,
    }: CompanionFormType) => {
      const payload: CompanionFormType = {
        name,
        description,
        categoryId,
        instructions,
        seed,
        src,
      };

      if (initialData) {
        const { data } = await axios.patch(
          `/api/companion/${initialData.id}`,
          payload,
        );
        return data;
      } else {
        const { data } = await axios.post("/api/companion", payload);

        return data;
      }
    },
    onError: (error) => {
      return toast({
        title: "Someting went wrong",
        description: "Please try again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      return toast({
        title: "Successfully Created Companion",
        description: "Companion Created Successfully",
        variant: "success",
      });
    },
  });

  const onSubmit: SubmitHandler<CompanionFormType> = (
    data: CompanionFormType,
  ) => {
    const payload: CompanionFormType = {
      categoryId: data.categoryId,
      name: data.name,
      description: data.description,
      instructions: data.instructions,
      src: data.src,
      seed: data.seed,
    };

    console.log(payload);

    createCompanion(payload);
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2 w-full ">
            <div>
              <h3 className="text-lg font-medium">General Information</h3>
              <p>General Information about you Companion</p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center ">
                <FormControl>
                  <ImageUpload
                    onChange={field.onChange}
                    disabled={isLoading}
                    value={field.value!}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Enter your Name"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the Name of your Companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Enter your Name"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter Short Description About your Companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select Category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a Category for Your companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Detailed instructions
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Instruction</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    {...field}
                    placeholder={PREAMBLE}
                  />
                </FormControl>
                <FormDescription>
                  Describe in Detail Your Companion Backstory
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seed"
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Seed</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    {...field}
                    placeholder={SEED_CHAT}
                  />
                </FormControl>
                <FormDescription>
                  Describe in Detail Your Companion Backstory
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading} className="gap-2 group">
              {initialData ? "Edit Your Companion" : "Create Your Companion"}
              <Wand2 className="w-4 h-4 group-hover:scale-110 transition-all" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CompanionForm;
