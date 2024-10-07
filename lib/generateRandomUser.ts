export const generateRandomUser = (length = 10) => {
    const adjectives = [
        "pretty",
        "large",
        "big",
        "small",
        "tall",
        "short",
        "long",
        "handsome",
        "plain",
        "quaint",
        "clean",
        "elegant",
        "easy",
        "angry",
        "crazy",
        "helpful",
        "mushy",
        "odd",
        "unsightly",
        "adorable",
        "important",
        "inexpensive",
        "cheap",
        "expensive",
        "fancy",
    ];
    const nouns = [
        "bag",
        "ball",
        "bed",
        "book",
        "bottle",
        "box",
        "chair",
        "club",
        "diamond",
        "door",
        "egg",
        "bed",
        "floor",
        "fruit",
        "glass",
        "house",
        "iron",
        "mask",
        "phone",
        "plant",
        "rock",
        "street",
        "train",
        "tree",
        "wave",
        "window",
    ];
    
    const randomItem = (array: any[]) => 
        array[Math.floor(Math.random() * array.length)];

    let user = "";
    user += randomItem(adjectives);
    user += randomItem(nouns);
    user += Math.floor(Math.random() * 10000);

    if(user.length < length) {
        user = user.substring(0, length);
    }
    return user;
};