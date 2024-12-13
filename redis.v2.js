const express = require('express')

const {
    get,
    set,
    incrby,
    decrby,
    exists,
    setnx,
    del,
} = require('./model.redis.js');
const Product = require('./models/Product.js');


const app = express()
app.use(express.json());

// có 2 vấn đề khác biệt giữa v2 và v1 là:
// + Sử dụng setnx của redis có tính nguyên tử. Nghĩa là chỉ nó chỉ khởi tạo 1 lần duy nhất. Không giống như set nó sẽ overwrite lại nếu được call nhiều lần. 
// Redis có thể làm được vì nó sử dụng cấu trúc single thread event loop. Chỉ có 1 action setnx đầu tiên thành công.
// + và incrby cũng tương tự setnx

const idProduct = 1

app.get('/order', async (req, res) => {

    try {
        const date = new Date().getTime()
        const keyName = `product_${idProduct}`
        const slMua = 1
        const getKey = await exists(keyName)
        const product = await Product.findById(idProduct)
        if (!product) {
            throw Error('Product not found')
        }

        if (!getKey) {
            await setnx(keyName, String(product.stock))
        }

        let slTonKho = parseInt(await get(keyName));
        console.log(`Truoc khi user order thanh cong thi sl ton kho ===`, slTonKho);

        slTonKho = await decrby(keyName, slMua)
        if (slTonKho < 0) {
            await incrby(keyName, slMua)
            console.log('Het hang')
            return res.json({
                status: 405,
                msg: 'Error',
                time: date
            })
        }

        if (slTonKho < 0) {
            await set('banQuaRoi', slTonKho)
        }

        // update product to database
        await Product.updateById(idProduct, { stock: slTonKho })

        console.log('Bannnnnnnnnnnnnnnnn thanh cong 1 san pham voi slTonKho', slTonKho);

        return res.json({
            status: 'Success',
            msg: 'ok',
            time: date
        })

    } catch (error) {
        return res.status(500).json({ status: 'Error', message: error.stack });
    }
})

app.listen(3000, () => {
    console.log('The server running at 3000');

})

