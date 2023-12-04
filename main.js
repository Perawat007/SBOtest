const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const useragent = require('express-useragent');
const ejs = require('ejs');
const mysql = require('mysql2') //npm install mysql2
const axios = require('axios'); //npm install axios
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const postsRoutes = require('./routes/posts')
const os = require('os');
const requestIp = require("request-ip");
const moment = require('moment-timezone')
var cors = require('cors');

const fs = require('fs');
const QrCode = require('qrcode-reader');
const Jimp = require('jimp');

require('dotenv').config()
app.engine("html", ejs.renderFile);
app.use(useragent.express());
app.use(cors());
app.use(bodyParser.json());
app.use('/SBO', postsRoutes);
app.use(requestIp.mw());
app.listen(5001, () => console.log(`Listening on port... ${5001}`));

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
});

http://localhost:5000/login/member  Login Member
app.post('/login/member', async (require, response, next) => {
    let phoneNumber = require.body.username;
    let password = require.body.password;
    let agent_id = require.body.agent_id;
    //start check ip address
    const networkInterfaces = os.networkInterfaces();
    const ipAddress = Object.keys(networkInterfaces).reduce((acc, interfaceName) => {
        const interfaceInfo = networkInterfaces[interfaceName];
        const ipv4Info = interfaceInfo.find(info => info.family === 'IPv4' && !info.internal);
        if (ipv4Info) {
            acc = ipv4Info.address;
        }
        return acc;
    }, '');
    // end check ip address

    //start check Browser
    const userAgent = require.headers['user-agent'];
    let browser;
    if (userAgent.includes('Chrome')) {
        browser = 'Google Chrome';
    } else if (userAgent.indexOf('Firefox') > -1) {
        browser = 'Mozilla Firefox';
    } else if (userAgent.indexOf('Safari') > -1) {
        browser = 'Apple Safari';
    } else if (userAgent.indexOf('Opera') > -1) {
        browser = 'Opera';
    } else if (userAgent.indexOf('Edg') > -1) {
        browser = 'Microsoft Edge';
    } else if (userAgent.indexOf('Trident') > -1) {
        browser = 'Microsoft Internet Explorer';
    }
    else {
        browser = 'Google Chrome';
    }

    const currentTimeInThailand = moment().tz('Asia/Bangkok');
    const formattedDate = currentTimeInThailand.format('YYYY-MM-DD');
    console.log(phoneNumber, agent_id)
    let sql = `SELECT id, credit, name, password, phonenumber, username FROM member WHERE username='${phoneNumber}' AND status_delete='N' AND agent_id = '${agent_id}'`;
    connection.query(sql, async (error, results) => {
        try {
            let update = `UPDATE member set ip_address = '${ipAddress}', browserlogin = '${browser}', updated_at = '${formattedDate}'
             WHERE id='${results[0].id}' AND agent_id = '${agent_id}' `;
            connection.query(update, async (error, results) => {
                if (error) { console.log(error) }
            })
            const data = results;
            if (data.length !== 1) {
                const error = new Error('A user with this email could not be found.');
                error.statusCode = 401;
                throw error;
            }
            const storedUser = data[0];

            const hashedPassword = md5(password)
            if (hashedPassword !== storedUser.password) {
                return response.status(401).json({ message: 'Incorrect password' });
            }
            const token = jwt.sign(
                {
                    id: storedUser.id,
                    credit: storedUser.credit,
                    passwordCode: hashedPassword,
                    phonenumber: storedUser.phonenumber,
                    username: storedUser.username,
                    type: 'member',
                },
                'secretfortoken',
                { expiresIn: '24h' }
            );
            response.status(201).json({ token: token });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    });
});


http://localhost:5000/login/member  Login Member
app.put('/logoutMember', async (req, res, next) => {
    const memberID = req.body.username;
    const agent_id = req.body.agent_id;
    if (memberID !== '' || memberID !== undefined) {
        let update = `UPDATE member set ip_address = 'null',browserlogin = 'null' WHERE username='${memberID}' AND agent_id = '${agent_id}'`;
        connection.query(update, (error, result) => {
            if (error) { console.log(error) }
            else {
                res.send({
                    message: "Data Update Success",
                });
                res.end();
            }
        });
    } else {
        const error = new Error('Not Logout');
        res.json({ status: "Not Logout" });
        error.statusCode = 500;
    }
});

