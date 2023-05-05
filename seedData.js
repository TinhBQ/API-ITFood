const express = require('express');
const dotenv = require('dotenv');
const connect = require('./database/database.js')
const { categoryModel, productModel, deliveryModel } = require('./models/index.js')
const { OutputType, print } = require('./helpers/print.js');

const app = express();
app.use(express.json())
dotenv.config();

connect()
  .then(async () => {
    const myDelivery = [
      {
        "name": "Express",
        "price": 3
      },
      {
        "name": "Fast",
        "price": 2
      },
      {
        "name": "Save",
        "price": 1
      },
    ]

    let isExistDelivery = await deliveryModel.insertMany(myDelivery);
    if (isExistDelivery) {
      print('Init Delivery successfully', OutputType.SUCCESS);
    } else {
      print('Init Delivery failed', OutputType.ERROR);
    }
  })
  .then(async () => {
    const myCategory = [
      {
        "name": "Pizza",
        "image": "https://pngimg.com/uploads/pizza/pizza_PNG7151.png"
      },
      {
        "name": "Burger",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1299&q=80"
      },
      {
        "name": "Sushi",
        "image": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
      },
      {
        "name": "Ramen",
        "image": "https://img.freepik.com/free-vector/ramen-noodle-egg-meat-with-chopstick-cartoon_138676-2543.jpg?w=1060&t=st=1681920670~exp=1681921270~hmac=a687b9ee92ef19b62987a5677a13a72cf0993b20db7e70e6b1989e8880657ade"
      },
      {
        "name": "Tacos",
        "image": "https://cdn.pixabay.com/photo/2013/07/13/09/37/taco-155812__340.png"
      },
      {
        "name": "Steak",
        "image": "https://images.unsplash.com/photo-1588347818036-558601350947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      },
      {
        "name": "Fried chicken",
        "image": "https://images.unsplash.com/photo-1626082896492-766af4eb6501?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
      },
      {
        "name": "Seafood",
        "image": "https://images.unsplash.com/photo-1562158079-e4b9ed06b62d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
      },
      {
        "name": "Pasta",
        "image": "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        "name": "Salad",
        "image": "https://media.istockphoto.com/id/175197961/vi/anh/%C4%91%C4%A9a-salad.jpg?s=612x612&w=0&k=20&c=iPicN3ZCM6Grs4Zw6EANfCHqbnza6mFVPDxL3fOIsew="
      },
      {
        "name": "Sandwich",
        "image": "https://media.istockphoto.com/id/1256670482/photo/turkey-sandwich-with-tomato-and-lettuce.jpg?s=612x612&w=0&k=20&c=CPwIFBHQqOob3SNZbegKKjUVL6xkUZgoQ2cxT0jcUrQ="
      },
      {
        "name": "BBQ",
        "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFyYmVxdWV8ZW58MHx8MHx8&w=1000&q=80"
      },
      {
        "name": "Dessert",
        "image": "https://media.istockphoto.com/id/497959594/photo/fresh-cakes.jpg?s=612x612&w=0&k=20&c=T1vp7QPbg6BY3GE-qwg-i_SqVpstyHBMIwnGakdTTek="
      },
      {
        "name": "Soup",
        "image": "https://media.istockphoto.com/id/1177031727/photo/pumpkin-and-carrot-soup-with-cream-on-grey-stone-background-top-view.jpg?s=612x612&w=0&k=20&c=HmxXL082ccHLy1KAKJxyD-bMcvzTV-OrpoBhtUhV500="
      },
      {
        "name": "Breakfast",
        "image": "https://media.istockphoto.com/id/533645537/photo/breakfast-with-bacon-eggs-pancakes-and-toast.jpg?s=612x612&w=0&k=20&c=TumrEwImmLi4TIVeirgynvTpHhyvt9LeiDXLci45NWg="
      }];

    let isExist = await categoryModel.insertMany(myCategory);
    if (isExist) {
      print('Init category successfully', OutputType.SUCCESS);
    } else {
      print('Init category failed', OutputType.ERROR);
    }
  })
  .then(async () => {
    id = await categoryModel.findOne({ name: 'Pizza' });

    const myProductPizza = [
      {
        "name": "Pizza Margherita",
        "description": "A classic Neapolitan pizza topped with tomato sauce, mozzarella cheese, and fresh basil.",
        "price": 9.99,
        "quantity": 10,
        "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=962&q=80",
        "categoryId": id._id.toString()
      },
      {
        "name": "Pepperoni Pizza",
        "description": "A classic American pizza topped with tomato sauce, mozzarella cheese, and pepperoni.",
        "price": 10.99,
        "quantity": 8,
        "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
        "categoryId": id._id.toString()
      },
      {
        "name": "Hawaiian Pizza",
        "description": "A pizza topped with tomato sauce, mozzarella cheese, ham, and pineapple.",
        "price": 12.99,
        "quantity": 5,
        "image": "https://www.cookingclassy.com/wp-content/uploads/2017/03/hawaiian-pizza-13.jpg",
        "categoryId": id._id.toString()
      },
      {
        "name": "Meatlover's Pizza",
        "description": "A pizza topped with tomato sauce, mozzarella cheese, pepperoni, sausage, bacon, and ham.",
        "price": 13.99,
        "quantity": 7,
        "image": "https://www.cookingclassy.com/wp-content/uploads/2017/03/meat-lovers-pizza-17.jpg",
        "categoryId": id._id.toString()
      },
      {
        "name": "Veggie Pizza",
        "description": "A pizza topped with tomato sauce, mozzarella cheese, peppers, onions, mushrooms, and olives.",
        "price": 11.99,
        "quantity": 6,
        "image": "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Veggie-Pizza_EXPS_HRBZ19_6449_C03_25_2b.jpg",
        "categoryId": id._id.toString()
      },
      {
        "name": "BBQ Chicken Pizza",
        "description": "A pizza topped with BBQ sauce, mozzarella cheese, chicken, and red onions.",
        "price": 14.99,
        "quantity": 4,
        "image": "https://www.cookingclassy.com/wp-content/uploads/2016/11/bbq-chicken-pizza-10-600x900.jpg",
        "categoryId": id._id.toString()
      },
      {
        "name": "Buffalo Chicken Pizza",
        "description": "A pizza topped with buffalo sauce, mozzarella cheese, chicken, and red onions.",
        "price": 14.99,
        "quantity": 3,
        "image": "https://www.cookingclassy.com/wp-content/uploads/2016/11/buffalo-chicken-pizza-5-600x900.jpg",
        "categoryId": id._id.toString()
      },
      {
        "name": "Mediterranean Pizza",
        "description": "A pizza topped with tomato sauce, mozzarella cheese, feta cheese, olives, and red onions.",
        "price": 15.99,
        "quantity": 2,
        "image": "https://www.cookingclassy.com/wp-content/uploads/2016/11/mediterranean-pizza-5-1200x1800.jpg",
        "categoryId": id._id.toString()
      },
      {
        "name": "White Pizza",
        "description": "A pizza topped with garlic-infused olive oil, mozzarella cheese, and ricotta cheese.",
        "price": 12.99,
        "quantity": 9,
        "image": "https://www.simplyrecipes.com/thmb/KQj1L9wsRPDJfd0xioOslblyZHY=/1620x1080/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__06__Shrimp-and-Artichoke-White-Pizza-LEAD-5-5d0b76302e474da996181f1fedc8ed07.jpg",
        "categoryId": id._id.toString()
      },
      {
        "name": "Truffle Mushroom Pizza",
        "description": "A pizza topped with garlic-infused olive oil, mozzarella cheese, mushrooms, and truffle oil.",
        "price": 16.99,
        "quantity": 1,
        "image": "https://www.simplyrecipes.com/wp-content/uploads/2018/09/truffle-mushroom-pizza-horiz-a-1800.jpg",
        "categoryId": id._id.toString()
      },
      {
        "name": "Pesto Chicken Pizza",
        "description": "A pizza topped with basil pesto, mozzarella cheese, chicken, and sun-dried tomatoes.",
        "price": 14.99,
        "quantity": 6,
        "image": "https://www.cookingclassy.com/wp-content/uploads/2015/04/pesto-chicken-pizza-10.jpg",
        "categoryId": id._id.toString()
      },
      {
        "name": "Four Cheese Pizza",
        "description": "A pizza topped with tomato sauce, mozzarella cheese, parmesan cheese, ricotta cheese, and gorgonzola cheese.",
        "price": 12.99,
        "quantity": 8,
        "image": "https://www.simplyrecipes.com/thmb/Ivzeb-tO4I0gh0FKWnvLUs833vI=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Four-Cheese-Pizza LEAD-7d40f54b59f540e09431fda3c55cd74d.jpg",
        "categoryId": id._id.toString()
      },
      {
        "name": "Margarita Pizza",
        "description": "A pizza topped with tomato sauce, mozzarella cheese, and fresh basil.",
        "price": 9.99,
        "quantity": 7,
        "image": "https://www.simplyrecipes.com/thmb/kC0-sA2h9qzohdDQglenSGFJ-b0=/1800x1200/filters:fill(auto,1)/Simply-Recipes-Margarita-Pizza-LEAD-HORIZONTAL-381-ba07dc85810c467f8d6bb54c96e118eb.jpg",
        "categoryId": id._id.toString()
      },
      {
        "name": "Barbecue Ham Pizza",
        "description": "A pizza topped with barbecue sauce, mozzarella cheese, ham, and pineapple.",
        "price": 12.99,
        "quantity": 4,
        "image": "https://www.simplyrecipes.com/thmb/8Wg_JCvRapH1Zrm06lcZxWowMVA=/1600x1600/smart/filters:no_upscale()/Simply-Recipes-Barbecued-Ham-Pizza-LEAD-HORIZONTAL-02dbad4e13514b4a9b4ec01efd8d54e4.jpg",
        "categoryId": id._id.toString()
      },
      {
        "name": "Pizza Marinara",
        "description": "A classic Neapolitan pizza topped with tomato sauce, garlic, and oregano.",
        "price": 8.99,
        "quantity": 3,
        "image": "https://www.simplyrecipes.com/thmb/innlG_MfxiL8IKL0D0aCOW9X2Qc=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Marinara-Pizza-DSC-6393-1b2e286eee624dd58e35234c5e5e0426.jpg",
        "categoryId": id._id.toString()
      }
    ]
    isExist = await productModel.insertMany(myProductPizza);
    if (isExist) {
      print('Init Pizza products successfully', OutputType.SUCCESS);
    } else {
      print('Init Pizza products failed', OutputType.ERROR);
    }

    // // -----------------------------------------------
    // id = await categoryModel.findOne({ name: 'Burger' });
    // const myProductBurger = [
    //   {
    //     "name": "Classic Burger",
    //     "description": "Juicy beef patty, lettuce, tomato, onion and mayonnaise on a sesame seed bun.",
    //     "price": 7.99,
    //     "quantity": 50,
    //     "image": "https://example.com/classic-burger.jpg",
    //     "categoryId": id._id.toString()
    //   },
    //   {
    //     "name": "Bacon Cheeseburger",
    //     "description": "Juicy beef patty, crispy bacon, melted cheddar cheese, lettuce, tomato and mayonnaise on a sesame seed bun.",
    //     "price": 9.99,
    //     "quantity": 35,
    //     "image": "https://example.com/bacon-cheeseburger.jpg",
    //     "categoryId": id._id.toString()
    //   },
    //   {
    //     "name": "Veggie Burger",
    //     "description": "Grilled vegetarian patty made with a blend of vegetables and grains, topped with lettuce, tomato, onion and mayonnaise on a sesame seed bun.",
    //     "price": 8.99,
    //     "quantity": 20,
    //     "image": "https://example.com/veggie-burger.jpg",
    //     "categoryId": id._id.toString()
    //   },
    //   {
    //     "name": "Mushroom Swiss Burger",
    //     "description": "Juicy beef patty, sautéed mushrooms, melted Swiss cheese, lettuce, tomato and garlic aioli on a sesame seed bun.",
    //     "price": 10.99,
    //     "quantity": 25,
    //     "image": "https://example.com/mushroom-swiss-burger.jpg",
    //     "categoryId": id._id.toString()
    //   },
    //   {
    //     "name": "Spicy Chicken Sandwich",
    //     "description": "Crispy chicken breast, spicy mayonnaise, lettuce and tomato on a brioche bun.",
    //     "price": 9.99,
    //     "quantity": 30,
    //     "image": "https://example.com/spicy-chicken-sandwich.jpg",
    //     "categoryId": id._id.toString()
    //   },
    //   {
    //     "name": "BBQ Bacon Burger",
    //     "description": "Juicy beef patty, crispy bacon, cheddar cheese, onion rings, lettuce, tomato and BBQ sauce on a sesame seed bun.",
    //     "price": 12.99,
    //     "quantity": 15,
    //     "image": "https://example.com/bbq-bacon-burger.jpg",
    //     "categoryId": id._id.toString()
    //   },
    //   {
    //     "name": "Double Cheeseburger",
    //     "description": "Two juicy beef patties, melted cheddar cheese, lettuce, tomato, onion and mayonnaise on a sesame seed bun.",
    //     "price": 11.99,
    //     "quantity": 20,
    //     "image": "https://example.com/double-cheeseburger.jpg",
    //     "categoryId": id._id.toString()
    //   },
    //   {
    //     "name": "Fish Sandwich",
    //     "description": "Crispy fried fish fillet, lettuce, tomato and tartar sauce on a sesame seed bun.",
    //     "price": 8.99,
    //     "quantity": 25,
    //     "image": "https://example.com/fish-sandwich.jpg",
    //     "categoryId": id._id.toString()
    //   },
    //   {
    //     "name": "Turkey Burger",
    //     "description": "Grilled turkey patty, lettuce, tomato and cranberry mayonnaise on a sesame seed bun.",
    //     "price": 9.99,
    //     "quantity": 15,
    //     "image": "https://example.com/turkey-burger.jpg",
    //     "categoryId": id._id.toString()
    //   },
    //   {
    //     "name": "Beyond Burger",
    //     "description": "Plant-based patty made from pea protein, topped with lettuce, tomato, onion and mayonnaise on a sesame seed bun.",
    //     "price": 10.99,
    //     "quantity": 10,
    //     "image": "https://example.com/beyond-burger.jpg",
    //     "categoryId": id._id.toString()
    //   }
    // ]

    // isExist = await productModel.insertMany(myProductBurger);
    // if (isExist) {
    //   print('Init Burger products successfully', OutputType.SUCCESS);
    // } else {
    //   print('Init Burger products failed', OutputType.ERROR);
    // }

    // ----------------------------------------------------------------
    //   id = await categoryModel.findOne({ name: 'Sushi' });
    //   const myProductSushi = [
    //     {
    //       "name": "Tuna Roll",
    //       "description": "Fresh tuna and sushi rice wrapped in seaweed.",
    //       "price": 5.99,
    //       "quantity": 30,
    //       "image": "https://example.com/tuna-roll.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "California Roll",
    //       "description": "Crab, avocado and cucumber rolled in sushi rice and seaweed.",
    //       "price": 6.99,
    //       "quantity": 25,
    //       "image": "https://example.com/california-roll.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Salmon Sashimi",
    //       "description": "Thinly sliced fresh salmon served with soy sauce and wasabi.",
    //       "price": 8.99,
    //       "quantity": 20,
    //       "image": "https://example.com/salmon-sashimi.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Dragon Roll",
    //       "description": "Eel, avocado and cucumber rolled in sushi rice and seaweed, topped with eel sauce.",
    //       "price": 12.99,
    //       "quantity": 15,
    //       "image": "https://example.com/dragon-roll.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Shrimp Tempura Roll",
    //       "description": "Crispy fried shrimp and vegetables rolled in sushi rice and seaweed.",
    //       "price": 9.99,
    //       "quantity": 20,
    //       "image": "https://example.com/shrimp-tempura-roll.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Spicy Tuna Roll",
    //       "description": "Fresh tuna, cucumber, and chili sauce rolled in sushi rice and seaweed.",
    //       "price": 7.99,
    //       "quantity": 25,
    //       "image": "https://example.com/spicy-tuna-roll.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Rainbow Roll",
    //       "description": "California roll topped with assorted sashimi and avocado.",
    //       "price": 14.99,
    //       "quantity": 10,
    //       "image": "https://example.com/rainbow-roll.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Eel Sushi",
    //       "description": "Grilled eel and sushi rice wrapped in seaweed.",
    //       "price": 10.99,
    //       "quantity": 15,
    //       "image": "https://example.com/eel-sushi.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Vegetable Roll",
    //       "description": "Assorted fresh vegetables rolled in sushi rice and seaweed.",
    //       "price": 6.99,
    //       "quantity": 30,
    //       "image": "https://example.com/vegetable-roll.jpg",
    //       "categoryId": id._id.toString()
    //     },    
    //     {
    //       "name": "Spider Roll",
    //       "description": "Crispy fried soft-shell crab, avocado and cucumber rolled in sushi rice and seaweed.",
    //       "price": 11.99,
    //       "quantity": 15,
    //       "image": "https://example.com/spider-roll.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Unagi Roll",
    //       "description": "Grilled eel, cucumber, and avocado rolled in sushi rice and seaweed, topped with eel sauce.",
    //       "price": 13.99,
    //       "quantity": 10,
    //       "image": "https://example.com/unagi-roll.jpg",
    //       "categoryId": id._id.toString()
    //     }
    //   ]
    //   isExist = await productModel.insertMany(myProductSushi);
    //   if (isExist) {
    //     print('Init Sushi products successfully', OutputType.SUCCESS);
    //   } else {
    //     print('Init Sushi products failed', OutputType.ERROR);
    //   }

    //   // ----------------------------------------------------------------
    //   id = await categoryModel.findOne({ name: 'Ramen' });

    //   const myProductRamen = [
    //     {
    //         "name": "Shoyu Ramen",
    //         "description": "A soy sauce-based broth with chashu (braised pork belly), ajitsuke tamago (soy sauce-marinated boiled egg), and shredded scallions.",
    //         "price": 12.99,
    //         "quantity": 20,
    //         "image": "https://example.com/ramen/shoyu-ramen.jpg",
    //         "categoryId": id._id.toString()
    //     },
    //     {
    //         "name": "Tonkotsu Ramen",
    //         "description": "A rich pork broth with chashu, kikurage mushrooms, scallions, and nori (dried seaweed), served with thin, straight noodles.",
    //         "price": 14.99,
    //         "quantity": 15,
    //         "image": "https://example.com/ramen/tonkotsu-ramen.jpg",
    //         "categoryId": id._id.toString()
    //     },
    //     {
    //         "name": "Miso Ramen",
    //         "description": "A soybean paste-based broth with chashu, corn, and bean sprouts, served with curly or straight noodles.",
    //         "price": 11.99,
    //         "quantity": 18,
    //         "image": "https://example.com/ramen/miso-ramen.jpg",
    //         "categoryId": id._id.toString()
    //     },
    //     {
    //         "name": "Shio Ramen",
    //         "description": "A clear, salty broth made with chicken or fish, topped with chashu, menma (bamboo shoots), and nori.",
    //         "price": 10.99,
    //         "quantity": 22,
    //         "image": "https://example.com/ramen/shio-ramen.jpg",
    //         "categoryId": id._id.toString()
    //     },
    //     {
    //         "name": "Spicy Ramen",
    //         "description": "A fiery pork or chicken broth with garlic, ginger, soy sauce, and miso, topped with chashu, bean sprouts, and green onions.",
    //         "price": 13.99,
    //         "quantity": 15,
    //         "image": "https://example.com/ramen/spicy-ramen.jpg",
    //         "categoryId": id._id.toString()
    //     },
    //     {
    //         "name": "Vegetarian Ramen",
    //         "description": "A vegetable broth with tofu, green onion, shiitake mushrooms, bok choy, and nori.",
    //         "price": 9.99,
    //         "quantity": 12,
    //         "image": "https://example.com/ramen/vegetarian-ramen.jpg",
    //         "categoryId": id._id.toString()
    //     },
    //     {
    //         "name": "Tokyo Shio Ramen",
    //         "description": "A light and clear chicken broth with chashu, nori, and menma, served with thin, straight noodles.",
    //         "price": 12.99,
    //         "quantity": 20,
    //         "image": "https://example.com/ramen/tokyo-shio-ramen.jpg",
    //         "categoryId": id._id.toString()
    //     },
    //     {
    //         "name": "Curry Ramen",
    //         "description": "A pork or chicken broth with Japanese curry flavor, topped with chashu, sliced onion, and fried garlic.",
    //         "price": 11.99,
    //         "quantity": 18,
    //         "image": "https://example.com/ramen/curry-ramen.jpg",
    //         "categoryId": id._id.toString()
    //     },
    //     {
    //         "name": "Tsukemen",
    //         "description": "Cold noodles served separately from a rich, concentrated broth for dipping, with chashu, boiled egg, and nori.",
    //         "price": 15.99,
    //         "quantity": 10,
    //         "image": "https://example.com/ramen/tsukemen.jpg",
    //         "categoryId": id._id.toString()
    //     }
    //   ]

    //   isExist = await productModel.insertMany(myProductRamen);
    //   if (isExist) {
    //     print('Init Ramen products successfully', OutputType.SUCCESS);
    //   } else {
    //     print('Init Ramen products failed', OutputType.ERROR);
    //   }

    //   // ----------------------------------------------------------------
    //   id = await categoryModel.findOne({ name: 'Tacos' });

    //   const myProductTacos = [
    //     {
    //       "name": "Carnitas Tacos",
    //       "description": "Slow-cooked pork, served on a soft corn tortilla with chopped onions, cilantro, and a squeeze of lime.",
    //       "price": 2.99,
    //       "quantity": 25,
    //       "image": "https://example.com/tacos/carnitas-tacos.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Carne Asada Tacos",
    //       "description": "Grilled beef, served on a crispy corn tortilla with salsa, diced onions, and chopped cilantro.",
    //       "price": 3.49,
    //       "quantity": 20,
    //       "image": "https://example.com/tacos/carne-asada-tacos.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Al Pastor Tacos",
    //       "description": "Pork marinated in spices, pineapple, and chilies, served on a soft corn tortilla with chopped onions and cilantro.",
    //       "price": 2.99,
    //       "quantity": 18,
    //       "image": "https://example.com/tacos/al-pastor-tacos.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Fish Tacos",
    //       "description": "Beer-battered fish, served on a soft flour tortilla with cabbage slaw, diced tomatoes, and a squeeze of lime.",
    //       "price": 3.99,
    //       "quantity": 15,
    //       "image": "https://example.com/tacos/fish-tacos.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Chicken Tinga Tacos",
    //       "description": "Shredded chicken in a smoky sauce made with chipotle peppers in adobo, served on a crispy corn tortilla with crumbled cheese and diced onions.",
    //       "price": 3.29,
    //       "quantity": 20,
    //       "image": "https://example.com/tacos/chicken-tinga-tacos.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Lengua Tacos",
    //       "description": "Beef tongue, slow-cooked until tender, served on a soft corn tortilla with diced onions and cilantro.",
    //       "price": 3.99,
    //       "quantity": 12,
    //       "image": "https://example.com/tacos/lengua-tacos.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Chorizo Tacos",
    //       "description": "Spicy ground pork sausage, served on a soft corn tortilla with diced onions and cilantro.",
    //       "price": 2.99,
    //       "quantity": 18,
    //       "image": "https://example.com/tacos/chorizo-tacos.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Barbacoa Tacos",
    //       "description": "Slow-cooked beef, served on a soft corn tortilla with chopped cilantro and diced onions.",
    //       "price": 3.49,
    //       "quantity": 15,
    //       "image": "https://example.com/tacos/barbacoa-tacos.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Bean and Cheese Tacos",
    //       "description": "Refried beans and shredded cheese, served on a soft flour tortilla with diced onions and a squeeze of lime.",
    //       "price": 2.49,
    //       "quantity": 20,
    //       "image": "https://example.com/tacos/bean-and-cheese-tacos.jpg",
    //       "categoryId": id._id.toString()
    //     }
    //   ]

    //   isExist = await productModel.insertMany(myProductTacos);
    //   if (isExist) {
    //     print('Init Tacos products successfully', OutputType.SUCCESS);
    //   } else {
    //     print('Init Tacos products failed', OutputType.ERROR);
    //   }

    //   // ----------------------------------------------------------------
    //   id = await categoryModel.findOne({ name: 'Steak' });

    //   const myProductSteak = [
    //     {
    //       "name": "Ribeye Steak",
    //       "description": "A juicy and flavorful cut of beef from the rib section, best served grilled or pan-seared.",
    //       "price": 28.99,
    //       "quantity": 10,
    //       "image": "https://example.com/steak/ribeye-steak.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Filet Mignon",
    //       "description": "A tender and lean cut of beef that is often considered one of the most desirable, best served grilled or broiled.",
    //       "price": 35.99,
    //       "quantity": 8,
    //       "image": "https://example.com/steak/filet-mignon.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "New York Strip Steak",
    //       "description": "A cut of beef from the short loin that has a robust flavor and is best served grilled or broiled.",
    //       "price": 31.99,
    //       "quantity": 12,
    //       "image": "https://example.com/steak/new-york-strip-steak.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "T-Bone Steak",
    //       "description": "A cut of beef that is a combination of the tenderloin and the strip steak, best served grilled or broiled.",
    //       "price": 29.99,
    //       "quantity": 15,
    //       "image": "https://example.com/steak/t-bone-steak.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Porterhouse Steak",
    //       "description": "A large cut of beef from the short loin that is similar to the T-bone steak, best served grilled or broiled.",
    //       "price": 37.99,
    //       "quantity": 10,
    //       "image": "https://example.com/steak/porterhouse-steak.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Flank Steak",
    //       "description": "A lean and flavorful cut of beef that is best served grilled or marinated and pan-seared.",
    //       "price": 23.99,
    //       "quantity": 20,
    //       "image": "https://example.com/steak/flank-steak.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Skirt Steak",
    //       "description": "A flavorful and versatile cut of beef that is great for fajitas, best served grilled or marinated and pan-seared.",
    //       "price": 25.99,
    //       "quantity": 18,
    //       "image": "https://example.com/steak/skirt-steak.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Hanger Steak",
    //       "description": "A tender and flavorful cut of beef that is great for steak frites, best served grilled or pan-seared.",
    //       "price": 27.99,
    //       "quantity": 15,
    //       "image": "https://example.com/steak/hanger-steak.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Flat Iron Steak",
    //       "description": "A tender and flavorful cut of beef that is great for stir-fries and salads, best served grilled or pan-seared.",
    //       "price": 24.99,
    //       "quantity": 20,
    //       "image": "https://example.com/steak/flat-iron-steak.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Sirloin Steak",
    //       "description": "A versatile and flavorful cut of beef that is great for grilling, sautéing, or pan-searing.",
    //       "price": 26.99,
    //       "quantity": 12,
    //       "image": "https://example.com/steak/flat-iron-steak.jpg",
    //       "categoryId": id._id.toString()
    //     }
    //   ];

    //   isExist = await productModel.insertMany(myProductSteak);
    //   if (isExist) {
    //     print('Init Steak products successfully', OutputType.SUCCESS);
    //   } else {
    //     print('Init Steak products failed', OutputType.ERROR);
    //   }

    //   // ----------------------------------------------------------------
    //   id = await categoryModel.findOne({ name: 'Fried chicken' });

    //   const myProductFriedChicken = [
    //     {
    //       "name": "Original Recipe Chicken",
    //       "description": "A classic fried chicken recipe with a blend of 11 herbs and spices.",
    //       "price": 9.99,
    //       "quantity": 10,
    //       "image": "https://example.com/fried-chicken/original-recipe.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Extra Crispy Chicken",
    //       "description": "Crispy and golden fried chicken with a savory and flavorful coating.",
    //       "price": 10.99,
    //       "quantity": 8,
    //       "image": "https://example.com/fried-chicken/extra-crispy.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Honey BBQ Chicken",
    //       "description": "Fried chicken with a sweet and tangy Honey BBQ sauce.",
    //       "price": 12.99,
    //       "quantity": 12,
    //       "image": "https://example.com/fried-chicken/honey-bbq.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Buffalo Chicken",
    //       "description": "Fried chicken coated in spicy buffalo sauce.",
    //       "price": 11.99,
    //       "quantity": 15,
    //       "image": "https://example.com/fried-chicken/buffalo.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Garlic Parmesan Chicken",
    //       "description": "Fried chicken with a garlic and parmesan coating, served with a side of dipping sauce.",
    //       "price": 13.99,
    //       "quantity": 10,
    //       "image": "https://example.com/fried-chicken/garlic-parmesan.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Spicy Chicken",
    //       "description": "Fried chicken with a spicy and flavorful coating.",
    //       "price": 11.99,
    //       "quantity": 18,
    //       "image": "https://example.com/fried-chicken/spicy.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Korean Fried Chicken",
    //       "description": "Crispy fried chicken with a sweet and spicy gochujang sauce, garnished with sesame seeds and scallions.",
    //       "price": 14.99,
    //       "quantity": 12,
    //       "image": "https://example.com/fried-chicken/korean.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Ranch Chicken",
    //       "description": "Fried chicken with a creamy ranch dressing coating, served with a side of dipping sauce.",
    //       "price": 13.99,
    //       "quantity": 10,
    //       "image": "https://example.com/fried-chicken/ranch.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "BBQ Chicken",
    //       "description": "Fried chicken with a tangy BBQ sauce coating.",
    //       "price": 12.99,
    //       "quantity": 15,
    //       "image": "https://example.com/fried-chicken/bbq.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Lemon Pepper Chicken",
    //       "description": "Fried chicken with a zesty lemon pepper seasoning.",
    //       "price": 11.99,
    //       "quantity": 20,
    //       "image": "https://example.com/fried-chicken/lemon-pepper.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Cajun Chicken",
    //       "description": "Fried chicken with a spicy and savory Cajun seasoning.",
    //       "price": 10.99,
    //       "quantity": 18,
    //       "image": "https://example.com/fried-chicken/cajun.jpg",
    //       "categoryId": id._id.toString()
    //     }
    //   ]

    //   isExist = await productModel.insertMany(myProductFriedChicken);
    //   if (isExist) {
    //     print('Init Fried chicken products successfully', OutputType.SUCCESS);
    //   } else {
    //     print('Init Fried chicken products failed', OutputType.ERROR);
    //   }

    //   // ----------------------------------------------------------------
    //   id = await categoryModel.findOne({ name: 'Seafood' });

    //   const myProductSeafood = [
    //     {
    //       "name": "Fresh Salmon",
    //       "description": "Wild Alaskan salmon, sustainably caught and packed with flavor. Perfect for grilling, baking, or pan searing.",
    //       "price": 15.99,
    //       "quantity": 50,
    //       "image": "https://www.example.com/images/fresh_salmon.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Shrimp Cocktail",
    //       "description": "Freshly cooked shrimp served with tangy cocktail sauce. Great as an appetizer or party snack.",
    //       "price": 12.99,
    //       "quantity": 25,
    //       "image": "https://www.example.com/images/shrimp_cocktail.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Lobster Tails",
    //       "description": "Delicious and tender lobster tails, perfect for grilling or baking. Sustainably sourced from Maine.",
    //       "price": 24.99,
    //       "quantity": 20,
    //       "image": "https://www.example.com/images/lobster_tails.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Crab Cakes",
    //       "description": "Handmade crab cakes with sweet lump crab meat and a savory blend of spices. Just heat and serve.",
    //       "price": 18.99,
    //       "quantity": 30,
    //       "image": "https://www.example.com/images/crab_cakes.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Clam Chowder",
    //       "description": "Creamy and hearty New England clam chowder, made with fresh clams, potatoes, and spices.",
    //       "price": 8.99,
    //       "quantity": 40,
    //       "image": "https://www.example.com/images/clam_chowder.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Oysters",
    //       "description": "Freshly shucked oysters, served on the half shell with mignonette or cocktail sauce.",
    //       "price": 2.99,
    //       "quantity": 75,
    //       "image": "https://www.example.com/images/oysters.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Crab Legs",
    //       "description": "Sweet, succulent crab legs, perfect for a special occasion or for when you're craving seafood.",
    //       "price": 29.99,
    //       "quantity": 15,
    //       "image": "https://www.example.com/images/crab_legs.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Fish Tacos",
    //       "description": "Flaky white fish, seasoned and grilled, nestled in a warm tortilla with fresh salsa and avocado.",
    //       "price": 10.99,
    //       "quantity": 30,
    //       "image": "https://www.example.com/images/fish_tacos.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Sea Scallops",
    //       "description": "Large, juicy sea scallops, seared to perfection and served with lemon butter sauce.",
    //       "price": 22.99,
    //       "quantity": 25,
    //       "image": "https://www.example.com/images/sea_scallops.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Shrimp Alfredo",
    //       "description": "Creamy alfredo pasta with plump, juicy shrimp, garnished with fresh parsley.",
    //       "price": 16.99,
    //       "quantity": 20,
    //       "image": "https://www.example.com/images/shrimp_alfredo.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Fish and Chips",
    //       "description": "Crispy battered cod, served with thick-cut fries and tartar sauce. A classic seafood dish.",
    //       "price": 12.99,
    //       "quantity": 35,
    //       "image": "https://www.example.com/images/fish_and_chips.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Seared Tuna Steak",
    //       "description": "Rare tuna steak, seared with a spicy rub and served with a fresh herb salad.",
    //       "price": 19.99,
    //       "quantity": 15,
    //       "image": "https://www.example.com/images/tuna_steak.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Cioppino",
    //       "description": "Hearty fish stew, made with fresh fish, clams, mussels, shrimp, and a savory tomato broth.",
    //       "price": 24.99,
    //       "quantity": 10,
    //       "image": "https://www.example.com/images/cioppino.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Smoked Salmon",
    //       "description": "Delicately smoked salmon, perfect for bagels and cream cheese, or as a gourmet appetizer.",
    //       "price": 14.99,
    //       "quantity": 45,
    //       "image": "https://www.example.com/images/smoked_salmon.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Seafood Paella",
    //       "description": "A classic Spanish dish, made with saffron-infused rice, a variety of seafood, and fresh veggies.",
    //       "price": 29.99,
    //       "quantity": 5,
    //       "image": "https://www.example.com/images/seafood_paella.jpg",
    //       "categoryId": id._id.toString()
    //     }
    //   ];

    //   isExist = await productModel.insertMany(myProductSeafood);
    //   if (isExist) {
    //     print('Init Seafood products successfully', OutputType.SUCCESS);
    //   } else {
    //     print('Init Seafood products failed', OutputType.ERROR);
    //   }

    //   // ----------------------------------------------------------------
    //   id = await categoryModel.findOne({ name: 'Pasta' });

    //   const myProductPasta = [
    //     {
    //        "name": "Spaghetti Bolognese",
    //        "description": "Spaghetti served with meatballs in a tomato-based sauce.",
    //        "price": 9.99,
    //        "quantity": 20,
    //        "image": "https://images.unsplash.com/photo-1589813651539-a978687c0857",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Fettuccine Alfredo",
    //        "description": "Fettuccine served in a creamy Parmesan sauce.",
    //        "price": 12.99,
    //        "quantity": 15,
    //        "image": "https://images.unsplash.com/photo-1617400727736-f44b23dffa6c",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Spaghetti Carbonara",
    //        "description": "Spaghetti served with bacon, cream, and Parmesan cheese.",
    //        "price": 10.99,
    //        "quantity": 18,
    //        "image": "https://images.unsplash.com/photo-1606991391017-897694e65bb0",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Penne alla Vodka",
    //        "description": "Penne served in a tomato-based sauce with cream and vodka.",
    //        "price": 11.99,
    //        "quantity": 17,
    //        "image": "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Lasagna",
    //        "description": "Oven-baked layered pasta dish with tomato sauce, meat, and cheese.",
    //        "price": 14.99,
    //        "quantity": 12,
    //        "image": "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Pappardelle",
    //        "description": "Thick and wide pasta served with wild boar ragù.",
    //        "price": 13.99,
    //        "quantity": 16,
    //        "image": "https://images.unsplash.com/photo-1587661401548-d0daa15dc499",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Linguine alle Vongole",
    //        "description": "Linguine served with clams in a white wine garlic sauce.",
    //        "price": 12.99,
    //        "quantity": 14,
    //        "image": "https://images.unsplash.com/photo-1587658993321-dceccf4459bd",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Cacio e Pepe",
    //        "description": "Spaghetti served with a sauce made with Pecorino Romano and black pepper.",
    //        "price": 10.99,
    //        "quantity": 19,
    //        "image": "https://images.unsplash.com/photo-1551361590-cbf427dac6c8",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Ravioli",
    //        "description": "Pasta filled with spinach and ricotta cheese served in tomato sauce.",
    //        "price": 11.99,
    //        "quantity": 18,
    //        "image": "https://images.unsplash.com/photo-1549766324-d1a012c076b9",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Tagliatelle ai Funghi Porcini",
    //        "description": "Tagliatelle served with a mushroom-based sauce.",
    //        "price": 12.99,
    //        "quantity": 15,
    //        "image": "https://images.unsplash.com/photo-1475837083971-d692d5536833",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Pesto Linguine",
    //        "description": "Linguine served with a sauce made with basil, garlic, Parmesan cheese, and pine nuts.",
    //        "price": 10.99,
    //        "quantity": 20,
    //        "image": "https://images.unsplash.com/photo-1553418626-a802e0ad7a0c",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Tortellini",
    //        "description": "Pasta filled with meat served in a tomato-based sauce with cream.",
    //        "price": 11.99,
    //        "quantity": 16,
    //        "image": "https://images.unsplash.com/photo-1597096592889-e6d7dd84de33",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Cannelloni",
    //        "description": "Tube-shaped pasta filled with spinach and ricotta cheese served in a tomato-based sauce.",
    //        "price": 13.99,
    //        "quantity": 12,
    //        "image": "https://images.unsplash.com/photo-1610679781358-caf81c94d7d0",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Farfalle al Salmone",
    //        "description": "Bow-tie pasta served with salmon in a cream sauce.",
    //        "price": 12.99,
    //        "quantity": 18,
    //        "image": "https://images.unsplash.com/photo-1586980287265-06ae9a1311d7",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Rigatoni alla Norma",
    //        "description": "Rigatoni served in a tomato-based sauce with fried aubergines and ricotta cheese.",
    //        "price": 11.99,
    //        "quantity": 17,
    //        "image": "https://images.unsplash.com/photo-1609363711237-0b5f351c94e9",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Linguine alla Puttanesca",
    //        "description": "Linguine served in a tomato-based sauce with olives, capers, and anchovies.",
    //        "price": 10.99,
    //        "quantity": 20,
    //        "image": "https://images.unsplash.com/photo-1566216426913-581e49b4c4b4",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Tonnarelli Cacio e Pepe",
    //        "description": "Thick spaghetti served with a sauce made with Pecorino Romano and black pepper.",
    //        "price": 11.99,
    //        "quantity": 16,
    //        "image": "https://images.unsplash.com/photo-1548324646-a992a6fa6922",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Orecchiette al Ragu di Salsiccia",
    //        "description": "Ear-shaped pasta served with a sausage-based tomato sauce.",
    //        "price": 12.99,
    //        "quantity": 15,
    //        "image": "https://images.unsplash.com/photo-1572319411817-5c2dbc5d5e5c",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Penne all'Arrabbiata",
    //        "description": "Penne served in a spicy tomato-based sauce.",
    //        "price": 10.99,
    //        "quantity": 19,
    //        "image": "https://images.unsplash.com/photo-1578957807209-7b26fbe95202",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Risotto ai Funghi Porcini",
    //        "description": "Rice served with a mushroom-based sauce.",
    //        "price": 15.99,
    //        "quantity": 10,
    //        "image": "https://images.unsplash.com/photo-1598955347753-0f3272d4c4f4",
    //        "categoryId": id._id.toString()
    //     },
    //     {
    //        "name": "Gnocchi alla Sorrentina",
    //        "description": "Italian dumplings made of potatoes served in a tomato-based sauce with mozzarella cheese.",
    //        "price": 13.99,
    //        "quantity": 14,
    //        "image": "https://images.unsplash.com/photo-1464891987899-e8a029b6f331",
    //        "categoryId": id._id.toString()
    //     }
    //  ];

    //   isExist = await productModel.insertMany(myProductPasta);
    //   if (isExist) {
    //     print('Init Pasta products successfully', OutputType.SUCCESS);
    //   } else {
    //     print('Init Pasta products failed', OutputType.ERROR);
    //   }

    //   // ----------------------------------------------------------------
    //   id = await categoryModel.findOne({ name: 'Salad' });

    //   const myProductSalad = [
    //     {
    //       "name": "Salmon Salad",
    //       "description": "Fresh greens topped with smoked salmon, cherry tomatoes, and a tangy vinaigrette dressing",
    //       "price": 12.99,
    //       "quantity": 10,
    //       "image": "https://via.placeholder.com/300x200?text=Salmon+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Mediterranean Salad",
    //       "description": "A delicious blend of lettuce, cucumbers, feta cheese, and olives with a balsamic vinaigrette dressing",
    //       "price": 9.99,
    //       "quantity": 15,
    //       "image": "https://via.placeholder.com/300x200?text=Mediterranean+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Cobb Salad",
    //       "description": "A classic salad with grilled chicken, avocado, bacon, and blue cheese over a bed of crisp lettuce",
    //       "price": 11.99,
    //       "quantity": 10,
    //       "image": "https://via.placeholder.com/300x200?text=Cobb+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Greek Salad",
    //       "description": "A traditional salad with fresh tomatoes, cucumbers, bell peppers, red onions, and feta cheese with a lemon vinaigrette dressing",
    //       "price": 8.99,
    //       "quantity": 20,
    //       "image": "https://via.placeholder.com/300x200?text=Greek+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Caesar Salad",
    //       "description": "Crisp romaine lettuce mixed with parmesan cheese and croutons, tossed in a creamy Caesar dressing",
    //       "price": 7.99,
    //       "quantity": 25,
    //       "image": "https://via.placeholder.com/300x200?text=Caesar+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Spinach Salad",
    //       "description": "Baby spinach topped with bacon, hot bacon dressing, and sliced mushrooms",
    //       "price": 9.99,
    //       "quantity": 10,
    //       "image": "https://via.placeholder.com/300x200?text=Spinach+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Mexican Salad",
    //       "description": "A flavorful salad with seasoned ground beef, black beans, corn, tomatoes, and cheddar cheese with a cilantro lime dressing",
    //       "price": 10.99,
    //       "quantity": 15,
    //       "image": "https://via.placeholder.com/300x200?text=Mexican+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Asian Salad",
    //       "description": "A delicious blend of crunchy veggies, crispy wontons, and grilled chicken with an Asian-inspired dressing",
    //       "price": 11.99,
    //       "quantity": 10,
    //       "image": "https://via.placeholder.com/300x200?text=Asian+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Fruit Salad",
    //       "description": "A refreshing combination of seasonal fruits with a honey lime dressing",
    //       "price": 6.99,
    //       "quantity": 20,
    //       "image": "https://via.placeholder.com/300x200?text=Fruit+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Caprese Salad",
    //       "description": "Fresh mozzarella, sliced tomatoes, and basil with a balsamic glaze",
    //       "price": 8.99,
    //       "quantity": 15,
    //       "image": "https://via.placeholder.com/300x200?text=Caprese+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Taco Salad",
    //       "description": "A hearty salad with seasoned ground beef, lettuce, tomatoes, cheese, and tortilla chips with a salsa-ranch dressing",
    //       "price": 10.99,
    //       "quantity": 10,
    //       "image": "https://via.placeholder.com/300x200?text=Taco+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Southwest Salad",
    //       "description": "A spicy salad with blackened chicken, corn, black beans, and jalapenos with a chipotle dressing",
    //       "price": 11.99,
    //       "quantity": 10,
    //       "image": "https://via.placeholder.com/300x200?text=Southwest+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Kale Salad",
    //       "description": "A healthy salad with kale, quinoa, roasted sweet potatoes, and a garlic tahini dressing",
    //       "price": 9.99,
    //       "quantity": 15,
    //       "image": "https://via.placeholder.com/300x200?text=Kale+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "BBQ Chicken Salad",
    //       "description": "Grilled chicken topped with BBQ sauce, mixed greens, tomatoes, and cheddar cheese with a ranch dressing",
    //       "price": 10.99,
    //       "quantity": 10,
    //       "image": "https://via.placeholder.com/300x200?text=BBQ+Chicken+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Steak Salad",
    //       "description": "A hearty salad with grilled steak, mixed greens, cherry tomatoes, and a blue cheese dressing",
    //       "price": 12.99,
    //       "quantity": 10,
    //       "image": "https://via.placeholder.com/300x200?text=Steak+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Spring Salad",
    //       "description": "A light and refreshing salad with mixed greens, grapefruit, avocado, and a honey mustard dressing",
    //       "price": 8.99,
    //       "quantity": 20,
    //       "image": "https://via.placeholder.com/300x200?text=Spring+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Shrimp Salad",
    //       "description": "Fresh greens topped with grilled shrimp, cucumbers, and a citrus vinaigrette dressing",
    //       "price": 12.99,
    //       "quantity": 10,
    //       "image": "https://via.placeholder.com/300x200?text=Shrimp+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Cranberry Walnut Salad",
    //       "description": "Mixed greens topped with dried cranberries, walnuts, and crumbled blue cheese with a balsamic vinaigrette dressing",
    //       "price": 9.99,
    //       "quantity": 15,
    //       "image": "https://via.placeholder.com/300x200?text=Cranberry+Walnut+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Grilled Vegetable Salad",
    //       "description": "A delicious salad with grilled zucchini, eggplant, and bell peppers over a bed of mixed greens with a red wine vinaigrette dressing",
    //       "price": 10.99,
    //       "quantity": 10,
    //       "image": "https://via.placeholder.com/300x200?text=Grilled+Vegetable+Salad",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Quinoa Salad",
    //       "description": "A healthy salad with quinoa, mixed greens, roasted vegetables, and a lemon garlic dressing",
    //       "price": 9.99,
    //       "quantity": 15,
    //       "image": "https://via.placeholder.com/300x200?text=Quinoa+Salad",
    //       "categoryId": id._id.toString()
    //     }
    //   ];

    //   isExist = await productModel.insertMany(myProductSalad);
    //   if (isExist) {
    //     print('Init Salad products successfully', OutputType.SUCCESS);
    //   } else {
    //     print('Init Salad products failed', OutputType.ERROR);
    //   }

    //   // ----------------------------------------------------------------
    //   id = await categoryModel.findOne({ name: 'Sandwich' });

    //   const myProductSandwich = [
    //     {
    //       "name": "BLT Sandwich",
    //       "description": "Toasted bread with crispy bacon, lettuce, and juicy tomato slices served with a side of fries.",
    //       "price": 8.99,
    //       "quantity": 10,
    //       "image": "https://images.unsplash.com/photo-1579467791759-52d9471f0aa7",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Roast Beef Sandwich",
    //       "description": "Savory roast beef on a ciabatta roll with melted provolone cheese and homemade horseradish sauce.",
    //       "price": 9.99,
    //       "quantity": 15,
    //       "image": "https://images.unsplash.com/photo-1600755644535-1c34d9f70c57",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Grilled Cheese Sandwich",
    //       "description": "Classic American grilled cheese on sliced sourdough bread. Served with a cup of tomato soup.",
    //       "price": 6.99,
    //       "quantity": 20,
    //       "image": "https://images.unsplash.com/photo-1543346487-8ea2d2e39a6f",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Turkey Cranberry Sandwich",
    //       "description": "Sliced roasted turkey on a soft roll with a generous helping of cranberry sauce, lettuce, and mayo.",
    //       "price": 7.99,
    //       "quantity": 12,
    //       "image": "https://images.unsplash.com/photo-1600261751409-cd5a76a5c5d5",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Veggie Sandwich",
    //       "description": "Freshly baked ciabatta roll with mixed greens, sliced tomato, cucumber, marinated mushrooms, and sprouts with basil pesto mayo.",
    //       "price": 8.99,
    //       "quantity": 8,
    //       "image": "https://images.unsplash.com/photo-1543346487-8ea2d2e39a6f",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Tuna Salad Sandwich",
    //       "description": "Tuna salad with mayo and scallions on wheat bread with lettuce, tomato, and red onions.",
    //       "price": 7.99,
    //       "quantity": 10,
    //       "image": "https://images.unsplash.com/photo-1601759437450-6e0d1c17e207",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "French Dip Sandwich",
    //       "description": "Thinly sliced roast beef on a baguette. Served with a side of au jus dip for a deliciously satisfying sandwich.",
    //       "price": 10.99,
    //       "quantity": 15,
    //       "image": "https://images.unsplash.com/photo-1538155354402-7e070392a908",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Philly Cheesesteak Sandwich",
    //       "description": "Juicy steak with melted provolone cheese on a toasted hoagie roll with grilled onions and peppers.",
    //       "price": 11.99,
    //       "quantity": 18,
    //       "image": "https://images.unsplash.com/photo-1550253971-0d8d15b40c32",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Club Sandwich",
    //       "description": "Triple-layered sandwich with sliced turkey breast, crispy bacon, lettuce, tomato, and mayo.",
    //       "price": 9.99,
    //       "quantity": 20,
    //       "image": "https://images.unsplash.com/photo-1536197566187-8541bdd537a1",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Meatball Sub Sandwich",
    //       "description": "Homemade meatball subs with marinara sauce and melted mozzarella cheese on a toasted hoagie roll.",
    //       "price": 10.99,
    //       "quantity": 16,
    //       "image": "https://images.unsplash.com/photo-1560780313-c3a2a0478342",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Pulled Pork Sandwich",
    //       "description": "BBQ pulled pork on a brioche bun with pickles, coleslaw, and a side of sweet potato fries.",
    //       "price": 12.99,
    //       "quantity": 14,
    //       "image": "https://images.unsplash.com/photo-1585084113714-33be4d712bf4",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Reuben Sandwich",
    //       "description": "Corned beef on rye bread with sauerkraut, Swiss cheese, and Thousand Island dressing.",
    //       "price": 9.99,
    //       "quantity": 15,
    //       "image": "https://images.unsplash.com/photo-1521053831212-54d1e9b8d0f7",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Chicken Caesar Sandwich",
    //       "description": "Grilled chicken on a ciabatta roll with romaine lettuce, Parmesan cheese, and Caesar dressing.",
    //       "price": 8.99,
    //       "quantity": 12,
    //       "image": "https://images.unsplash.com/photo-1558692265-5b5bd13ceefe",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Buffalo Chicken Sandwich",
    //       "description": "Spicy Buffalo chicken with blue cheese dressing and lettuce on a brioche bun.",
    //       "price": 9.99,
    //       "quantity": 10,
    //       "image": "https://images.unsplash.com/photo-1564968211547-87730d8a2c22",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Caprese Sandwich",
    //       "description": "Fresh mozzarella with sliced tomato, basil leaves, and balsamic glaze on a toasted baguette.",
    //       "price": 7.99,
    //       "quantity": 8,
    //       "image": "https://images.unsplash.com/photo-1524919723004-6c477b6a68f6",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Egg Salad Sandwich",
    //       "description": "Homemade egg salad on a croissant with lettuce, tomato, and mayo.",
    //       "price": 6.99,
    //       "quantity": 10,
    //       "image": "https://images.unsplash.com/photo-1557482338-f9d73e198b98",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Monte Cristo Sandwich",
    //       "description": "Ham and turkey stacked on French toast with melted Swiss cheese and raspberry jam on the side.",
    //       "price": 10.99,
    //       "quantity": 12,
    //       "image": "https://images.unsplash.com/photo-1588082297573-99c2ab752050",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Pastrami Sandwich",
    //       "description": "Hot pastrami on rye bread with spicy mustard and pickles.",
    //       "price": 9.99,
    //       "quantity": 15,
    //       "image": "https://images.unsplash.com/photo-1615239527036-06f1ac434eab",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "The Italian Sandwich",
    //       "description": "Sliced salami, pepperoni, and provolone cheese on a hoagie roll with lettuce, tomato, red onion, and Italian dressing.",
    //       "price": 10.99,
    //       "quantity": 20,
    //       "image": "https://images.unsplash.com/photo-1534474069459-0da01daa3d3a",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "The Dagwood Sandwich",
    //       "description": "The ultimate stacked sandwich with ham, turkey, roast beef, Swiss cheese, lettuce, tomato, mayo, and mustard.",
    //       "price": 12.99,
    //       "quantity": 18,
    //       "image": "https://images.unsplash.com/photo-1538155354402-7e070392a908",
    //       "categoryId": id._id.toString()
    //     }
    //   ];

    //   isExist = await productModel.insertMany(myProductSandwich);
    //   if (isExist) {
    //     print('Init Sandwich products successfully', OutputType.SUCCESS);
    //   } else {
    //     print('Init Sandwich products failed', OutputType.ERROR);
    //   }

    //   // ----------------------------------------------------------------
    //   id = await categoryModel.findOne({ name: 'BBQ' });

    //   const myProductBBQ = [
    //     {
    //       "name": "Grilled Beef Skewers",
    //       "description": "Tender, juicy beef grilled to perfection and served on a skewer with onions and peppers.",
    //       "price": 12.99,
    //       "quantity": 25,
    //       "image": "https://example.com/grilled-beef-skewers.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Pulled Pork Sandwich",
    //       "description": "Slow-cooked pork shoulder, pulled and mixed with our signature BBQ sauce. Served on a bun with coleslaw.",
    //       "price": 9.99,
    //       "quantity": 30,
    //       "image": "https://example.com/pulled-pork-sandwich.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Smoked Brisket Plate",
    //       "description": "Tender smoked brisket, sliced and served with a side of mac & cheese and green beans.",
    //       "price": 14.99,
    //       "quantity": 20,
    //       "image": "https://example.com/smoked-brisket-plate.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "BBQ Chicken Wings",
    //       "description": "Crispy chicken wings coated in our special BBQ rub and served with ranch dressing.",
    //       "price": 8.99,
    //       "quantity": 40,
    //       "image": "https://example.com/bbq-chicken-wings.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Grilled Shrimp Skewers",
    //       "description": "Jumbo shrimp grilled to perfection and served on a skewer with pineapple and teriyaki sauce.",
    //       "price": 15.99,
    //       "quantity": 18,
    //       "image": "https://example.com/grilled-shrimp-skewers.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "BBQ Ribs",
    //       "description": "Fall-off-the-bone tender pork ribs coated in our tangy BBQ sauce.",
    //       "price": 16.99,
    //       "quantity": 15,
    //       "image": "https://example.com/bbq-ribs.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Grilled Vegetable Kabobs",
    //       "description": "Assorted vegetables grilled on a skewer and served with a side of hummus.",
    //       "price": 10.99,
    //       "quantity": 25,
    //       "image": "https://example.com/grilled-vegetable-kabobs.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "BBQ Tofu Sandwich",
    //       "description": "Marinated tofu grilled and served on a bun with crispy onions and our signature BBQ sauce.",
    //       "price": 9.99,
    //       "quantity": 20,
    //       "image": "https://example.com/bbq-tofu-sandwich.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Brisket Burnt Ends",
    //       "description": "Crispy pieces of smoked brisket tossed in our tangy BBQ sauce and served with a side of baked beans.",
    //       "price": 12.99,
    //       "quantity": 18,
    //       "image": "https://example.com/brisket-burnt-ends.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Grilled Pineapple",
    //       "description": "Fresh pineapple rings grilled to perfection and served with a dollop of whipped cream.",
    //       "price": 5.99,
    //       "quantity": 30,
    //       "image": "https://example.com/grilled-pineapple.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Pulled Chicken Tacos",
    //       "description": "Slow-cooked chicken mixed with our tangy BBQ sauce, served on soft flour tortillas with shredded lettuce, tomato, and cheese.",
    //       "price": 11.99,
    //       "quantity": 25,
    //       "image": "https://example.com/pulled-chicken-tacos.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "BBQ Pork Belly Bites",
    //       "description": "Crispy chunks of pork belly coated in our signature BBQ rub and served with a side of garlic aioli.",
    //       "price": 13.99,
    //       "quantity": 15,
    //       "image": "https://example.com/bbq-pork-belly-bites.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Grilled Salmon Fillet",
    //       "description": "Fresh salmon fillet grilled with a smoky char and served with a side of grilled asparagus.",
    //       "price": 17.99,
    //       "quantity": 10,
    //       "image": "https://example.com/grilled-salmon-fillet.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "BBQ Beef Brisket Sandwich",
    //       "description": "Slow-cooked beef brisket sliced thin and served on a bun with caramelized onions and our signature BBQ sauce.",
    //       "price": 13.99,
    //       "quantity": 20,
    //       "image": "https://example.com/bbq-beef-brisket-sandwich.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Grilled Corn on the Cob",
    //       "description": "Fresh ears of corn grilled to perfection and served with a side of chili-lime butter.",
    //       "price": 6.99,
    //       "quantity": 30,
    //       "image": "https://example.com/grilled-corn-on-the-cob.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "BBQ Pork Tamales",
    //       "description": "Fresh tamales filled with slow-cooked pork mixed with our signature BBQ sauce.",
    //       "price": 10.99,
    //       "quantity": 15,
    //       "image": "https://example.com/bbq-pork-tamales.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Ribeye Steak",
    //       "description": "Premium-quality ribeye steak grilled to your preferred temperature and served with a side of garlic mashed potatoes.",
    //       "price": 24.99,
    //       "quantity": 8,
    //       "image": "https://example.com/ribeye-steak.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "BBQ Chicken Salad",
    //       "description": "Mixed greens topped with cherry tomatoes, avocado, grilled chicken, and drizzled with our tangy BBQ sauce.",
    //       "price": 12.99,
    //       "quantity": 20,
    //       "image": "https://example.com/bbq-chicken-salad.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Grilled Sausage Platter",
    //       "description": "Assorted grilled sausages served with a side of sauerkraut and spicy mustard.",
    //       "price": 14.99,
    //       "quantity": 18,
    //       "image": "https://example.com/grilled-sausage-platter.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "BBQ Brisket Nachos",
    //       "description": "Tortilla chips topped with slow-cooked brisket, melted cheese, and drizzled with our tangy BBQ sauce.",
    //       "price": 11.99,
    //       "quantity": 25,
    //       "image": "https://example.com/bbq-brisket-nachos.jpg",
    //       "categoryId": id._id.toString()
    //     }
    //   ];

    //   isExist = await productModel.insertMany(myProductBBQ);
    //   if (isExist) {
    //     print('Init BBQ products successfully', OutputType.SUCCESS);
    //   } else {
    //     print('Init BBQ products failed', OutputType.ERROR);
    //   }

    //   // ----------------------------------------------------------------
    //   id = await categoryModel.findOne({ name: 'Dessert' });

    //   const myProductDessert = [
    //     {
    //       "name": "Chocolate Fudge Cake",
    //       "description": "Rich, dark, and indulgent chocolate fudge cake. Served with a creamy, smooth chocolate icing and finished with a sprinkle of cocoa powder.",
    //       "price": 8.99,
    //       "quantity": 10,
    //       "image": "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Strawberry Shortcake",
    //       "description": "Layers of light and fluffy vanilla cake, fresh strawberries, and whipped cream. A classic summer dessert perfect for any occasion!",
    //       "price": 6.99,
    //       "quantity": 15,
    //       "image": "https://images.unsplash.com/photo-1578009443909-ccb51e92a768",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Peach Cobbler",
    //       "description": "Freshly sliced peaches baked in a golden crust, topped with a dollop of vanilla ice cream. A warm and comforting dessert that's perfect for any season.",
    //       "price": 9.99,
    //       "quantity": 8,
    //       "image": "https://images.unsplash.com/photo-1557728371-30f9a9a2bda2",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Key Lime Pie",
    //       "description": "Sweet and tangy key lime pie made with a graham cracker crust and topped with whipped cream. Perfect for any summer gathering!",
    //       "price": 7.99,
    //       "quantity": 12,
    //       "image": "https://images.unsplash.com/photo-1599558510875-d7ead3d5b2c7",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Blueberry Cheesecake",
    //       "description": "Creamy, rich cheesecake filled with juicy blueberries and baked on a buttery graham cracker crust. A delicious and decadent dessert for any occasion!",
    //       "price": 10.99,
    //       "quantity": 6,
    //       "image": "https://images.unsplash.com/photo-1580479534274-12c551f223a4",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Raspberry Trifle",
    //       "description": "Layers of cake, pudding, fresh raspberries, and whipped cream come together to make a beautiful and delicious dessert. Perfect for parties and gatherings!",
    //       "price": 12.99,
    //       "quantity": 4,
    //       "image": "https://images.unsplash.com/photo-1610723126622-5017b03c42af",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Tiramisu",
    //       "description": "A classic Italian dessert made with ladyfingers soaked in espresso and layered with a creamy mascarpone filling. Finished with a dusting of cocoa powder.",
    //       "price": 8.99,
    //       "quantity": 10,
    //       "image": "https://images.unsplash.com/photo-1594200640707-094f8e5402af",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Banana Pudding",
    //       "description": "Layers of vanilla pudding, fresh bananas, and vanilla wafers come together to make a classic and delicious dessert that everyone will love!",
    //       "price": 6.99,
    //       "quantity": 15,
    //       "image": "https://images.unsplash.com/photo-1588493231419-7abe30b0870d",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Pecan Pie",
    //       "description": "A Southern classic made with a sweet and buttery pecan filling baked in a flaky pie crust. A delicious and indulgent dessert for any occasion!",
    //       "price": 9.99,
    //       "quantity": 8,
    //       "image": "https://images.unsplash.com/photo-1606813541366-8a9e9a6b79e6",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Red Velvet Cupcakes",
    //       "description": "Moist and fluffy cupcakes with a rich red velvet flavor, topped with a creamy cream cheese frosting. A crowd-pleasing dessert for any occasion!",
    //       "price": 3.99,
    //       "quantity": 20,
    //       "image": "https://images.unsplash.com/photo-1582836551555-5a5c9b34eda5",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Apple Pie",
    //       "description": "Freshly baked apple pie made with a buttery crust and filled with cinnamon-spiced apples. A classic dessert that's perfect for any time of year!",
    //       "price": 10.99,
    //       "quantity": 6,
    //       "image": "https://images.unsplash.com/photo-1627706784141-5720f413d901",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Lemon Bars",
    //       "description": "Tangy and sweet lemon bars with a buttery shortbread crust. A bright and refreshing dessert that's perfect for summer!",
    //       "price": 7.99,
    //       "quantity": 12,
    //       "image": "https://images.unsplash.com/photo-1612187645736-d1bbabc25c31",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Black Forest Cake",
    //       "description": "Layers of moist chocolate cake, whipped cream, and cherry filling. Topped with chocolate shavings and fresh cherries. A decadent and indulgent dessert!",
    //       "price": 12.99,
    //       "quantity": 4,
    //       "image": "https://images.unsplash.com/photo-1508232370545-9fc84b87e28d",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Coconut Cream Pie",
    //       "description": "A classic custard pie made with creamy coconut filling and topped with whipped cream and toasted coconut shavings. A delicious and tropical dessert!",
    //       "price": 8.99,
    //       "quantity": 10,
    //       "image": "https://images.unsplash.com/photo-1525699866377-c62e03b8ffac",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Cinnamon Rolls",
    //       "description": "Freshly baked cinnamon rolls with warm cinnamon filling and a sweet and tangy cream cheese frosting. The perfect breakfast or dessert!",
    //       "price": 5.99,
    //       "quantity": 18,
    //       "image": "https://images.unsplash.com/photo-1609511851964-4a6e14ae3d3c",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Salted Caramel Brownies",
    //       "description": "Rich and fudgy chocolate brownies with a gooey salted caramel center. Topped with sea salt for the perfect balance of sweet and salty.",
    //       "price": 9.99,
    //       "quantity": 8,
    //       "image": "https://images.unsplash.com/photo-1466893451848-23281a71b07d",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Pumpkin Pie",
    //       "description": "A classic Thanksgiving dessert made with a spiced pumpkin filling baked in a flaky pie crust. Served with whipped cream for the ultimate fall treat.",
    //       "price": 10.99,
    //       "quantity": 6,
    //       "image": "https://images.unsplash.com/photo-1572605427581-2fed80011f8b",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Lava Cake",
    //       "description": "Warm and gooey chocolate lava cake with a molten chocolate center. Served with vanilla ice cream for the ultimate dessert experience!",
    //       "price": 7.99,
    //       "quantity": 12,
    //       "image": "https://images.unsplash.com/photo-1585032243815-dd5b7c3cb3ef",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Fruit Tart",
    //       "description": "A buttery tart shell filled with a creamy pastry cream and topped with fresh fruit. A beautiful and refreshing dessert that's perfect for any occasion.",
    //       "price": 12.99,
    //       "quantity": 4,
    //       "image": "https://images.unsplash.com/photo-1612022900296-d9d6f09df6b4",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Cheesecake",
    //       "description": "Creamy and decadent cheesecake with a graham cracker crust. Topped with your choice of fresh berries or a delicious fruit compote.",
    //       "price": 8.99,
    //       "quantity": 10,
    //       "image": "https://images.unsplash.com/photo-1509565621997-cc9e41134c9d",
    //       "categoryId": id._id.toString()
    //     }
    //   ];

    //   isExist = await productModel.insertMany(myProductDessert);
    //   if (isExist) {
    //     print('Init Dessert products successfully', OutputType.SUCCESS);
    //   } else {
    //     print('Init Dessert products failed', OutputType.ERROR);
    //   }

    //   // ----------------------------------------------------------------
    //   id = await categoryModel.findOne({ name: 'Soup' });

    //   const myProductSoup = [
    //     {
    //       "name": "Soup with Mixed Vegetables",
    //       "description": "A healthy and nutritious soup made with a mix of fresh vegetables.",
    //       "price": 6.99,
    //       "quantity": 50,
    //       "image": "https://example.com/soup-vegetables.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Creamy Potato Soup",
    //       "description": "A delicious and warming soup made with creamy potatoes and a blend of spices.",
    //       "price": 8.99,
    //       "quantity": 30,
    //       "image": "https://example.com/soup-potato.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Tomato and Basil Soup",
    //       "description": "A classic soup made with ripe tomatoes and fresh basil leaves.",
    //       "price": 7.99,
    //       "quantity": 20,
    //       "image": "https://example.com/soup-tomato.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Broccoli Cheddar Soup",
    //       "description": "A rich and hearty soup made with tender broccoli and sharp cheddar cheese.",
    //       "price": 9.99,
    //       "quantity": 40,
    //       "image": "https://example.com/soup-broccoli.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Minestrone Soup",
    //       "description": "A traditional Italian soup made with a variety of vegetables and pasta.",
    //       "price": 10.99,
    //       "quantity": 25,
    //       "image": "https://example.com/soup-minestrone.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Chicken Noodle Soup",
    //       "description": "A comforting bowl of soup made with tender chicken and hearty egg noodles.",
    //       "price": 8.99,
    //       "quantity": 35,
    //       "image": "https://example.com/soup-chicken.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Beef Barley Soup",
    //       "description": "A rustic soup made with tender beef and hearty barley grains.",
    //       "price": 11.99,
    //       "quantity": 15,
    //       "image": "https://example.com/soup-beef.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Lentil Soup",
    //       "description": "A vegetarian soup made with nutritious lentils and a blend of spices.",
    //       "price": 7.99,
    //       "quantity": 50,
    //       "image": "https://example.com/soup-lentil.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Corn Chowder",
    //       "description": "A creamy and decadent corn soup made with fresh corn and cream.",
    //       "price": 9.99,
    //       "quantity": 30,
    //       "image": "https://example.com/soup-corn.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Butternut Squash Soup",
    //       "description": "A smooth and warming soup made with roasted butternut squash and a hint of spice.",
    //       "price": 8.99,
    //       "quantity": 20,
    //       "image": "https://example.com/soup-squash.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "French Onion Soup",
    //       "description": "A rich and savory soup made with caramelized onions and a crusty bread topping.",
    //       "price": 12.99,
    //       "quantity": 25,
    //       "image": "https://example.com/soup-onion.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Clam Chowder",
    //       "description": "A hearty and satisfying soup made with plump clams and creamy potatoes.",
    //       "price": 13.99,
    //       "quantity": 15,
    //       "image": "https://example.com/soup-clam.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Gazpacho",
    //       "description": "A refreshing and spicy soup made with fresh tomatoes and other vegetables.",
    //       "price": 6.99,
    //       "quantity": 40,
    //       "image": "https://example.com/soup-gazpacho.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Thai Coconut Soup",
    //       "description": "A fragrant and spicy soup made with creamy coconut milk and a variety of Thai spices.",
    //       "price": 11.99,
    //       "quantity": 20,
    //       "image": "https://example.com/soup-thai.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Matzo Ball Soup",
    //       "description": "A classic Jewish soup made with tender matzo balls and a savory chicken broth.",
    //       "price": 9.99,
    //       "quantity": 30,
    //       "image": "https://example.com/soup-matzo.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Split Pea Soup",
    //       "description": "A hearty and comforting soup made with dried split peas and chunks of ham.",
    //       "price": 8.99,
    //       "quantity": 25,
    //       "image": "https://example.com/soup-pea.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Vegetable Beef Soup",
    //       "description": "A satisfying and flavorful soup made with tender beef and a variety of fresh vegetables.",
    //       "price": 12.99,
    //       "quantity": 15,
    //       "image": "https://example.com/soup-beef-vegetable.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Potato Leek Soup",
    //       "description": "A creamy and decadent soup made with tender leeks and creamy potatoes.",
    //       "price": 7.99,
    //       "quantity": 20,
    //       "image": "https://example.com/soup-potato-leek.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Miso Soup",
    //       "description": "A traditional Japanese soup made with savory miso paste and tender tofu cubes.",
    //       "price": 6.99,
    //       "quantity": 40,
    //       "image": "https://example.com/soup-miso.jpg",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Beef Stew",
    //       "description": "A hearty and flavorful stew made with tender beef and a variety of fresh vegetables.",
    //       "price": 13.99,
    //       "quantity": 15,
    //       "image": "https://example.com/soup-beef-stew.jpg",
    //       "categoryId": id._id.toString()
    //     }
    //   ];

    //   isExist = await productModel.insertMany(myProductSoup);
    //   if (isExist) {
    //     print('Init Soup products successfully', OutputType.SUCCESS);
    //   } else {
    //     print('Init Soup products failed', OutputType.ERROR);
    //   }

    //   // ----------------------------------------------------------------
    //   id = await categoryModel.findOne({ name: 'Breakfast' });

    //   const myProductBreakfast =  [
    //     {
    //       "name": "Eggs Benedict",
    //       "description": "Two poached eggs over grilled ham and an English muffin, topped with hollandaise sauce.",
    //       "price": 12.99,
    //       "quantity": 10,
    //       "image": "https://images.unsplash.com/photo-1517816743773-6c760b47afc5",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Pumpkin Pancakes",
    //       "description": "Fluffy pumpkin pancakes served with whipped cream and maple syrup.",
    //       "price": 9.99,
    //       "quantity": 15,
    //       "image": "https://images.unsplash.com/photo-1554978842-50f008c63ac9",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Belgian Waffles",
    //       "description": "Golden brown Belgian waffles served with fresh berries and whipped cream.",
    //       "price": 11.49,
    //       "quantity": 8,
    //       "image": "https://images.unsplash.com/photo-1549057446-996adf6c9e2b",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Breakfast Burrito",
    //       "description": "Scrambled eggs, crispy bacon, cheddar cheese, salsa, and avocado all wrapped up in a warm tortilla.",
    //       "price": 8.99,
    //       "quantity": 20,
    //       "image": "https://images.unsplash.com/photo-1601415656539-993d69c9f8ca",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Bagel and Lox",
    //       "description": "Toasted everything bagel with smoked salmon, cream cheese, red onion, and capers.",
    //       "price": 13.99,
    //       "quantity": 12,
    //       "image": "https://images.unsplash.com/photo-1605434119720-a752f645c927",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "French Toast",
    //       "description": "Thick slices of brioche bread soaked in custard and pan-fried until golden brown.",
    //       "price": 9.49,
    //       "quantity": 18,
    //       "image": "https://images.unsplash.com/photo-1543574841-255d4706a98f",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Avocado Toast",
    //       "description": "Sourdough toast with mashed avocado, cherry tomatoes, red pepper flakes, and a drizzle of olive oil.",
    //       "price": 7.99,
    //       "quantity": 25,
    //       "image": "https://images.unsplash.com/photo-1519696341983-83d80254d8d8",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Breakfast Sandwich",
    //       "description": "Fried egg, crispy bacon, melted cheddar cheese, and arugula on a toasted English muffin.",
    //       "price": 8.99,
    //       "quantity": 18,
    //       "image": "https://images.unsplash.com/photo-1571153047181-24773e5edd2d",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Greek Yogurt Bowl",
    //       "description": "Creamy Greek yogurt with honey, granola, fresh berries, and sliced almonds.",
    //       "price": 7.49,
    //       "quantity": 30,
    //       "image": "https://images.unsplash.com/photo-1575373577086-1a6497b96c2b",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Buttermilk Biscuits and Gravy",
    //       "description": "Flaky buttermilk biscuits smothered in country-style gravy.",
    //       "price": 10.99,
    //       "quantity": 15,
    //       "image": "https://images.unsplash.com/photo-1589774443392-651441cce08a",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Frittata",
    //       "description": "Baked egg dish with sautéed vegetables, herbs, and cheese.",
    //       "price": 11.49,
    //       "quantity": 10,
    //       "image": "https://images.unsplash.com/photo-1586952530950-4b66fa4b4e08",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Cinnamon Roll",
    //       "description": "Warm, gooey cinnamon roll with cream cheese frosting.",
    //       "price": 5.49,
    //       "quantity": 20,
    //       "image": "https://images.unsplash.com/photo-1556565001-13eab165c2aa",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Huevos Rancheros",
    //       "description": "Crispy corn tortillas topped with black beans, two fried eggs, salsa, queso fresco, and guacamole.",
    //       "price": 12.99,
    //       "quantity": 12,
    //       "image": "https://images.unsplash.com/photo-1587075012387-7cf497f15ed2",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "English Breakfast",
    //       "description": "Two fried eggs, grilled bacon, black pudding, baked beans, grilled tomato, and sliced mushrooms.",
    //       "price": 14.99,
    //       "quantity": 8,
    //       "image": "https://images.unsplash.com/photo-1597897697004-2769acbaefbe",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Quiche Lorraine",
    //       "description": "Savory egg custard with bacon, Swiss cheese, and caramelized onions in a flaky pastry crust.",
    //       "price": 10.49,
    //       "quantity": 10,
    //       "image": "https://images.unsplash.com/photo-1571161172482-95d43dd1dab7",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Baked Oatmeal",
    //       "description": "Warm, spiced oatmeal baked with apples, cinnamon, and brown sugar.",
    //       "price": 8.99,
    //       "quantity": 15,
    //       "image": "https://images.unsplash.com/photo-1597357266281-32f8af08b2ff",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Breakfast Pizza",
    //       "description": "Thin crust pizza topped with scrambled eggs, bacon, mozzarella cheese, and fresh herbs.",
    //       "price": 12.49,
    //       "quantity": 10,
    //       "image": "https://images.unsplash.com/photo-1565212365914-f926a0c4dbe2",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Scrambled Eggs",
    //       "description": "Fluffy scrambled eggs seasoned with chives and served with toast and bacon.",
    //       "price": 7.99,
    //       "quantity": 25,
    //       "image": "https://images.unsplash.com/photo-1555538656-4e6a161eb6bf",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Corned Beef Hash",
    //       "description": "Shredded corned beef with crispy diced potatoes and sautéed onions and peppers.",
    //       "price": 11.99,
    //       "quantity": 12,
    //       "image": "https://images.unsplash.com/photo-1573362441609-37e76a2f8cd8",
    //       "categoryId": id._id.toString()
    //     },
    //     {
    //       "name": "Breakfast Quesadilla",
    //       "description": "Crispy tortilla filled with scrambled eggs, sausage, roasted peppers, and Monterey Jack cheese.",
    //       "price": 9.99,
    //       "quantity": 20,
    //       "image": "https://images.unsplash.com/photo-1515546906087-3140b8eac9ec",
    //       "categoryId": id._id.toString()
    //     }
    //   ]

    //   isExist = await productModel.insertMany(myProductBreakfast);
    //   if (isExist) {
    //     print('Init Breakfast products successfully', OutputType.SUCCESS);
    //   } else {
    //     print('Init Breakfast products failed', OutputType.ERROR);
    //   }
  })
  .catch(err => {
    print('Init failed', OutputType.ERROR);
  });