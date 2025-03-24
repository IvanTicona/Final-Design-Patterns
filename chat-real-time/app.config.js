import 'dotenv/config';

export default {
  expo: {
    name: "chat-real-time",
    slug: "chat-real-time",
    version: "1.0.0",
    scheme: "myapp",
    newArchEnabled: true,
    extra: {
      SERVER: process.env.SERVER,
      API_AUTH: process.env.API_AUTH,
      API_CONVERSATION: process.env.API_CONVERSATION,
    },
  },
};
