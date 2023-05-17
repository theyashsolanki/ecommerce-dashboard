import { Product } from "../models/Product.js";
import { ProductStat } from "../models/ProductStat.js";
import { Transaction } from "../models/Transaction.js";
import { User } from "../models/User.js";
import getCountryIso3 from 'country-iso-2-to-3'

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()

        const productsWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return {
                    ...product._doc,
                    stat
                }
            })
        )

        res.status(200).json(productsWithStats)
    }
    catch (err) {
        res.status(500).json({message: "Error in getProducts"})
    }
}

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({role: 'user'}).select('-password') // everything except password
        res.status(200).json(customers)
    }
    catch (err) {
        res.status(500).json({message: "Error in getCustomers"})
    }
}

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
        res.status(200).json(transactions)
    }
    catch (err) {
        res.status(500).json({message: 'Error in getTransaction'})
    }
}

export const getGeography = async (req, res) => {
    try {
        const users = await User.find()

        const mappedLocations = users.reduce((acc, {country}) => {
            const countryISO3 = getCountryIso3(country)
            if(!acc[countryISO3]) {
                acc[countryISO3] = 0
            }
            acc[countryISO3]++
            return acc
        }, {})

        const formattedLocations = Object.entries(mappedLocations).map(
            ([country, count]) => {
                return { id: country, value: count }
            }
        )
        
        res.status(200).json(formattedLocations)
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}