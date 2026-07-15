"use client";

import { useState } from "react";
import {
    Trash2,
    AlertTriangle,
    Ship,
    Loader2,
} from "lucide-react";

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

export default function DeleteNavioDialog({
    navio,
}: Props) {
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
                        className="
              h-9 gap-2 rounded-lg
              border border-red-500/30
              bg-red-500/10
              px-3 text-red-400
              transition
              hover:border-red-500
              hover:bg-red-600
              hover:text-white
            "
                    >
                        <Trash2 className="h-4 w-4" />
                        Excluir
                    </Button>
                }
            />

            <DialogContent
                className="
          border-slate-800
          bg-slate-950
          p-0
          text-slate-100
          shadow-2xl
          sm:max-w-md
          sm:rounded-2xl
        "
            >
                <div className="border-b border-slate-800 px-6 py-5">
                    <DialogHeader>
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
                            <AlertTriangle className="h-7 w-7 text-red-400" />
                        </div>

                        <DialogTitle className="mt-4 text-center text-xl font-semibold text-slate-100">
                            Confirmar exclusão
                        </DialogTitle>

                        <p className="mt-2 text-center text-sm text-slate-500">
                            Esta ação removerá permanentemente o registro do sistema.
                        </p>
                    </DialogHeader>
                </div>

                <div className="space-y-5 px-6 py-6">
                    <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                            <Ship className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                Embarcação selecionada
                            </p>

                            <p className="truncate text-base font-semibold text-slate-100">
                                {navio.nome}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
                        <p className="text-sm leading-6 text-red-300">
                            Após confirmar, este navio será removido do estoque e não poderá
                            ser recuperado.
                        </p>
                    </div>

                    <DialogFooter className="grid grid-cols-2 gap-3 sm:flex-row">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={mutation.isPending}
                            onClick={() => setOpen(false)}
                            className="
                h-11 rounded-xl
                border-slate-700
                bg-slate-900
                text-slate-200
                hover:bg-slate-800
                hover:text-white
              "
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="button"
                            disabled={mutation.isPending}
                            onClick={excluir}
                            className="
                h-11 rounded-xl
                bg-red-600
                font-semibold
                text-white
                shadow-lg
                shadow-red-600/20
                hover:bg-red-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
                        >
                            {mutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Excluindo...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Excluir navio
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}