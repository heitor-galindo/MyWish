import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Textarea } from "@/components/ui/textarea";
import {
  IconFileDescription,
  IconGift,
  IconLinkPlus,
  IconMoneybag,
  IconSparkles,
  IconStars,
} from "@tabler/icons-react";
import { HeartIcon } from "lucide-react";

const formSchema = z.object({
  giftName: z.string(),
  giftRate: z.number().min(0).max(10).optional(),
  giftDetails: z.string().optional(),
  giftPrice: z.number().optional(),
  giftLink: z.string().optional(),
});

export default function GiftForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">
        Eu queria muito ganhar um... pônei mágico! 🦄
      </h1>
      <p className="text-center mb-8">
        Você não tem bola de cristal, e nem os seus amigos. Ajude o coleguinha a
        saber o que você quer de presente!
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10 text-left"
        >
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="giftName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {" "}
                      <IconGift /> Que presente você quer?
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tênis de corrida da naike"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Marca, modelo, cor, sabor... você entendeu.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="giftRate"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>
                      <IconStars /> De 0 a 10 o quanto voce quer esse presente?
                    </FormLabel>
                    <FormControl className="w-full">
                        <Rating
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          {Array.from({ length: 10 }).map((_, index) => (
                            <RatingButton  icon={<HeartIcon></HeartIcon>} key={index} />
                          ))}
                        </Rating>
                    </FormControl>
                    <FormDescription>
                      Assim, só pra saber mesmo...
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

          <FormField
            control={form.control}
            name="giftDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {" "}
                  <IconFileDescription />
                  Ajude o coleguinha dando mais detalhes do presente que você
                  quer:
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Não gosto de coisas na cor amarela, por favor tudo menos amarelo"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Que cor que eu pego? acho que vou levar amarelo, ela não disse
                  nada ¯\_(ツ)_/¯
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="giftPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {" "}
                  <IconMoneybag /> Preço estimado
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="R$ 500,00"
                    type="text"
                    value={field.value ? formatCurrency(field.value) : ""}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, ""); // remove tudo que não for dígito
                      const number = Number(raw) / 100; // insere a vírgula antes dos 2 últimos
                      field.onChange(number); // atualiza o estado com o valor numérico
                    }}
                  />
                </FormControl>
                <FormDescription>
                  E quanto fica essa brincadeira?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="giftLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {" "}
                  <IconLinkPlus /> Link
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="vc sabe como é um link, né?"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Se voce tiver o link vai ajudar tipo muito meo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit">
              <IconSparkles /> Desejar <IconSparkles />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
