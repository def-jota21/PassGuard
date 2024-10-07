import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import FormProfile from "./components/FormProfile/FormProfile";

export default async function ProfilePage() {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
        return redirect("/");
    }

    const user = await db.user.findUnique({
        where: {
            email: session.user.email,
        },
    });
    if(!user) {
        return redirect("/");
    }
    return (
        <div>
            <h1 className="text-xl">Account Details</h1>
            <FormProfile user = {user} />
        </div>
    )
}
