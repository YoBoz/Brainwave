"use client"

// Initial model that will show if the user has no servers (new users)

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FileUpload } from "../file-upload";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

export const InitialModal = () => {

    const router = useRouter();

    // Removing hydration errors
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [])
    
    // Adding requirements
    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Team name is required"
        }),
        imageUrl: z.string().min(1, {
            message: "Team image is required"
        })
    
    });
    
    // Different inputs
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    });

    // isLoading to prevent inputs while loading
    const isLoading = form.formState.isSubmitting;

    // Posting data to prisma
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/servers", values);
            form.reset();
            router.refresh();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    if(!isMounted){
        return null;
    }
    return (
        <div>
            <Dialog open>
                <DialogContent className="bg-[rgb(92,41,96)] dark:bg-[#301934] text-white p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-3xl text-center font-bold">
                            Create a Team
                        </DialogTitle>
                        <DialogDescription className="text-white text-center">
                            Give you collab a name and picture
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-8 px-6">
                                <div className="flex items-center justify-center text-center">
                                    <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                endpoint="serverImage"
                                                value={field.value}
                                                onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                    />
                                </div>
                                <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-white font-bold text-xs">
                                            COLLAB NAME
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                            disabled={isLoading}
                                            className="bg-white border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                            placeholder="Enter Collab Name"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-rose-700"/>
                                    </FormItem>
                                )}
                                />
                            </div>
                            <DialogFooter className="px-6 py-4">
                                <Button variant="brain" disabled={isLoading}>
                                    Create
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}