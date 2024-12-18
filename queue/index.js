const Bull = require('bull');
const Product = require('../models/Product');

const purchaseQueue = new Bull('purchase-queue', {
    redis: { host: '127.0.0.1', port: 6379 }
});

purchaseQueue.process(async (job) => {
    console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHH', job.data.keyName);
    const { idProduct, stock } = job.data
    await Product.updateById(idProduct, { stock })
});


module.exports = purchaseQueue;
