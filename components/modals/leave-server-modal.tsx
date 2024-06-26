"use client"

import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";



export const LeaveServerModal = () => {

    const router = useRouter();

    const onClick = async () => {
        try{
            setIsLoading(true)
            await axios.patch(`/api/servers/${server?.id}/leave`);
            onClose();
            router.refresh();
            router.push("/");
            router.refresh();
        } catch(error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const { onOpen, isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "leaveServer";

    const {server} = data;

    const [copied, setCopied] = useState(false);

    const [isLoading, setIsLoading] = useState(false);


    return (
        <Dialog open = {isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[rgb(92,41,96)] dark:bg-[#301934] text-white p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Leave Team
                    </DialogTitle>
                    <DialogDescription className="text-center text-white">
                        Are you sure you want to "<span className="text-rose-500 font-bold">LEAVE {server?.name.toUpperCase()}</span>" ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-[#310a4477] px-6 py-4">
                    <div className="flex items-center justify-end w-full">
                        <Button 
                        disabled={isLoading}
                        variant="destructive"
                        onClick={onClick}>
                            Leave
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
