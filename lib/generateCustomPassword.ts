export const generateCustomPassword = (
    length: number,
    mayus: boolean,
    minus: boolean,
    specialCharacter: boolean,
    number: boolean
) => {
    let characters = "";

    if (mayus) {
        characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (minus) {
        characters += "abcdefghijklmnopqrstuvwxyz";
    }
    if (number) {
        characters += "0123456789";
    }
    if (specialCharacter) {
        characters += "!@#$%^&*()_+-=";
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return password;
};
