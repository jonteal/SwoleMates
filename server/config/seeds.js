const db = require("./connection");
const { User, Product, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([{ name: "Workout" }]);

  console.log("categories seeded, for now...");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Alternating Medicine Ball Push Up",
      description:
        "Team will perform ten total alternating medicine ball push up's per order.",
      image: "pushupball.gif",
      category: categories[0]._id,
      price: 100.0,
      quantity: 500,
    },
    {
      name: "Tricep Dips",
      description: "Team will perform twenty total tricep drips per order.",
      image: "tricepdip.gif",
      category: categories[0]._id,
      price: 100.0,
      quantity: 500,
    },
    {
      name: "Deadlift Upright Row",
      category: categories[0]._id,
      description:
        "Team will perform ten total deadlift upright rows per order.",
      image: "row.gif",
      price: 200.0,
      quantity: 300,
    },
    {
      name: "Squat Thrust",
      category: categories[0]._id,
      description:
      "Team will perform fifteen total squat thrusts per order.",
      image: "squatthrust.gif",
      price: 300.00,
      quantity: 450,
    },
  ]);

  console.log("products seeded, now go sponsor us");

  await User.deleteMany();

  console.log("users deleted, adios suckers");

  process.exit();
});
