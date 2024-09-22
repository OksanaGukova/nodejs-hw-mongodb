import { THIRTY_DAYS } from "../constans/index.js";
import { loginUser, logoutUser, refreshUsersSession, registerUser, requestResetToken } from "../services/auth.js";

export const registerUserController = async (req, res) => {
    const user = await registerUser(req.body);
    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user,
      });
};

export const loginUserController = async (req, res) => {
await loginUser(req.body);
const session = await loginUser(req.body);
res.cookie('refreshToken', session.refreshToken, {
  httpOnly: true,
  expires: new Date(Date.now() + THIRTY_DAYS),
});
res.cookie('sessionId', session._id, {
  httpOnly: true,
  expires: new Date(Date.now() + THIRTY_DAYS),
});
res.json({
  status: 200,
  message: 'Successfully logged in an user!',
  data: {
    accessToken: session.accessToken,
  },
});
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
expires: new Date(Date.now() + THIRTY_DAYS)
});
res.cookie('sessionId', session._id, {
  httpOnly: true,
  expires: new Date(Date.now() + THIRTY_DAYS)
});
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};



export const logoutUserController = async (req, res) => {

  if (req.cookies && req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};


export const requestResetEmailController  = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email has been successfully sent.',
    status: 200,
    data: {},
  });
};
