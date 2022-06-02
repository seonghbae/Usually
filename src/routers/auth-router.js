import { Router } from 'express'
import { model } from 'mongoose';
import { KakaoSchema } from '../db/schemas/kakao-schema';

const Kakao = model('kakaos', KakaoSchema);

const authRouter = Router();

authRouter.get('/kakao', async (req, res) => {
    let token, user;
    try {
        token = await fetch({
            method: 'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                grant_type: 'authorization_code',
                client_id: process.env.KAKAO_ID,
                client_secret: process.env.KAKAO_SECRET,
                redirectUri: process.env.KAKAO_URL,
                code: req.query.code,
            }),
        });
    } catch (err) {
        res.json(err.data);
    }
    try {
        user = await axios({
            method: 'GET',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                Authorization: `Bearer ${token.data.access_token}`,
            },
        });
    } catch (err) {
        res.json(err.data);
    }

    users
        .findOne({ id_token: user.data.id })
        .exec()
        .then((data) => {
            if (data) {
                console.log(data);
                
            } else {
                console.log(
                    `해당 유저는 없습니다.${user.data.id}님에 대한 유저 생성 시작`
                );
                let atc = new users({
                    id_token: user.data.id,
                    nickname: user.data.properties.nickname,
                    email: user.data.kakao_account.email,
                    refresh_token: token.data.refresh_token,
                });
                atc.save().then((newUser) => {
                    console.log('create 완료!');
                });
            }
        });

    const jwttoken = jwt.sign(
        {
            id_token: user.data.id,
            nickname: user.data.properties.nickname,
            profile_image: user.data.properties.profile_image,
            thumbnail_image: user.data.properties.thumbnail_image,
            email: user.data.kakao_account.email,
        },
        process.env.JWT_SECRET,
        {
            issuer: 'snail',
            expiresIn: '120m',
        }
    );
    res.cookie('user', jwttoken);
    res.redirect('http://localhost:3000');
},);

authRouter.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/users/login',
}), (req, res) => {
  res.redirect('/');
});

export { authRouter };