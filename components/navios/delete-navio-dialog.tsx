"use client";

import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useDeleteNavio } from "@/hooks/mutations/use-delete-navio";
import { Navio } from "@/types/navios";

interface Props {
    navio: Navio;
}

export default function DeleteNavioDialog({ navio }: Props) {
    const [open, setOpen] = useState(false);
    const mutation = useDeleteNavio();

    function excluir() {
        mutation.mutate(navio.id, {
            onSuccess() {
                setOpen(false);
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button
                        type="button"
                        size="sm"
                        className="h-9 gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 text-red-400 transition hover:bg-red-600 hover:text-white"
                    >
                        <Trash2 className="h-4 w-4" />
                        Excluir
                    </Button>
                }
            />

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
                        <AlertTriangle className="h-7 w-7 text-red-500" />
                    </div>

                    <DialogTitle className="text-center text-xl">
                        Confirmar exclusão
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-3 text-center">
                    <p className="text-slate-300">
                        Você está prestes a excluir o navio
                    </p>

                    <p className="text-lg font-semibold text-white">
                        {navio.nome}
                    </p>

                    <p className="text-sm text-slate-500">
                        Esta ação é permanente e não poderá ser desfeita.
                    </p>
                </div>

                <DialogFooter className="mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="flex-1"
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="button"
                        disabled={mutation.isPending}
                        onClick={excluir}
                        className="flex-1 bg-red-600 hover:bg-red-700"
                    >
                        {mutation.isPending ? (
                            "Excluindo..."
                        ) : (
                            <>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}