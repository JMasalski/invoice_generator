export const validateNIP = (nip) => {
    const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];

    if (!/^\d{10}$/.test(nip)) {
        return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(nip[i]) * weights[i];
    }

    return (sum % 11) === parseInt(nip[9]);
}