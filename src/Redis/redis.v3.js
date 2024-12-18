const express = require('express')

const {
    exists,
    setnx,
    client,
} = require('./model.redis.js');
const Product = require('../../models/Product.js');
const purchaseQueue = require('../../queue/index.js');

const app = express()
app.use(express.json());



app.get('/order', async (req, res) => {
    try {
        const date = new Date().getTime()
        const idProduct = 1
        let keyName = `product_${idProduct}`
        let slMua = '1'
        
        const getKey = await exists(keyName)
        if (!getKey) {
            const product = await Product.findById(idProduct)
            if (!product) {
                throw Error('Product not found')
            }
            await setnx(keyName, String(product.stock))
        }

        const luaScript = `
        local stock = redis.call('GET', KEYS[1])
        if not stock or tonumber(stock) < tonumber(ARGV[1]) then
            return -1
        end
        redis.call('DECRBY', KEYS[1], ARGV[1])
        return redis.call('GET', KEYS[1])
        `;

        const result = await client.eval(luaScript, {
            keys: [keyName],
            arguments: [slMua],
        });

        if (result === -1) {
            console.log('Het hang')
            return res.json({
                status: 405,
                msg: 'Error',
                time: date
            })
        }

        await purchaseQueue.add({
            keyName: keyName,
            stock: result,
            idProduct,
        })

        console.log('Bannnnnnnnnnnnnnnnn thanh cong 1 san pham voi slTonKho', result);
        return res.json({
            status: 'Success',
            msg: 'ok',
            time: date
        })
    } catch (error) {
        console.log('Error', error.message);
        return res.status(500).json({ status: 'Error', message: error.stack });
    }
})

app.listen(3000, () => {
    console.log('The server running at 3000');

})

