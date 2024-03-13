import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Monkey,
  MonkeyNotNullable,
  MonkeySchemaNotNullable,
} from "@/types/monkey";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { postMonkey } from "@/api/monkeyapi";

export const Route = createLazyFileRoute("/monkeyapi")({
  component: MonkeyAPI,
});

function MonkeyAPI() {
  return (
    <div className="flex flex-col h-full w-full justify-evenly gap-4">
      <Card>
        <CardHeader>
          <CardTitle>MonkeyAPI</CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <p className="text-xl text-justify font-semibold">
            Here you can interact with the MonkeyAPI. Remember that this needs
            the API running in the background on http://localhost:8080 and CORS
            must be disabled in browser. Otherwise the communication with the
            backend will fail
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Create a monkey</CardTitle>
        </CardHeader>
        <CardContent>
          <MonkeyForm />
        </CardContent>
      </Card>
    </div>
  );
}

function MonkeyForm() {
  const form = useForm<MonkeyNotNullable>({
    resolver: zodResolver(MonkeySchemaNotNullable),
    defaultValues: {
      name: "",
      image: undefined,
      description: undefined,
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
      knownFrom: undefined,
      strength: undefined,
      weaknesses: undefined,
      speciesName: undefined,
    },
  });

  const onSubmit = async (values: Monkey) => {
    try {
      const success = await postMonkey(values);
      if (success) {
        import("sonner").then((module) =>
          module.toast.success(`Created Monkey ${values.name}`)
        );
      } else {
        import("sonner").then((module) =>
          module.toast.error(
            `Couldn't create Monkey. Does the monkey already exist?`
          )
        );
      }
    } catch (error) {
      import("sonner").then((module) =>
        module.toast.error(`Couldn't create Monkey: ${error}`)
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Name of monkey" {...field} />
              </FormControl>
              <FormDescription>How the monkey is named</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input type="url" placeholder="Url to image" {...field} />
              </FormControl>
              <FormDescription>
                A URL to a image from which the image of the monkey can be
                downloaded
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>
                (Optional) Description or trivia about the monkey
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="speciesName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Species name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Species" {...field} />
              </FormControl>
              <FormDescription>
                (Optional) Name of the species to which the monkey belongs
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="knownFrom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Known from</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Known from" {...field} />
              </FormControl>
              <FormDescription>
                (Optional) From where (movie, game etc.) the monkey is known
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="strength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Strength</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Strengths" {...field} />
              </FormControl>
              <FormDescription>
                (Optional) Which are the strenghts of the monkey? (Can be
                descriptive)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="strength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Strength</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Strengths" {...field} />
              </FormControl>
              <FormDescription>
                (Optional) Which are the strenghts of the monkey? (Can be
                descriptive)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weaknesses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weaknesses</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Weaknesses" {...field} />
              </FormControl>
              <FormDescription>
                (Optional) Which are the weaknesses of the monkey? (Can be
                descriptive)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HP</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Health Points" {...field} />
              </FormControl>
              <FormDescription>
                Health points of the monkey. Used when battleing in arena
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attack</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Attack" {...field} />
              </FormControl>
              <FormDescription>
                Attack of the monkey. Used when battleing in arena
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="defense"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Defense</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Defense" {...field} />
              </FormControl>
              <FormDescription>
                Defense of the monkey. Used when battleing in arena
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialAttack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HP</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Special Attack" {...field} />
              </FormControl>
              <FormDescription>
                Special Attack of the monkey. Used when battleing in arena
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialDefense"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HP</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Special Defense" {...field} />
              </FormControl>
              <FormDescription>
                Special Defense of the monkey. Used when battleing in arena
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="speed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HP</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Speed" {...field} />
              </FormControl>
              <FormDescription>
                Speed of the monkey. Used when battleing in arena
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="outline" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
