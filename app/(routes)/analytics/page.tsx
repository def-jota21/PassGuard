import { countPasswords } from "@/lib/countPasswords";
import { countDirectory } from "@/lib/countDirectory";
import { countFavourites } from "@/lib/countFavourites";
import { countypeElement } from "@/lib/countypeElement";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RepeatedPasswordsChart from "./components/RepeatedPasswordsChart/RepeatedPasswordsChart";
import ViewAnalyticsChart from "./components/ViewAnalyticsChart/ViewAnalyticsChart";
import FavouriteElements from "./components/FavouriteElements/FavouriteElements";
import ElementsChart from "./components/ElementsChart/ElementsChart";

export default async function AnalyticsPage() {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
        return redirect("/");
    }

    const user = await db.user.findUnique({
        where: {
            email: session.user.email,
        },
        include: {
            elements: {
                orderBy: {
                    createdAt: "desc",
                },
            }
        }
    });

    if (!user || !user.elements) {
        return redirect("/");
    }

    const {uniquePasswords, repeatedPasswords} = countPasswords(user.elements);
    const {personal, work, banking, socialMedia, email, shopping} = countDirectory(user.elements);
    const {favouriteCount, nonFavouriteCount} = countFavourites(user.elements);
    const {login, card, identity} = countypeElement(user.elements);
  return (
    <div>
        <div className="grid md:grid-cols-2 gap-5 mb-4">
            <RepeatedPasswordsChart uniquePasswords={uniquePasswords} repeatedPasswords={repeatedPasswords} />
            <ViewAnalyticsChart personal={personal} work={work} banking={banking} socialMedia={socialMedia} email={email} shopping={shopping} />
            <ElementsChart login={login} card={card} identity={identity} />
            <FavouriteElements favouriteCount={favouriteCount} nonFavouriteCount={nonFavouriteCount} />
        </div>
    </div>
  )
}
