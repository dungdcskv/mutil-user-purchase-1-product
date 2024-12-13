'use strict'

const redis = require('redis');

// Create a Redis client
const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
});

// Connect the client
(async () => {
    try {
        await client.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Redis connection error:', err);
    }
})();


client.on('ready', () => {
    console.log('Redis client is ready');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

client.on('end', () => {
    console.log('Redis connection closed');
});

const get = async (key) => {
    try {
        return await client.get(key);
    } catch (err) {
        throw new Error(err);
    }
};

const set = async (key, count) => {
    try {
        await client.set(key, count);
    } catch (err) {
        throw new Error(err);
    }
};

const incrby = async (key, count) => {
    try {
        return await client.incrBy(key, count);
    } catch (err) {
        throw new Error(err);
    }
};

const decrby = async (key, count) => {
    try {
        return await client.decrBy(key, count);
    } catch (err) {
        throw new Error(err);
    }
};

const exists = async (key) => {
    try {
        return await client.exists(key);
    } catch (err) {
        throw new Error(err);
    }
};

const setnx = async (key, value) => {
    try {
        return await client.setNX(key, value);
    } catch (err) {
        throw new Error(err);
    }
};

const redisDel = async ([key]) => {
    try {
        return await client.del(key);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    get,
    set,
    incrby,
    decrby,
    exists,
    setnx,
    redisDel,
}