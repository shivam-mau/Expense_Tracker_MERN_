import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (Name) => {
    if (!Name) return "";
    const words = Name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }
    return initials.toUpperCase();
};

export const addThousandSeprator = (num) => {
    if (num === null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) =>{
    const sortedData = [...data].sort(
        (a,b) => new Date(a.date) - new Date(b.date)
    );
    
    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.amount,
        category: item?.category,
    }));
    
    return chartData;
};

export const prepareIncomeChartData = (data = []) => {
    const sortedData = [...data].sort(
        (a,b) => new Date(a.date) - new Date(b.date)
    );

    const chartData  = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.amount,
        category: item?.source,
    }));

    return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));
    const chartData  = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM") + " "+ item.category,
        amount: item?.amount,
        category: item?.category,
    }))
    return chartData;
};