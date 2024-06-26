import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    };
};

const InviteCodePage = async ({
    params
}: InviteCodePageProps) => {
    const profile = await currentProfile();
    if (!profile) {
        return redirectToSignIn();
    }
    if (profile.isBanned) {
        return redirect("/banned"); // replace "/banned" with the path to your banned page
    }
    if (!params.inviteCode) {
        return redirect("/");
    }

    // If already exists in server
    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    // Redirect to existing server
    if (existingServer) {
        return redirect(`/servers/${existingServer.id}`);
    }

    // If not, join server
    const server = await db.server.update({
        where: {
            inviteCode: params.inviteCode,
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id,
                    }
                ]
            }
        }
    });

    // Redirect to new server
    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return (null);
}
 
export default InviteCodePage;