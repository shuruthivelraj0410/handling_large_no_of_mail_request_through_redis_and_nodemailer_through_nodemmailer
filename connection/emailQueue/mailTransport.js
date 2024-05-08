import { createTransport } from "nodemailer";
import { google } from 'googleapis';



// OAuth2 credentials
const CLIENT_ID = 'your_client_id';
const CLIENT_SECRET = 'your_client_secret';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

// Create OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

// Generate an OAuth2 token using your refresh token
const getOAuthAccessToken = async () => {
    // Refresh token obtained from the OAuth2 Playground or from a previous authentication
    const REFRESH_TOKEN = 'your_refresh_token';

    // Set refresh token
    oAuth2Client.setCredentials({
        refresh_token: REFRESH_TOKEN
    });

    // Generate an OAuth2 access token
    const { token } = await oAuth2Client.getAccessToken();
    return token;
};

// Create transporter with OAuth2
const transport = createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'your_email@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: 'your_refresh_token',
        accessToken: await getOAuthAccessToken()
    }
});
export{
    transport
}