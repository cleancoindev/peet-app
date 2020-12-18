export const getWebsiteByPoolName = (name: string): string => {
    name = name.toLowerCase()

    if (name.includes("compound")) {
        return "https://compound.finance/"
    }
    return "https://app.peetdecentralized.finance/";
}