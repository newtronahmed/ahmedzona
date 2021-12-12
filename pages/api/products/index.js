import nextConnect from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/product";
const handler = nextConnect();
handler.get(async function (req, res) {
  //shallow copy request query into queryObj
  let queryObj = { ...req.query };
//   let paginateQuery = { ...req.query };
  //if queries have values of 'all' remove property from queryObj
  Object.keys(queryObj).forEach((each) => {
    if (queryObj[each] === "all") {
      delete queryObj[each];
    }
  });
  console.log(req.query)
  //exclude page,sort and limit from db queryObj
  const excludedQueries = ["page", "sort", "limit", "keyword"];
  excludedQueries.forEach((eq) => {
    if (queryObj[eq]) {
      delete queryObj[eq];
    }
  });

  let queryStr = JSON.stringify(queryObj)
  queryStr = queryStr.replace(/\b(gt|lt)\b/g, (match)=>`$${match}`)
  console.log(JSON.parse(queryStr));
  // Make database query using queryObj, and save into query variable . Dont await here
  const query = Product.find(JSON.parse(queryStr));

  //if req.query has keyword aka search parameter , add to query
  if (req.query.keyword) {
    let regex = new RegExp(req.query.keyword);
    query.find({ name: regex });
    queryObj.name = regex;
    // paginateQuery.name = regex
  }
  //string * 1 gives converts string to Number
  //For pagination
  let page = req.query.page * 1 || 1;
  let limit = req.query.limit * 1 || 10;
  let skip = (page - 1) * page;
  query.skip(skip).limit(limit);

  //If request has sort param, use it else resort to default
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query.sort(sortBy);
  } else {
    query.sort("-createdAt");
  }
  //Finally await querey here
  const products = await query;
  // console.log(products)

  //Paginate response only when page parameter is available
  if (req.query.page) {
    // if(req.query.keyword){
    //     queryObj[req.query.keyword] = req.query.keywords
    // }
    //get document count for pagination
    const productsCount = await Product.countDocuments(queryObj);
    console.log(queryObj);
    // const productsCount = await query.count()
    //totalPages available is the rounded value of all products divided by limit(Per page)
    let totalPages = Math.ceil(productsCount / limit);
    let currentPage = req.query.page;
    let totalItems = products.length;
    let nextPage = ++currentPage;
    let previousPage = --currentPage;
    //Send result with pagination info
    res.send({
      products,
      totalPages,
      currentPage,
      totalItems,
      nextPage,
      previousPage,
      productsCount,
    });
  } else {
    res.send({ products, total: products.length });
  }
});
export default db.connect(handler);
