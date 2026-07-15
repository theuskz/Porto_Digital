"use client";

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import NavioForm from "./navio-form";

export default function NavioDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button>
                        + Novo Navio
                    </Button>
                }
            />

            <DialogContent className="sm:max-w-xl">
                <NavioForm
                    onSuccess={() => setOpen(false)}
                />
                <DialogHeader>

                    <DialogTitle>

                        Cadastrar Novo Navio

                    </DialogTitle>

                </DialogHeader>

            </DialogContent>
        </Dialog>
    );
}