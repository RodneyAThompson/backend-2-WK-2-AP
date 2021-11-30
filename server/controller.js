const houses = require('./db.json')
let globalId = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },
    deletehouse: (req, res) => {
        let {id} = req.params
        let index = houses.findIndex(ele => +ele.id === +id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        const {address, price, imageURL} = req.body
        let newHouse = {
            id: globalId,
            address,
            price,
            imageURL,
        }
        houses.push(newHouse)
        res.status(200).send(houses)
        globalId++
    },
    updateHouse: (req, res) => {
        const {id} = req.params
        const {type} = req.body

        let index = houses.findIndex(ele => +ele.id === +id)
        if(houses[index].price < 100000 && type === 'minus') {
            res.status(400).send('youre too broke')
        } else if(houses[index].price > 1000000 && type === 'plus') {
            res.status(400).send('youre goin over board!')
        } else if(type === 'minus') {
            houses[index].price = houses[index].price - 10000
            res.status(200).send(houses)
        } else if(type === 'plus') {
            houses[index].price = houses[index].price + 10000
            res.status(200).send(houses)
        }

         
        res.status(200).send(houses)
    }
}