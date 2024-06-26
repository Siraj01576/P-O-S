const { User } = require("../../DB");

async function CreateUser(req, res) {

    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        

        res.status(201).json({ message: "User created successfully", user: {
            user: {
                name,
                email
            },
            totalSalesCount:0,
            totalSalesAmount:0
        } });
    } catch (error) {
        console.error("Error in CreateUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = CreateUser;
