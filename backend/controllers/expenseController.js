const XLSX = require("xlsx");
//const User = require("../models/User");
const Expense = require("../models/Expense");

//Add Expense Source 
exports.addExpense = async(req, res) =>{
    const userId = req.user.id;

    try{
        const{ icon, category, source, amount, date }= req.body;

        //validation check for missing fields
        if(!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required"});
        }
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });
        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (err) {
        res.status(500).json({ message: "Server Error"});

    }
};

//get all Expense Source 
exports.getAllExpense = async (req, res) =>{
    const userId = req.user.id;

    try{
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error){
        res.status(500).json({ message: "Server Error"});
    }
};

//delete all Expense Source 
exports.deleteExpense = async(req, res) =>{
    try{
         await Expense.findByIdAndDelete(req.params.id);
         res.json({ message: "Expense deleted successfully"});    
    } catch (error){
        res.status(500).json({ message: "Server Error"});
    }
};

//dowanload Expense in excel
exports.downloadExpenseExcel = async(req, res) =>{
    const userId = req.user.id;

    try{
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        //set the response headers for file download from excel
        const data = expense.map((item) => ({
            //Icon: item.icon,
            Category: item.category,
            Amount: item.amount,
            Date: item.date,//.toISOString().split("T")[0],
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "expense");
        XLSX.writeFile(wb, 'expense_details.xlsx' );
        res.download('expense_details.xlsx');
    } catch (error){
        res.status(500).json({ message: "Server Error"});
    }

};
