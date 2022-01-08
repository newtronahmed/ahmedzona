import Product from "../../../../models/product";
import nextConnect from "next-connect";
import db from "../../../../utils/db";

const handler = nextConnect()

handler.get(async function (req, res,) {
    try {

        const product = await Product.findOne({ slug: req.query.slug }).populate('category').populate('reviews')
        // console.log("product",product)
        res.send({ product, reviews: product.reviews })
    } catch (e) {
        console.log(e)
    }
    // res.json({product:db.convertDocToObject(product) , reviews : product.reviews})
})
export default db.connect(handler)