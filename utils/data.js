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
    products:[
        {
            name:"Free Shirt",
            category:"Shirts",
            slug:"Free-shirt-1",
            image:"/images/shirt.jpg",
            price:"30",
            brand:"Nike",
            numRating:"5",
            description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock:"50",
            numReviews:"3",
        },
        {
            name:"Free Shirt 2",
            category:"Shirts",
            slug:"Free-shirt-2",
            image:"/images/shirt.jpg",
            price:"40",
            brand:"Nike",
            numRating:"5",
            description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock:"50",
            numReviews:"3",
        },
        {
            name:"Free Shirt 3",
            category:"Shirts",
            slug:"Free-shirt-3",
            image:"/images/shirt.jpg",
            price:"90",
            brand:"Nike",
            numRating:"4",
            description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock:"60",
            numReviews:"8",
        },
        {
            name:"Free Shirt 4",
            category:"Shirts",
            slug:"Free-shirt-4",
            image:"/images/shirt.jpg",
            price:"70",
            brand:"Nike",
            numRating:"2",
            description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock:"56",
            numReviews:"7",
        },
        {
            name:"Free Shirt 5",
            category:"Shirts",
            slug:"Free-shirt-5",
            image:"/images/shirt.jpg",
            price:"80",
            brand:"Nike",
            numRating:"5",
            description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock:"40",
            numReviews:"7",
        },
        {
            name:"Free Shirt 6",
            category:"Shirts",
            slug:"Free-shirt-6",
            image:"/images/shirt.jpg",
            price:"80",
            brand:"Nike",
            numRating:"6",
            description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock:"30",
            numReviews:"3",
        },
    ]
}
 
