const bcrypt = require("bcryptjs")
const Admin = require("../models/Admin");
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser((id, done) => {
    Admin.findById(id, (err, user) => {
        done(err, user);
    });
});
passport.use(
  'local',
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        Admin.findOne({ email: email })
            .then(user => {
                if(!user) {
                    return done(null, false, { message: "Email or Password is incorrect" })
                } else {
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Email or Password is incorrect" });
                        }
                    })
                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            })
    })
);
module.exports = passport;