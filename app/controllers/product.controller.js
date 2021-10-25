const Product = require('../models/food.model');
const dotenv = require('dotenv');
dotenv.config();

class ProductController {
    getAllProducts = async (req, res, next) => {
        try {
            let prodcutList = await Product.findAll({raw:true});
            if (!prodcutList.length) {
                return res.status(404).json({
                    data: "",
                    message: "Products not found"
                });
            }

            // res.send({data:userList});
            res.status(200).json({ data: prodcutList });

        } catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    };

}
module.exports = new ProductController;
