const fs = require('fs')

/**
 * GET db
**/
const prem = JSON.parse(fs.readFileSync('./database/user/prem.json'))

/**
 * GET Prem user from db
 * params {string} userid
 * return {string}
**/
const getPremiumExpired = (sender) => {
    let position = null
    Object.keys(prem).forEach((i) => {
        if (prem[i].id === sender) {
            position = i
        }
    })
    if (position !== null) {
        return prem[position].expired
    }
} 

/**
 * DELETE user from db prem
**/
const expiredCheck = () => {
    setInterval(() => {
        let position = null
        Object.keys(prem).forEach((i) => {
            if (Date.now() >= prem[i].expired) {
                position = i
            }
        })
        if (position !== null) {
            console.log(`Premium expired: ${prem[position].id}`)
            prem.splice(position, 1)
            fs.writeFileSync('./database/bot/prem.json', JSON.stringify(prem))
        }
    }, 1000)
} 

/**
 * GET all user from db
 * return {string}
**/
const getAllPremiumUser = () => {
    const array = []
    Object.keys(prem).forEach((i) => {
        array.push(prem[i].id)
    })
    return array
}

module.exports = {
	getPremiumExpired,
	expiredCheck,
	getAllPremiumUser
}