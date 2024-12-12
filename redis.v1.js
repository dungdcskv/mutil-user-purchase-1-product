const express = require('express')

const {
    get,
    set,
    incrby,
    decrby,
    exists,
    setnx,
} = require('./model.redis.js')

const app = express()
app.use(express.json());

app.get('/order', async (req, res) => {

    try {
        console.log('111');
        const date = new Date().getTime()

        // gia su so luong ton khi hien tai la 10
        const slTonKho = 10

        // ten cua sp laf iphone13
        const keyName = 'iPhone13'

        // gia su moi lan mua hang chi mua 1 sp
        const slMua = 1
        console.log('222');
        // so luong ban ra, neu chua ban thi set = 0, con neu ba thi update + 1 moi lan user order thanh cong
        const getKey = await exists(keyName)
        console.log('333', getKey);
        if (!getKey) {
            console.log('444');
            // set = 0
            await set(keyName, 0)
        }
        console.log('555');
        // lay so luong ban ra
        const slBanRa = await get(keyName);

        console.log(`Truoc khi user order thanh cong thi sl ban ra ===`, slBanRa);

        // neu so luong ban ra + so luong mua > sl ton kho return false
        if (slBanRa + slMua > slTonKho) {
            console.log('Het hang')
            return res.json({
                status: 405,
                msg: 'Error',
                time: date
            })
        }
        console.log('5555');
        // neu user order thanh cong
        slBanRa = await incrby(keyName, slMua)

        console.log(`Sau khi user order thanh cong thi sl ban ra ===`, slBanRa);

        console.log('date', date)
        return res.json({
            status: 'Success',
            msg: 'ok',
            time: date
        })

    } catch (error) {
        console.error('Error during order processing:', err);
        return res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
    }
})

app.listen(3000, () => {
    console.log('The server running at 3000');

})

