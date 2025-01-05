export const GuarantyPrice = (price: number) => {

    if (price <= 10000000 && price >= 0) {
        return price * 1.1 / 100;
    }
    if (price <= 200000000 && price > 10000000) {
        return price * 1 / 100;
    }
    if (price <= 30000000 && price > 20000000) {
        return price * 0.9 / 100;
    }
    if (price <= 40000000 && price > 30000000) {
        return price * 0.8 / 100;
    }
    if (price <= 50000000 && price > 40000000) {
        return price * 0.7 / 100;
    }
    if (price <= 70000000 && price > 50000000) {
        return price * 0.6 / 100;
    }
    if (price <= 100000000 && price > 70000000) {
        return price * 0.5 / 100;
    }
    if (price <= 20000000 && price > 100000000) {
        return price * 0.4 / 100;
    }
    if (price > 20000000) {
        return price * 0.3 / 100;
    }

};
