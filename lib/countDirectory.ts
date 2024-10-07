import { Element } from "@prisma/client";

export function countDirectory(elements: Element[]) {
   
    const directoryCounts: { [key: string]: number } = {
        personal: 0,
        work: 0,
        banking: 0,
        "social-media": 0,
        email: 0,
        shopping: 0,
    };

    
    elements.forEach((element) => {
        const directory = element.directory;

        if (directory) {
            if (directoryCounts.hasOwnProperty(directory)) {
                directoryCounts[directory]++;
            }
        }
    });

    return {
        personal: directoryCounts.personal,
        work: directoryCounts.work,
        banking: directoryCounts.banking,
        socialMedia: directoryCounts["social-media"],
        email: directoryCounts.email,
        shopping: directoryCounts.shopping,
    };
};