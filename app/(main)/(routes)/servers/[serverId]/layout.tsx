import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
    children, 
    params
}: {
    children: React.ReactNode; 
    params: {serverId: string}
}) => {
    const profile = await currentProfile();
    if (!profile){
        return redirectToSignIn();
    }
    if (profile.isBanned) {
        return redirect("/banned"); // replace "/banned" with the path to your banned page
    }
    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });
    if (!server) {
        return redirect("/");
    }
    return ( 
        <div className="h-full">
            <div className="w-50 z-20 flex-col fixed inset-y-0  md:block hidden">
                <ServerSidebar serverId={params.serverId}/>
            </div>
            <main className="h-full">
                {children}
            </main>     
        </div>
    );
    
}
export default ServerIdLayout;

