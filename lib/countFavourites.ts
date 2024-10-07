import { Element } from "@prisma/client";

export function countFavourites(elements: Element[]) {
   
    let favouriteCount = 0;
    let nonFavouriteCount = 0;

    elements.forEach((element) => {
        if (element.isFavourite) {
            favouriteCount++;
        } else {
            nonFavouriteCount++;
        }
    });

    return {
        favouriteCount,     
        nonFavouriteCount, 
    };
}
