import { generateRandomUser } from "./generateRandomUser";

export const generateRandomEmail = (length = 10) => {
    const domains = [
        "gmail.com",
        "yahoo.com",
        "hotmail.com",
        "aol.com",
        "outlook.com",
        "icloud.com",
        "fastmail.com",
        "protonmail.com",
        "msn.com",
        "live.com",
        "live.co.uk",
        "yahoo.co.uk",
        "hotmail.co.uk",
        "gmail.co.uk",
        "me.com",
        "yandex.com",
        "mail.com",
        "verizon.net",
        "att.net",
        "gmx.com",
        "outlook.co.uk",
        "yahoo.com.au",
        "google.com.au",
        "hotmail.com.au",
        "aol.com.au",
        "btinternet.com",
        "btopenworld.com",
        "web.de",
        "gmx.de",
        "gmx.net",
        "web.com",
        "web.co.uk",
        "web.co.za",
    ];
    
    const user = generateRandomUser(length);
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${user}@${domain}`;
};