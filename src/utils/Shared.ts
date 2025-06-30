export const isNew = (createdAt: string) => {
    const CreatedAt = new Date(createdAt!);
    const now = new Date();
    const diffInMonths =
        (now.getFullYear() - CreatedAt.getFullYear()) * 12 +
        now.getMonth() -
        CreatedAt.getMonth();
    return diffInMonths < 6;
};
export const discount = (price: number, salePrice: number) =>
    Math.round(
        ((price - salePrice) /
            price) *
        100
    )