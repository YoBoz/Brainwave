import { MessageCircle } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";

interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string;
}

export const ChatHeader = ({
    serverId,
    name,
    type,
    imageUrl
}: ChatHeaderProps) => {
    return (
        <div className="text-md font-semibold px-3 flex items-center h-12 dark:border-white border-black border-b-2">
            <MobileToggle serverId={serverId}/>
            {type === "channel" && (
                <MessageCircle className="w-5 h-5 text-black dark:text-white mr-2"/>
            )}
            <p className="font-semibold text-md">
                {name}
            </p>
        </div>
    )
}