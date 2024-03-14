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
import { useTranslation } from "react-i18next";

export const Route = createLazyFileRoute("/monkeyapi")({
  component: MonkeyAPI,
});

function MonkeyAPI() {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col h-full w-full justify-evenly gap-4">
      <Card>
        <CardHeader>
          <CardTitle>MonkeyAPI</CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <p className="text-xl text-justify font-semibold">
            {t("monkeyapi.description")}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("monkeyapi.create_monkey")}</CardTitle>
        </CardHeader>
        <CardContent>
          <MonkeyForm />
        </CardContent>
      </Card>
    </div>
  );
}

function MonkeyForm() {
  const { t } = useTranslation("common");
  const form = useForm<MonkeyNotNullable>({
    resolver: zodResolver(MonkeySchemaNotNullable),
    defaultValues: {
      name: undefined,
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
          module.toast.success(
            `${t("monkeyapi.form.success_message")} ${values.name}`
          )
        );
      } else {
        import("sonner").then((module) =>
          module.toast.error(t("monkeyapi.form.api_error_message"))
        );
      }
    } catch (error) {
      import("sonner").then((module) =>
        module.toast.error(
          `${t("monkeyapi.form.unknown_error_message")} ${error}`
        )
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
              <FormLabel>{t("monkeyapi.form.name.label")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("monkeyapi.form.name.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("monkeyapi.form.name.description")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("monkeyapi.form.image.label")}</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder={t("monkeyapi.form.image.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("monkeyapi.form.image.description")}
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
              <FormLabel>{t("monkeyapi.form.description.label")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("monkeyapi.form.description.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("monkeyapi.form.description.description")}
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
              <FormLabel>{t("monkeyapi.form.species_name.label")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("monkeyapi.form.species_name.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("monkeyapi.form.species_name.description")}
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
              <FormLabel>{t("monkeyapi.form.known_from.label")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("monkeyapi.form.known_from.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("monkeyapi.form.known_from.description")}
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
              <FormLabel>{t("monkeyapi.form.strength.label")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("monkeyapi.form.strength.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("monkeyapi.form.strength.description")}
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
              <FormLabel>{t("monkeyapi.form.weaknesses.label")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("monkeyapi.form.weaknesses.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("monkeyapi.form.weaknesses.description")}
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
              <FormLabel>{t("moncard.hp")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("monkeyapi.form.hp.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("monkeyapi.form.hp.description")}
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
              <FormLabel>{t("moncard.attack")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("monkeyapi.form.attack.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("monkeyapi.form.attack.description")}
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
              <FormLabel>{t("moncard.defense")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("monkeyapi.form.defense.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("monkeyapi.form.defense.description")}
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
              <FormLabel>{t("moncard.specialAttack")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("monkeyapi.form.special_attack.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("monkeyapi.form.special_attack.description")}
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
              <FormLabel>{t("moncard.specialDefense")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("monkeyapi.form.special_defense.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("monkeyapi.form.special_defense.description")}
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
              <FormLabel>{t("moncard.speed")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("monkeyapi.form.speed.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("monkeyapi.form.speed.description")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="outline" type="submit">
          {t("monkeyapi.form.submit")}
        </Button>
      </form>
    </Form>
  );
}
