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

            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        Editar {navio.nome}
                    </DialogTitle>
                </DialogHeader>

                <NavioForm
                    navio={navio}
                    onSuccess={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}