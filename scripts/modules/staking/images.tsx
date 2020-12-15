export const getImageByPoolName = (name: string): string => {
    name = name.toLowerCase()

    if (name.includes("compound")) {
        return require(`../../../assets/compound.png`)
    }
    return "";
}