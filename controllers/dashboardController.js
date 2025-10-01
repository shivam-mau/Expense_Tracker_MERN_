const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

// @desc    Get dashboard data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId =new Types.ObjectId(req.user.id);

        // Total income
        const totalIncome = await Income.aggregate([
            { $match: { userId: req.user.id } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        console.log("totalIncome", { totalIncome, userId: isValidObjectId(userId) });

        // Total expense
        const totalExpense = await Expense.aggregate([
            { $match: { userId: req.user.id } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Get Income transactions in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId: req.user.id,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        // Get Total income in the last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

        // Get expense transactions in the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId: req.user.id,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });


        // Get Total expense in the last 30 days
        const expense30Days = last30DaysExpenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

        // Fetch last 5 transactions (income and expense)
         const incomeLast5Docs = await Income.find({ userId }).sort({ date: -1 }).limit(5);
        const expenseLast5Docs = await Expense.find({ userId }).sort({ date: -1 }).limit(5);

        const incomeLast5 = incomeLast5Docs.map(txn => ({ ...txn.toObject(), type: "income" }));
        const expenseLast5 = expenseLast5Docs.map(txn => ({ ...txn.toObject(), type: "expense" }));

        const lastTransactions = [...incomeLast5, ...expenseLast5].sort((a, b) => b.date - a.date);
        //const lastTransactions = [
           // ...(await Income.find({ userId: req.user.id }).sort({ date: -1 }).limit(5).map(txn => 
           //     ({ ...txn.toObject(), type: "income" }))),
            //...(await Expense.find({ userId: req.user.id }).sort({ date: -1 }).limit(5).map(txn => 
            //    ({ ...txn.toObject(), type: "expense" }))),
        //].sort((a, b) => b.date - a.date)

        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpense: {
                total: expense30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
             recentTransactions: lastTransactions,
            });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message || "An error occurred while fetching dashboard data."
        });
    }
        };