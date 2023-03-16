const baseUser = {
    unitId: 1,
    companyId: 1,
    email: "email@email.com",
    name: "John doe",
    id: 1,
};
export const getUser = (
    overrides: Partial<typeof baseUser> = {}
): typeof baseUser => ({
    ...baseUser,
    ...overrides,
});