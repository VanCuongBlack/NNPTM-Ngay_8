var express = require("express");
var router = express.Router();
let { uploadImage, uploadExcel } = require('../utils/uploadHandler')
let exceljs = require('exceljs')
let path = require('path')
let fs = require('fs')
let mongoose = require('mongoose');
let productModel = require('../schemas/products')
let inventoryModel = require('../schemas/inventories')
let categoryModel = require('../schemas/categories')
let userModel = require('../schemas/users')
let roleModel = require('../schemas/roles')
let slugify = require('slugify')
let { sendMail } = require('../utils/mailHandler')
let userController = require('../controllers/users')

router.post('/an_image', uploadImage.single('file')
    , function (req, res, next) {
        if (!req.file) {
            res.send({
                message: "file khong duoc rong"
            })
        } else {
            res.send({
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size
            })
        }
    })
router.get('/:filename', function (req, res, next) {
    let filename = path.join(__dirname, '../uploads', req.params.filename)
    res.sendFile(filename)
})

router.post('/multiple_images', uploadImage.array('files', 5)
    , function (req, res, next) {
        if (!req.files) {
            res.send({
                message: "file khong duoc rong"
            })
        } else {
            // res.send({
            //     filename: req.file.filename,
            //     path: req.file.path,
            //     size: req.file.size
            // })

            res.send(req.files.map(f => {
                return {
                    filename: f.filename,
                    path: f.path,
                    size: f.size
                }
            }))
        }
    })

router.post('/excel', uploadExcel.single('file')
    , async function (req, res, next) {
        if (!req.file) {
            res.send({
                message: "file khong duoc rong"
            })
        } else {
            //wookbook->worksheet->row/column->cell
            let workBook = new exceljs.Workbook()
            let filePath = path.join(__dirname, '../uploads', req.file.filename)
            await workBook.xlsx.readFile(filePath)
            let worksheet = workBook.worksheets[0];
            let result = [];

            let categoryMap = new Map();
            let categories = await categoryModel.find({
            })
            for (const category of categories) {
                categoryMap.set(category.name, category._id)
            }

            let products = await productModel.find({})
            let getTitle = products.map(
                p => p.title
            )
            let getSku = products.map(
                p => p.sku
            )

            for (let index = 2; index <= worksheet.rowCount; index++) {
                let errorsRow = [];
                const element = worksheet.getRow(index);
                let sku = element.getCell(1).value;
                let title = element.getCell(2).value;
                let category = element.getCell(3).value;
                let price = Number.parseInt(element.getCell(4).value);
                let stock = Number.parseInt(element.getCell(5).value);

                if (price < 0 || isNaN(price)) {
                    errorsRow.push("price khong duoc nho hon 0 va la so")
                }
                if (stock < 0 || isNaN(stock)) {
                    errorsRow.push("stock khong duoc nho hon 0 va la so")
                }
                if (!categoryMap.has(category)) {
                    errorsRow.push("category khong hop le")
                }
                if (getSku.includes(sku)) {
                    errorsRow.push("sku da ton tai")
                }
                if (getTitle.includes(title)) {
                    errorsRow.push("title da ton tai")
                }

                if (errorsRow.length > 0) {
                    result.push({
                        success: false,
                        data: errorsRow
                    })
                    continue;
                }
                let session = await mongoose.startSession()
                session.startTransaction()
                try {
                    let newProducts = new productModel({
                        sku: sku,
                        title: title,
                        slug: slugify(title, {
                            replacement: '-',
                            lower: false,
                            remove: undefined,
                        }),
                        description: title,
                        category: categoryMap.get(category),
                        price: price
                    })
                    await newProducts.save({ session })
                    let newInventory = new inventoryModel({
                        product: newProducts._id,
                        stock: stock
                    })
                    await newInventory.save({ session });
                    await newInventory.populate('product')
                    await session.commitTransaction();
                    await session.endSession()
                    getTitle.push(title);
                    getSku.push(sku)
                    result.push({
                        success: true,
                        data: newInventory
                    })
                } catch (error) {
                    await session.abortTransaction();
                    await session.endSession()
                    result.push({
                        success: false,
                        data: error.message
                    })
                }
            }
            fs.unlinkSync(filePath)
            result = result.map((r, index) => {
                if (r.success) {
                    return {
                        [index + 1]: r.data
                    }
                } else {
                    return {
                        [index + 1]: r.data.join(',')
                    }
                }
            })
            res.send(result)
        }

    })
// Helper function to generate random password
function generateRandomPassword(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

router.post('/import-users', uploadExcel.single('file')
    , async function (req, res, next) {
        if (!req.file) {
            res.send({
                message: "file khong duoc rong"
            })
            return;
        }

        try {
            // Read Excel file
            let workBook = new exceljs.Workbook()
            let filePath = path.join(__dirname, '../uploads', req.file.filename)
            await workBook.xlsx.readFile(filePath)
            let worksheet = workBook.worksheets[0];
            let result = [];

            // Get USER role from database
            let userRole = await roleModel.findOne({ name: 'user' })
            if (!userRole) {
                fs.unlinkSync(filePath)
                return res.status(400).send({
                    message: "role 'user' khong ton tai"
                })
            }

            // Get existing users to check duplicates
            let existingUsers = await userModel.find({})
            let existingUsernames = existingUsers.map(u => u.username)
            let existingEmails = existingUsers.map(u => u.email)

            // Process each row in Excel
            for (let index = 2; index <= worksheet.rowCount; index++) {
                let errorsRow = [];
                const element = worksheet.getRow(index);
                let username = element.getCell(1).value;
                let email = element.getCell(2).value;

                // Validation
                if (!username || !email) {
                    errorsRow.push("username va email khong duoc de trong")
                }
                if (existingUsernames.includes(username)) {
                    errorsRow.push("username da ton tai")
                }
                if (existingEmails.includes(email)) {
                    errorsRow.push("email da ton tai")
                }
                if (email && !email.includes('@')) {
                    errorsRow.push("email khong hop le")
                }

                if (errorsRow.length > 0) {
                    result.push({
                        success: false,
                        row: index,
                        data: errorsRow
                    })
                    continue;
                }

                let session = await mongoose.startSession()
                session.startTransaction()
                try {
                    // Generate random password
                    let randomPassword = generateRandomPassword(16)

                    // Create user
                    let newUser = await userController.CreateAnUser(
                        username, 
                        randomPassword, 
                        email, 
                        userRole._id, 
                        session
                    )

                    // Send email with password
                    await sendMail(email, randomPassword, username)

                    await session.commitTransaction();
                    await session.endSession()

                    existingUsernames.push(username);
                    existingEmails.push(email);

                    result.push({
                        success: true,
                        row: index,
                        data: {
                            username: newUser.username,
                            email: newUser.email,
                            role: userRole.name,
                            message: "Mat khau da duoc gui toi email"
                        }
                    })
                } catch (error) {
                    await session.abortTransaction();
                    await session.endSession()
                    result.push({
                        success: false,
                        row: index,
                        data: error.message
                    })
                }
            }

            fs.unlinkSync(filePath)
            res.send(result)

        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    })

module.exports = router;