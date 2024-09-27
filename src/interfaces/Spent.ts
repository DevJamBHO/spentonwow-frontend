interface spentDetail {
    cost: {eur: number, dol: number},
    id: bigint,
    name: string,
    owned: boolean
}

interface subscriptionDetail {
    estimated_cost: {eur: number, dol: number},
    estimated_months: number
}