import passport from 'passport';
const KakaoStrategy = require('passport-kakao').Strategy;

//const passportConfig = () => {
    passport.use('kakao', new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: process.env.KAKAO_URL,
}, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(profile);
}
)
)
//};

//export { passportConfig };
module.exports = passport;