import { Element } from "@prisma/client";

export function countypeElement(elements: Element[]) {
   
    const typeElementCounts: { [key: string]: number } = {
        login: 0,
        card: 0,
        identity: 0,
    };

    
    elements.forEach((element) => {
        const typeElement = element.typeElement;

        if (typeElement) {
            if (typeElementCounts.hasOwnProperty(typeElement)) {
                typeElementCounts[typeElement]++;
            }
        }
    });

    return {
        login: typeElementCounts.login,
        card: typeElementCounts.card,
        identity: typeElementCounts.identity,
    };
};