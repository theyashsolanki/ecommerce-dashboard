import { OverallStat } from '../models/OverallStat.js'
import { Transaction } from '../models/Transaction.js'
import {User} from '../models/User.js'


export const getUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    }
    catch (err) {
        res.status(404).json({message: 'Error in getUser'})
    }
}

export const getDashboardStats = async (req, res) => {
    try {
        // hardcoded values
        const currentMonth = 'November'
        const currentYear = 2021
        const currentDay = '2021-11-15'

        // Recent Transactions
        const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 })

        // Overall Stats 
        const overallStat = await OverallStat.find({ year: currentYear })

        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory
        } = overallStat[0]

        const thisMonthStats = overallStat[0].monthlyData.find(({month}) => {
            return month === currentMonth
        })
        
        const todaysStats = overallStat[0].dailyData.find(({date}) => {
            return date === currentDay
        })

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            thisMonthStats,
            todaysStats,
            transactions
        })
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}