import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
export const data = {
    users: [
        {
            name: "Ahmed Zubairu",
            email: "hmedzubairu365@gmail.com",
            password: bcrypt.hashSync("password"),
            isAdmin: true,
        },
        {
            name: "Bedewi Ahmed",
            email: "bedewiahmed@gmail.com",
            password: bcrypt.hashSync("password"),
            isAdmin: false,
        }
    ],
    reviews: [
        {
            owner: "619e970de87dda980b9be9a4",
            message: "This is a review",
            product: "61b8706c508bd92acd7dfa0b"
        },
        {
            message: "Another review from ahmed",
            owner: "619e970de87ddad80b9be9a4",
            product: "61b8706c508bd92acd7dfa0b"

        }
    ],
    categories: [
        {
            _id: mongoose.Types.ObjectId("619ec253cd207043b48fbc27"),
            name: "women",
        },
        {
            _id: mongoose.Types.ObjectId("619ec253cd207043b48fbc28"),
            name: "games",
        },
        {
            _id: mongoose.Types.ObjectId("619ec253cd207043b48fbc29"),
            name: "infants",
        },
        {
            _id: mongoose.Types.ObjectId("619ec253cd207043b48fbc30"),
            name: "computers",
        },
        {
            _id: mongoose.Types.ObjectId("619ec253cd207043b48fbc31"),
            name: "fitness",
        },

    ],
    brands: [
        {
            _id: mongoose.Types.ObjectId("745ec253cd207043b48fbc28"),
            name: "nike",
        },
        {
            _id: mongoose.Types.ObjectId("745ec253cd207043b48fbc29"),
            name: 'adidas'
        },
        {
            _id: mongoose.Types.ObjectId("745ec253cd207043b48fbc30"),
            name: 'champion'
        },
        {
            _id: mongoose.Types.ObjectId("745ec253cd207043b48fbc31"),
            name: 'nintendo'
        },
        {
            _id: mongoose.Types.ObjectId("745ec253cd207043b48fbc32"),
            name: 'playstation'
        },
        {
            _id: mongoose.Types.ObjectId("745ec253cd207043b48fbc33"),
            name: 'playstation'
        },
    ],
    products: [
        {
            name: "Adidas Women Lounge Wear",
            slug: "adidas-women-lounge-wear",
            image: "/images/adidaswomenloungewear.jpg",
            price: "30",
            brand: mongoose.Types.ObjectId("745ec253cd207043b48fbc28"),
            numRating: 5,
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock: 45,
            numReviews: "3",
            category: mongoose.Types.ObjectId("619ec253cd207043b48fbc27")
        },
        {
            name: "Champions power blend",
            slug: "champions-power-blend",
            image: "/images/championpowerblend.jpg",
            price: "40",
            brand: mongoose.Types.ObjectId("745ec253cd207043b48fbc30"),
            numRating: 5,
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock: 50,
            numReviews: "3",
            category: mongoose.Types.ObjectId("619ec253cd207043b48fbc27")
        },
        {
            name: "Champion Women Relax Reverse",

            slug: "champion-women-relax-reverse",
            image: "/images/championwomenrelaxreverse.jpg",
            price: "90",
            brand: mongoose.Types.ObjectId("745ec253cd207043b48fbc30"),
            numRating: 4,
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock: 25,
            numReviews: "8",
            category: mongoose.Types.ObjectId("619ec253cd207043b48fbc27")
        },
        {
            name: "Nintendo Switch Game",

            slug: "nintendo-switch-game",
            image: "/images/game.jpg",
            price: "70",
            brand: mongoose.Types.ObjectId("745ec253cd207043b48fbc31"),
            numRating: 2,
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock: 50,
            numReviews: "7",
            category: mongoose.Types.ObjectId("619ec253cd207043b48fbc28")
        },
        {
            name: "PS5",

            slug: "ps5",
            image: "/images/game2.jpg",
            price: "80",
            brand: mongoose.Types.ObjectId("745ec253cd207043b48fbc32"),
            numRating: 4,
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock: 35,
            numReviews: "7",
            category: mongoose.Types.ObjectId("619ec253cd207043b48fbc28")
        },
        {
            name: "Baby pampers",

            slug: "baby-pampers",
            image: "/images/babydiaper.jpg",
            price: "80",
            brand: "745ec253cd207043b48fbc29",
            numRating: 3,
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock: 40,
            numReviews: "3",
            category: mongoose.Types.ObjectId("619ec253cd207043b48fbc29")
        },
        {
            name: "White Hp Monitor",

            slug: "hp-monitor",
            image: "/images/hpmonitor.jpg",
            price: "80",
            brand: mongoose.Types.ObjectId("745ec253cd207043b48fbc33"),
            numRating: 3,
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock: 40,
            numReviews: "3",
            category: mongoose.Types.ObjectId("619ec253cd207043b48fbc30")
        },
        {
            name: "Hp printer",

            slug: "hp-printer",
            image: "/images/hpprinter.jpg",
            price: "80",
            brand: mongoose.Types.ObjectId("745ec253cd207043b48fbc33"),
            numRating: 3,
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock: 40,
            numReviews: "3",
            category: mongoose.Types.ObjectId("619ec253cd207043b48fbc30")
        },
        {
            name: "Nike pullover",

            slug: "nike-pullover",
            image: "/images/nikepullover.jpg",
            price: "80",
            brand: mongoose.Types.ObjectId("745ec253cd207043b48fbc28"),
            numRating: 3,
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock: 40,
            numReviews: "3",
            category: mongoose.Types.ObjectId("619f7853de47bea16559e8a3")
        },
        {
            name: "Pedometer",

            slug: "pedometer",
            image: "/images/pedometer.jpg",
            price: "60",
            brand: mongoose.Types.ObjectId("745ec253cd207043b48fbc29"),
            numRating: 4,
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock: 30,
            numReviews: "5",
            category: mongoose.Types.ObjectId("619ec253cd207043b48fbc31")
        },
        {
            name: "Fitness bike",

            slug: "fitness-bike",
            image: "/images/fitnessbike.jpg",
            price: "800",
            brand: mongoose.Types.ObjectId("745ec253cd207043b48fbc29"),
            numRating: 3,
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            countInStock: 70,
            numReviews: "3",
            category: mongoose.Types.ObjectId("619ec253cd207043b48fbc31")
        },
    ]
}

