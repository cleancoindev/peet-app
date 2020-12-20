export const getImageByPoolName = (name: string): string => {
    name = name.toLowerCase()

    if (name.includes("compound")) {
        return require(`../../../assets/compound.png`)
    } else if (name.includes("aave")) {
        return require(`../../../assets/aave.svg`)
    } else if (name.includes("peet")) {
        return require(`../../../assets/PTE.png`)
    }
    return "";
}