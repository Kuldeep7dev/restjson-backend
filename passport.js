const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { default: Admin } = require('./Model/admin');

passport.use(
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
            try {
                console.log('📩 Email:', email);
                console.log('Password', password);

                const user = await Admin.findOne({ email })
                console.log(user);

                if (!user) {
                    console.warn('❌ User not found');
                    return done(null, false, { message: 'User not found' });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    console.warn('❌ Wrong password');
                    return done(null, false, { message: 'Wrong password' });
                }

                console.log('✅ Password matched');
                return done(null, user);
            } catch (err) {
                console.error('🔥 Strategy error:', err);
                return done(err);
            }
        }
    )
);



// SERIALIZE USER
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// DESERIALIZE USER
passport.deserializeUser(async (id, done) => {
    try {
        const user = await Admin.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});



module.exports = passport;