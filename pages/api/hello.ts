import mailgun from 'mailgun.js';
import formData from 'form-data';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';

type RequestBody = {
    name: string;
    email: string;
    subject: string;
    message: string;
    token: string;
    requestId: string;
};

interface MailgunError extends Error {
    status: number;
    details: string;
}

interface ApiResponse {
    status: number;
    message: string;
}

type FingerprintDetectStatus = 'processed' | 'notEnoughData' | 'error';

interface FingerprintDetectNote {
    status: FingerprintDetectStatus;
    probability: number;
    type?: string;
}

interface FingerprintResponseSuccess {
    bot: {
        automationTool: FingerprintDetectNote;
        browserSpoofing: FingerprintDetectNote;
        searchEngine: FingerprintDetectNote;
    };
    vm: FingerprintDetectNote;
    requestId: string;
    ip: string;
    verifyCounter: number;
}

const FINGERPRINT_SECRET_KEY = process.env.FINGERPRINT_SECRET_KEY || '';
const FINGERPRINT_API_URL = process.env.FINGERPRINT_API_URL || 'https://botd.fpapi.io/api/v1/verify';
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || '';
const MAILGUN_USERNAME = process.env.MAILGUN_USERNAME || '';
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || '';
const MAILGUN_TO = process.env.MAILGUN_TO || '';

function isBot(data: FingerprintResponseSuccess) {
    if ('processed' !== data?.vm?.status || data?.vm?.probability > 0.25) {
        return true;
    }

    const bots = ['automationTool', 'browserSpoofing', 'searchEngine'].filter((bot) => {
        if ('development' === process.env.NODE_ENV && 'browserSpoofing' === bot) {
            return false;
        }

        return true;
    });

    const isBot = bots.find((bot: keyof FingerprintResponseSuccess['bot']) => {
        if ('processed' !== data?.bot?.[bot]?.status || data?.bot?.[bot]?.probability > 0.25) {
            return true;
        }

        return false;
    });

    if (isBot) {
        return true;
    }

    return false;
}

async function sendMail({ name, email, subject, message }: Omit<RequestBody, 'token' | 'requestId'>) {
    const mailgunData = {
        from: `${name} <${email}>`,
        to: MAILGUN_TO,
        subject,
        text: message,
    };

    const mailgunClient = new mailgun(formData).client({
        username: MAILGUN_USERNAME,
        key: MAILGUN_API_KEY,
    });

    const response = await mailgunClient.messages.create(MAILGUN_DOMAIN, mailgunData);

    return response;
}

export default function helloApiHandler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
    const { name, email, subject, message, requestId }: RequestBody = req.body;

    axios
        .post(FINGERPRINT_API_URL, {
            requestId,
            secretKey: FINGERPRINT_SECRET_KEY,
        })
        .then(({ data }: AxiosResponse<FingerprintResponseSuccess>) => {
            if (isBot(data)) {
                res.status(400).send({
                    status: 400,
                    message: 'Invalid form submission!',
                });
            } else {
                sendMail({ name, email, subject, message })
                    .then((result) => {
                        res.status(result.status).send({
                            status: result.status,
                            message: result.message,
                        });
                    })
                    .catch((result: MailgunError) => {
                        res.status(result.status).send({
                            status: result.status,
                            message: result.message,
                        });
                    });
            }
        })
        .catch((error) => {
            res.status(400).send({
                status: 400,
                message: error.toString(),
            });
        });
}
