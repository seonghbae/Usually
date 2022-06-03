import { model } from 'mongoose';

import { KakaoSchema } from '../db/schemas/kakao-schema';
const Kakao = model('kakaos', KakaoSchema);

import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';

const config = {
  clientID: process.env.KAKAO_ID,
  clientSecret: process.env.KAKAO_SECRET,
  callbackURL: process.env.KAKAO_URL,
};

async function findOrCreateUser({ email, name }) {
  const user = await Kakao.find( { email : email } );
  // 해당 email을 가진 유저가 있는지 검사
  // 있을 경우 해당 유저를 반환
  if (user) {
    return user;
  }
  // 없을 경우 생성
  const created = await Kakao.create({
    email: email,
    fullName: name,
  });
  return created;
}

// module.exports = new KakaoStrategy(
//   config,
//   async (accessToken, refreshToken, profile, done) => {
//     const { email, name } = profile;
//     try {
//       const user = await findOrCreateUser({ email, name });
//       const filter = { email : email };
//       const option = { returnOriginal : false };
//       const update = { refreshToken: refreshToken };

//       const token = await Kakao.updateOne(filter, update, option);
//       done(null, token);
//     } catch (error) {
//       console.log(error);
//       done(error);
//     }
//   }
// );

module.exports = () => {
    passport.use(
       new KakaoStrategy(
          {
             clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
             callbackURL: '/auth/kakao/callback', // 카카오 로그인 Redirect URI 경로
             clientSecret: process.env.KAKAO_SECRET,
          },
          /*
           * clientID에 카카오 앱 아이디 추가
           * callbackURL: 카카오 로그인 후 카카오가 결과를 전송해줄 URL
           * accessToken, refreshToken: 로그인 성공 후 카카오가 보내준 토큰
           * profile: 카카오가 보내준 유저 정보. profile의 정보를 바탕으로 회원가입
           */
          async (accessToken, refreshToken, profile, done) => {
             console.log('kakao profile', profile);
             try {
                const exUser = await Kakao.find(
                   // 카카오 플랫폼에서 로그인 했고 & snsId필드에 카카오 아이디가 일치할경우
                   { email : profile._json && profile._json.kakao_account_email },
                );
                // 이미 가입된 카카오 프로필이면 성공
                if (exUser) {
                   done(null, exUser); // 로그인 인증 완료
                } else {
                   // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                   const newUser = await User.create({
                      email: profile._json && profile._json.kakao_account_email,
                      fullName : profile.displayName,
                     refreshToken : refreshToken,
                   });
                   done(null, newUser); // 회원가입하고 로그인 인증 완료
                }
             } catch (error) {
                console.error(error);
                done(error);
             }
          },
       ),
    );
 };