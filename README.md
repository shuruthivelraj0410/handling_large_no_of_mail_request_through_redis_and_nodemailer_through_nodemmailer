To use OAuth2 authentication with nodemailer, you need to set up OAuth2 credentials through the Google Cloud Console and then use those credentials in your nodemailer configuration. Here's a step-by-step guide on how to do it:
Step 1: Set up OAuth2 Credentials

    Go to the Google Cloud Console: Visit the Google Cloud Console at https://console.cloud.google.com/.

    Create a New Project: If you haven't already created a project, click on the project dropdown menu at the top of the page and select "New Project." Follow the prompts to create a new project.

    Enable Gmail API: In the sidebar menu, navigate to "APIs & Services" > "Library." Search for "Gmail API" and enable it for your project.

    Create OAuth2 Credentials: In the sidebar menu, navigate to "APIs & Services" > "Credentials." Click on "Create credentials" and select "OAuth client ID." Choose "Web application" as the application type.

    Configure OAuth Consent Screen: If you haven't set up the OAuth consent screen before, you'll need to configure it. Provide a name for your application and specify the user support email. You can skip filling in other fields if they're not required for your use case.

    Set Authorized Redirect URIs: In the OAuth consent screen settings, under "Authorized Redirect URIs," add the redirect URI where Google will send the user after they grant access. For nodemailer, you can use https://developers.google.com/oauthplayground.

    Save OAuth2 Client ID and Client Secret: After creating the OAuth client ID, Google will provide you with a client ID and client secret. Note down these values as you'll need them in the next step.

Step 2: Configure nodemailer with OAuth2

Now that you have your OAuth2 credentials, you can configure nodemailer to use OAuth2 authentication.

javascript

import nodemailer from 'nodemailer';
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
const transporter = nodemailer.createTransport({
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

// Email options
const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'recipient@example.com',
    subject: 'Test Email',
    text: 'Hello from nodemailer!'
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.messageId);
    }
});

In this example:

    Replace 'your_client_id', 'your_client_secret', and 'your_refresh_token' with the corresponding values you obtained from the Google Cloud Console.
    Ensure that 'https://developers.google.com/oauthplayground' is added as an authorized redirect URI in your Google Cloud Console project.
    The getOAuthAccessToken function retrieves an OAuth2 access token using the refresh token. You'll need to replace 'your_refresh_token' with your actual refresh token.
    The transporter object is configured to use OAuth2 authentication with nodemailer.





To obtain a refresh token for your Gmail account to use with OAuth2 authentication, you can follow these steps:

    Visit the OAuth Playground: Go to the OAuth 2.0 Playground.

    Select Gmail API: Click on the gear icon in the top right corner and make sure "Use your own OAuth credentials" is selected. Then, in the "OAuth flow" dropdown, select "OAuth 2.0".

    Authorize Gmail API: In the left panel, scroll down and find "Gmail API v1". Click on it to expand, then select the scope "https://mail.google.com/". Click the "Authorize APIs" button to begin the authorization process.

    Authenticate and Authorize: You'll be prompted to sign in to your Google account and then authorize the Gmail API access. Follow the prompts to grant permission.

    Exchange Authorization Code for Tokens: After authorization, you'll see an "Exchange authorization code for tokens" button. Click it to exchange the authorization code for tokens.

    Get Refresh Token: In the response, you'll see your access token, refresh token, and other information. Copy the refresh token and keep it secure. This refresh token can be used to obtain new access tokens when needed.

    Use Refresh Token with nodemailer: Once you have your refresh token, you can use it in your nodemailer configuration for OAuth2 authentication.

Here's how you can use the refresh token in your nodemailer configuration:

javascript

import nodemailer from 'nodemailer';
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

// Refresh token obtained from the OAuth2 Playground or from a previous authentication
const REFRESH_TOKEN = 'your_refresh_token';

// Set refresh token
oAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

// Generate an OAuth2 access token
const getOAuthAccessToken = async () => {
    const { token } = await oAuth2Client.getAccessToken();
    return token;
};

// Create transporter with OAuth2
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'your_email@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: await getOAuthAccessToken()
    }
});

// Email options
const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'recipient@example.com',
    subject: 'Test Email',
    text: 'Hello from nodemailer!'
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.messageId);
    }
});

Replace 'your_client_id', 'your_client_secret', and 'your_refresh_token' with your actual OAuth2 credentials obtained from the OAuth Playground. This code will authenticate and send an email using nodemailer with OAuth2 authentication using your refresh token.


    Visit the OAuth Playground: Go to the OAuth 2.0 Playground.

    Select Gmail API: Click on the gear icon in the top right corner and make sure "Use your own OAuth credentials" is selected. Then, in the "OAuth flow" dropdown, select "OAuth 2.0".

    Authorize Gmail API: In the left panel, scroll down and find "Gmail API v1". Click on it to expand, then select the scope "https://mail.google.com/". Click the "Authorize APIs" button to begin the authorization process.

    Authenticate and Authorize: You'll be prompted to sign in to your Google account and then authorize the Gmail API access. Follow the prompts to grant permission.

    Exchange Authorization Code for Tokens: After authorization, you'll see an "Exchange authorization code for tokens" button. Click it to exchange the authorization code for tokens.

    Get Refresh Token: In the response, you'll see your access token, refresh token, and other information. Copy the refresh token and keep it secure. This refresh token can be used to obtain new access tokens when needed.

    Use Refresh Token with nodemailer: Once you have your refresh token, you can use it in your nodemailer configuration for OAuth2 authentication.

Here's how you can use the refresh token in your nodemailer configuration:

javascript

import nodemailer from 'nodemailer';
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

// Refresh token obtained from the OAuth2 Playground or from a previous authentication
const REFRESH_TOKEN = 'your_refresh_token';

// Set refresh token
oAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

// Generate an OAuth2 access token
const getOAuthAccessToken = async () => {
    const { token } = await oAuth2Client.getAccessToken();
    return token;
};

// Create transporter with OAuth2
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'your_email@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: await getOAuthAccessToken()
    }
});

// Email options
const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'recipient@example.com',
    subject: 'Test Email',
    text: 'Hello from nodemailer!'
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.messageId);
    }
});

Replace 'your_client_id', 'your_client_secret', and 'your_refresh_token' with your actual OAuth2 credentials obtained from the OAuth Playground. This code will authenticate and send an email using nodemailer with OAuth2 authentication using your refresh token.
