import { Element } from "@prisma/client";

export function countPasswords(elements: Element[]) {
    const passwordCounts = new Map<string, number>();
    
    elements.forEach((element) => {
        const password = element.password;

        if (password) {
            passwordCounts.set(password, (passwordCounts.get(password) || 0) + 1);
        }
    });
    let uniquePasswords = 0;
    let repeatedPasswords = 0;

    passwordCounts.forEach((count) => {
        if (count === 1) {
            uniquePasswords++;
        } else {
            repeatedPasswords++;
        }
    });
    return {
        uniquePasswords,
        repeatedPasswords,
    };
};