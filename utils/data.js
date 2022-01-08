import bcrypt from 'bcryptjs'
export const data = {
    users:[
        {
            name:"Ahmed Zubairu",
            email:"hmedzubairu365@gmail.com",
            password: bcrypt.hashSync("password"),
            isAdmin:true,
        },
        {
            name:"Bedewi Ahmed",
            email:"bedewiahmed@gmail.com",
            password: bcrypt.hashSync("password"),
            isAdmin:false,
        }
    ],
    reviews:[
        {
            owner:"619e970de87dda980b9be9a4" ,
            message:"This is a review",
            product: "61b8706c508bd92acd7dfa0b"
        },
        {
            message:"Another review from ahmed",
            owner:"619e970de87ddad80b9be9a4",
            product: "61b8706c508bd92acd7dfa0b"

        }
    ],
    categories:[
       {
           name: "shirt",
       },
       {
           name: "pant",
       }
    ],
    brands:[
        {
            name:"nike",
        },
        {
            name:'adidas'
        }
    ],
    products:[
        {
            name:"Free Shirt",
        
            slug:"free-shirt-1",
            image:"/images/shirt.jpg",
            price:"30",
            brand:"619f4bb3de47bea16559e88d",
            numRating:5,
            description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock:45,
            numReviews:"3",
            category:"619f7853de47bea16559e8a4"
        },
        {
            name:"Free Shirt 2",
        
            slug:"free-shirt-2",
            image:"/images/shirt.jpg",
            price:"40",
            brand:"619f4bb3de47bea16559e88e",
            numRating:5,
            description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock:50,
            numReviews:"3",
            category:"619f7853de47bea16559e8a3"
        },
        {
            name:"Free Shirt 3",
        
            slug:"free-shirt-3",
            image:"/images/shirt.jpg",
            price:"90",
            brand:"619f4bb3de47bea16559e88e",
            numRating:4,
            description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock:25,
            numReviews:"8",
            category:"619f7853de47bea16559e8a4"
        },
        {
            name:"Free Shirt 4",
        
            slug:"free-shirt-4",
            image:"/images/shirt.jpg",
            price:"70",
            brand:"619f4bb3de47bea16559e88d",
            numRating:2,
            description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock:50,
            numReviews:"7",
            category:"619f7853de47bea16559e8a3"
        },
        {
            name:"Free Shirt 5",
        
            slug:"free-shirt-5",
            image:"/images/shirt.jpg",
            price:"80",
            brand:"619f4bb3de47bea16559e88d",
            numRating:4,
            description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock:35,
            numReviews:"7",
            category:"619f7853de47bea16559e8a4"
        },
        {
            name:"Free Shirt 6",
        
            slug:"free-shirt-6",
            image:"/images/shirt.jpg",
            price:"80",
            brand:"619f4bb3de47bea16559e88d",
            numRating:3,
            description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock:40,
            numReviews:"3",
            category:"619f7853de47bea16559e8a3"
        },
        {
            name:"Kimono",
        
            slug:"kimono",
            image:"/images/shirt.jpg",
            price:"80",
            brand:"619f4bb3de47bea16559e88d",
            numRating:3,
            description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock:40,
            numReviews:"3",
            category:"619f7853de47bea16559e8a3"
        },
        {
            name:"Batakare",
        
            slug:"batakare",
            image:"/images/shirt.jpg",
            price:"80",
            brand:"619f4bb3de47bea16559e88d",
            numRating:3,
            description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock:40,
            numReviews:"3",
            category:"619f7853de47bea16559e8a3"
        },
    ]
}
 
