export declare const getSettlementData: (tripId: string) => Promise<{
    tripName: string;
    totalExpense: number;
    expenseCount: number;
    memberCount: number;
    perPersonShare: number;
    balances: {
        userId: any;
        fullName: any;
        email: any;
        paid: number;
        shouldPay: number;
        balance: number;
    }[];
    settlements: {
        from: {
            userId: any;
            fullName: any;
            email: any;
        };
        to: {
            userId: any;
            fullName: any;
            email: any;
        };
        amount: number;
    }[];
}>;
//# sourceMappingURL=settlement.service.d.ts.map