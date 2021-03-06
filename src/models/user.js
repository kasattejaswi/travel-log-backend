const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        first: {
            type: String,
            required: true,
        },
        last: {
            type: String,
            required: true,
        },
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    followers: [
        {
            username: {
                type: String,
                required: true,
            },
        },
    ],
    following: [
        {
            username: {
                type: String,
                required: true,
            },
        },
    ],
    posts: [
        {
            id: {
                type: String,
                required: true,
            },
        },
    ],
    profilePicture: {
        type: Buffer,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isEmailVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    emailVerificationToken: {
        token: {
            type: String,
            // required: true,
        },
        expiresIn: {
            type: Date,
            // required: true,
        },
    },
    createdOn: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.profilePicture;
    delete userObject.__v
    return userObject;
};

userSchema.statics.findByCredentials = async (username, email, password) => {
    let user;
    if (username) {
        user = await User.findOne({ userName: username });
    } else if (email) {
        user = await User.findOne({ email });
    }
    if (!user) {
        throw new Error("Username or password is incorrect");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Username or password is incorrect");
    }
    return user;
};

userSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "thisismydamnsecret", {
        expiresIn: "12h",
    });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.post("save", (err, doc, next) => {
    if (err.code === 11000 && err.name === "MongoError") {
        throw new Error("Username must be unique");
    } else {
        next();
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
