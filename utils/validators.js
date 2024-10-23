exports.validateSplit = (method, totalAmount, splitDetails) => {
    if (method === 'equal') {
        return true;
    } else if (method === 'exact') {
        const totalSplit = splitDetails.reduce((sum, detail) => sum + detail.amount, 0);
        return totalSplit === totalAmount;
    } else if (method === 'percentage') {
        const totalPercentage = splitDetails.reduce((sum, detail) => sum + detail.amount, 0);
        return totalPercentage === 100;
    }
    return false;
};
