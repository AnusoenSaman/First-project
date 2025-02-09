const { MongoClient } = require('mongodb');

// กำหนด URL ของ MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'ecommerce';  // ชื่อฐานข้อมูล
const collectionName = 'product';  // ชื่อคอลเลกชัน

async function getProduct() {
    const client = new MongoClient(url);

    try {
        // เชื่อมต่อกับ MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // ค้นหาผลิตภัณฑ์ที่มี _id เป็น "67a6cf9a20f05c88eacb1ae8"
        const product = await collection.findOne({ _id: "67a6cf9a20f05c88eacb1ae8" });

        if (product) {
            console.log('Product found:', product);
        } else {
            console.log('Product not found');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();  // ปิดการเชื่อมต่อ
    }
}

getProduct();
