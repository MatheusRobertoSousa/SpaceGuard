"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Search } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    city: z.string().trim().optional(),
    latitude: z.string().trim().optional(),
    longitude: z.string().trim().optional(),
  })
  .refine(
    (values) => {
      if (values.city) {
        return true;
      }

      return Boolean(values.latitude && values.longitude);
    },
    {
      message: "Informe uma cidade ou as coordenadas.",
      path: ["city"],
    },
  );

type FormValues = z.infer<typeof formSchema>;

interface SearchFormProps {
  onSubmit: (values: FormValues) => void;
  loading: boolean;
  initialValues?: Partial<FormValues>;
  selectedCoordinates?: {
    latitude: number;
    longitude: number;
  } | null;
}

export function SearchForm({ onSubmit, loading, initialValues, selectedCoordinates }: SearchFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: initialValues?.city ?? "",
      latitude: initialValues?.latitude ?? "",
      longitude: initialValues?.longitude ?? "",
    },
  });

  useEffect(() => {
    if (!selectedCoordinates) {
      return;
    }

    form.setValue("latitude", selectedCoordinates.latitude.toFixed(5), {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.setValue("longitude", selectedCoordinates.longitude.toFixed(5), {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.setValue("city", "", {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [form, selectedCoordinates]);

  return (
    <Card className="p-5">
      <form className="grid gap-4 lg:grid-cols-[1.8fr_1fr_1fr_auto]" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Cidade</label>
          <Input placeholder="Ex.: São Paulo" {...form.register("city")} />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Latitude</label>
          <Input placeholder="-23.55" {...form.register("latitude")} />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Longitude</label>
          <Input placeholder="-46.63" {...form.register("longitude")} />
        </div>
        <div className="flex items-end">
          <Button type="submit" className="h-12 w-full lg:w-auto" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
            Analisar local
          </Button>
        </div>
      </form>
      {selectedCoordinates ? (
        <p className="mt-3 text-sm text-cyan-200">
          Coordenadas selecionadas no mapa: {selectedCoordinates.latitude.toFixed(5)},{" "}
          {selectedCoordinates.longitude.toFixed(5)}
        </p>
      ) : null}
      {form.formState.errors.city ? (
        <p className="mt-3 text-sm text-rose-300">{form.formState.errors.city.message}</p>
      ) : null}
    </Card>
  );
}
