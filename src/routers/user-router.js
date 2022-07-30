import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { userService } from '../services';
import { APIGateway, ApiGatewayManagementApi } from 'aws-sdk';
const jwt = require('jsonwebtoken');
const userRouter = Router();

userRouter.get('/userInfo', loginRequired, async function (req, res, next) {
    try {
        const user = await userService.getUser(req.currentUserId);
        if (!user) {
            throw new Error('없는 회원입니다.');
        }
        res.json({ name: user.fullName, email: user.email });
    } catch (err) {
        next(err);
    }
});

//isAdmin, role이 어드민인지 아닌지 판별 후 true, false 반환
userRouter.get('/isAdmin', loginRequired, async function (req, res, next) {
    try {
        const user = await userService.getUser(req.currentUserId);
        if (!user) {
            throw new Error('없는 회원입니다.');
        }
        if (user.role === 'admin') {
            res.json({ isAdmin: true });
        } else {
            res.json({ isAdmin: false });
        }
    } catch (err) {
        next(err);
    }
});
// 회원가입 api (아래는 /register이지만, 실제로는 /users/register로 요청해야 함.)
userRouter.post('/register', async (req, res, next) => {
    try {
        // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }

        // req (request)의 body 에서 데이터 가져오기
        const {
            fullName,
            email,
            password,
            address,
            phoneNumber,
            gender,
            role,
        } = req.body;

        // 위 데이터를 유저 db에 추가하기
        const newUser = await userService.addUser({
            fullName,
            password,
            email,
            ...(address && { address }),
            ...(phoneNumber && { phoneNumber }),
            ...(role && { role }),
            ...(gender && { gender }),
        });

        // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
        // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

// 로그인 api (아래는 /login 이지만, 실제로는 /users/login로 요청해야 함.)
userRouter.post('/login', async function (req, res, next) {
    try {
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }

        // req (request) 에서 데이터 가져오기
        const { email, password } = req.body;

        // 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내 줌)
        const userToken = await userService.getUserToken({ email, password });
        //user가져와서
        //user role 판별하고
        //만료 시간을 임의로 정해줌 24시간 * 3일
        const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 3);

        //httponly 옵션을 넣어 보안을 강화한 쿠키 사용 -> web한정
        // jwt 토큰을 프론트에 보냄 (jwt 토큰은, 문자열임)
        res.cookie('token', userToken, {
            expires: expiryDate,
            httpOnly: true,
            signed: true,
        })
            .cookie('login', 'true')
            .status(200)
            .json(userToken);
    } catch (error) {
        next(error);
    }
});

//로그아웃 api (아래는 /logout 이지만, 실제로는 /users/logout으로 요청해야 함.)
//쿠키에 있는 jwt 토큰이 들어 있는 쿠키를 비워줌
userRouter.get('/logout', async function (req, res, next) {
    //쿠키에 있는 jwt 토큰이 들어 있는 쿠키를 비워줌
    try {
        res.clearCookie('token').clearCookie('login').redirect('/');
    } catch (error) {
        next(error);
    }
});

// 사용자 정보 수정
// (예를 들어 /users/edit/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
userRouter.patch('/edit', loginRequired, async function (req, res, next) {
    try {
        // content-type 을 application/json 로 프론트에서
        // 설정 안 하고 요청하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }

        // params로부터 id를 가져옴
        const userId = req.currentUserId;

        // body data 로부터 업데이트할 사용자 정보를 추출함.
        const { password, email } = req.body;

        // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
        const currentPassword = req.body.currentPassword;

        // currentPassword 없을 시, 진행 불가
        if (!currentPassword) {
            throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
        }

        const userInfoRequired = { userId, currentPassword, email };

        // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
        // 보내주었다면, 업데이트용 객체에 삽입함.
        const toUpdate = {
            ...(email && { email }),
            ...(password && { password }),
        };

        // 사용자 정보를 업데이트함.
        const updatedUserInfo = await userService.setUser(
            userInfoRequired,
            toUpdate
        );

        // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
        res.status(200).json(updatedUserInfo);
    } catch (error) {
        next(error);
    }
});

//회원 탈퇴
userRouter.delete(
    '/unregister',
    loginRequired,
    async function (req, res, next) {
        try {
            const userId = req.currentUserId;

            // // 사용자 정보를 삭제함
            const deletedUser = await userService.deleteUser(userId);

            if (!deletedUser) {
                throw new Error('삭제가 실패하였습니다.');
            }
            res.clearCookie('token').clearCookie('login').status(200).json({
                success: true,
                data: '성공적으로 탈퇴되었습니다.',
            });
        } catch (error) {
            next(error);
        }
    }
);

export { userRouter };
