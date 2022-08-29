/**
 * @module models/product
 * @requires sequelize
 */
const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/postgres')

/**
 * Product
 * @typedef {object} Product
 * @property {integer} id - ID Product
 * @property {string} name.required - Name
 * @property {string} description.required - Description
 * @property {number} qty.required - Quantity
 */
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: DataTypes.STRING,
    qty: DataTypes.INTEGER,
}, {
    tableName: "products",
    timestamps: false,
})

/**
 * Product Model
 * @type {object}
 * @const
 * @namespace userModel
 */
const ProductModel = function () {
    this.model = Product
}

/**
 * 
 * @param {object} id ID Product 
 * @function
 * @memberof module:models/products~productModel
 * @returns Product
 */
ProductModel.prototype.getByID = async function (id) {
    if (id === undefined || id === null) {
        return {
            status: false,
            error: "ID Required"
        }
    } else {
        try {
            let result = await Product.findByPk(id);
            return {
                status: true,
                data: result
            }
        } catch (error) {
            return {
                status: false,
                error: error.toString()
            }
        }
    }
}

/**
 * List Per Page
 * @param {object} filter filter
 * @param {int} offset offset
 * @param {int} limit limit
 * @function
 * @memberof module:models/products~productModel
 * @returns Array<Product>
 */
ProductModel.prototype.listByPage = async function (filter, offset, limit) {
    try {
        if (filter.name !== undefined) {
            let { count, result } = await Product.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: "%" + filter.name + "%"
                    }
                },
                limit,
                offset
            });
            return {
                status: true,
                data: result,
                total: count
            }
        } else {
            let {count,result} = await Product.findAndCountAll({
                limit,
                offset
            })
            return {
                status: true,
                data: result,
                total: count
            }
        }
    } catch (error) {
        return {
            status: false,
            data: [],
            error: error.toString()
        }
    }
}

const productModel = new ProductModel()

module.exports = productModel