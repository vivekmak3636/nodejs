let express = require("express");
let app = express();
app.use(express.json());


// products list and detail
let product = [

    {
        id: 1,
        name: "nike shoes",
        price: 1000,
        descripition: "this is sports shoes "
    },

    {
        id: 2,
        name: "asus gaming TUF",
        price: 80000,
        descripition: "only gaming laptop"
    },

    {
        id: 3,
        name: "samsung a06 ",
        price: 15000,
        descripition: "manufactured by samsung"
    }

]

// SERVER RUNNING 
app.get("", (req, res) => {
    res.send("LOCAL SERVER IS RUNNING")
})

// data fatch 
app.get("/product", (req, res) => {
    res.json(product)
})


// fetch single data

app.get("/product/:id", (req, res) => {
    let id = parseInt(req.params.id)
    let findproducts = product.find((u) => id === p.id)

    if (!findproducts) {

        return res.json({
            Message: "sorry! this product is note available"
        })
        res.json(findproducts)
    }
})

// add product 

app.post("/products", (req, res) => {

    let data = req.body;
    let da = {
        id: product.length + 1,
        name: data.name,
        price: data.price,
        descripition: data.descripition
    }

    product.push(da)
    res.json(da)
})

// data update

app.put("/product/:id", (req, res) => {

    let id = parseInt(req.params.id)
    let products = product.find((p) => id === p.id)

    if (!products) {

        return res.json({
            Message: "sorry! this product is note available"
        })
    }

    findproducts.name = req.body.name || findproducts.name
    findproducts.price = req.body.price || findproducts.price
    findproducts.descripition = req.body.descripition || findproducts.descripition

    res.json({
        Message: "products updated succesfully",
        data: products
    })
})

// delete products

app.delete("/product/:id", (req, res) => {

    let id = parseInt(req.params.id)
    let index = product.findIndex((p) => id === p.id)

    if (index==-1) {

        return res.json({
            'Message': 'Sorry! this products is note available'
        })
        
    }

    product.splice(index, 1)
    res.json({
        'Message': 'products deleted successfully'
    })
})


app.listen(5000, () => {
    console.log("code running succesfully")
})




