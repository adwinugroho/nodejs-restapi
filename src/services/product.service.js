/**
 * @module services/products


/**
 * Product Model
 * @const
 */
const productModel = require('../models/product.model');

/**
 * Product Service
 * @type {object}
 * @constructor
 * @namespace productService
 */

const ProductService = function () {
    // implement
}

/**
 * 
 * @param {object} id ID product
 * @memberof module:services/products~productService 
 * @returns Product
 * @returns {Error}
 */
ProductService.prototype.getProductByID = async function(id) {
    let result = await productModel.getByID(id)
    if (!result.status) {
        throw new Error(result.error)    
    }
    return result
}

/**
 * @param {int} page Page Number
 * @param {int} limit Limit data
 * @param {object} filter Filter condition
 * @memberof module:services/products~productService
 * @returns Array<Product>
 * @returns {Error}
 */
ProductService.prototype.listProducts = async function (filter, page, limit) {
    const offset = (page - 1) * limit
    let result = await productModel.listByPage(filter, offset, limit)
    if (!result.status) {
        throw new Error(result.error)
    }
    return result
}

const productService = new ProductService()

module.exports = productService