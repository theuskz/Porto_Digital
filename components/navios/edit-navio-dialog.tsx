"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Navio } from "@/types/navios";
import NavioForm from "./navio-form";

interface Props {
    navio: Navio;
}

export default function EditNavioDialog({ navio }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button
                        type="button"
                        size="sm"
                        className="h-9 gap-2 rounded-lg bg-blue-600 px-3 text-white shadow-sm transition hover:bg-blue-700"
                    >
                        <Pencil className="h-4 w-4" />
                        Editar
                    </Button>
                }
            />

            <DialogContent
                className="
          border-slate-800
          bg-slate-950
          text-slate-100
          shadow-2xl
          sm:max-w-xl
          sm:rounded-2xl
          p-0
        "
            >
                <div className="border-b border-slate-800 px-6 py-5">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-slate-100">
                            Editar embarcação
                        </DialogTitle>

                        <p className="mt-1 text-sm text-slate-500">
                            Atualize as informações operacionais de{" "}
                            <strong className="text-slate-300">
                                {navio.nome}
                            </strong>
                            .
                        </p>
                    </DialogHeader>
                </div>

                <div className="px-6 py-6">
                    <NavioForm
                        navio={navio}
                        onSuccess={() => setOpen(false)}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}