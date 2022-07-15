import React, { useState, useEffect, ChangeEvent, FocusEvent, FormEvent, useRef } from 'react';
import type { NextPage } from 'next';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import botDetectionAgent from '@fpjs-incubator/botd-agent';
import axios, { AxiosResponse } from 'axios';

import Layout from '../src/components/Layout';
import Content from '../src/components/Content';

interface ResponseData {
    status: number;
    message: string;
}

const FINGERPRINT_PUBLIC_KEY = process.env.NEXT_PUBLIC_FINGERPRINT_PUBLIC_KEY || '';

const formEndpoint = '/api/hello';

const fieldsObject = {
    name: {
        type: 'text',
        label: 'Your Name',
        required: true,
    },
    email: {
        type: 'email',
        label: 'Your Email Address',
        required: true,
    },
    subject: {
        type: 'text',
        label: 'Email Subject',
        required: true,
    },
    message: {
        name: 'message',
        type: 'textarea',
        label: 'Email Message',
        required: true,
        minRows: 5,
        fullWidth: true,
        multiline: true,
    },
};

const getFields = () => {
    const fields = [] as TextFieldProps[];

    for (const [fieldKey, field] of Object.entries(fieldsObject)) {
        fields.push({
            ...field,
            name: fieldKey,
        });
    }

    return fields;
};

function isValidEmail(email: string) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
    );
}

const ContactMePage: NextPage = () => {
    const [requestId, setRequestId] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<keyof typeof fieldsObject, string>>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [alertText, setAlertText] = useState<string>('');
    const [alertSeverity, setAlertSeverity] = useState<AlertProps['severity']>('success');
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>();
    const mountedRef = useRef<boolean>();
    const onChangeDelayRef = useRef<ReturnType<typeof setTimeout>>();

    const openAlert = (text: string, severity: AlertProps['severity'] = 'success') => {
        setAlertText(text);
        setAlertSeverity(severity);
        setAlertOpen(true);
    };

    const closeAlert = () => {
        setAlertOpen(false);
    };

    const setFieldError = (fieldName: string, errorMessage: string) => {
        setFieldErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));

        return errorMessage;
    };

    const getFieldError = (fieldName: string, fieldValue: string) => {
        const field = getFields().find((field) => field.name === fieldName);

        if (field.required) {
            if ('' === fieldValue) {
                return 'Required';
            }

            if ('' === fieldValue.replace(/ /g, '')) {
                return 'Invalid entry';
            }
        }

        if ('email' === field.type && !isValidEmail(fieldValue)) {
            return 'Invalid entry';
        }

        return null;
    };

    const handleBlurField = (event: FocusEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const fieldError = getFieldError(name, value);

        setFieldError(name, fieldError);
    };

    const handleChangeField = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChangeDelayRef.current) {
            clearTimeout(onChangeDelayRef.current);
        }

        onChangeDelayRef.current = setTimeout(() => {
            const { name, value } = event.target;
            const fieldError = getFieldError(name, value);

            setFieldError(name, fieldError);
        }, 500);
    };

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const target = event.target as typeof event.target & Record<keyof typeof fieldsObject, { value: string }>;

        const errors = getFields().filter((field) => {
            return !!setFieldError(field.name, getFieldError(field.name, target?.[field.name]?.value));
        });

        if (errors.length) {
            return;
        }

        const data = { requestId } as Record<keyof typeof fieldsObject, string> & {
            requestId: string;
        };

        for (const fieldKey in fieldsObject) {
            data[fieldKey] = target?.[fieldKey]?.value;
        }

        axios.interceptors.request.use((config) => {
            setLoading(true);

            return config;
        });

        axios
            .post(formEndpoint, data)
            .then(({ data }: AxiosResponse<ResponseData>) => {
                openAlert(data.message, 'success');

                if (formRef.current) {
                    formRef.current?.reset();
                }
            })
            .catch((error) => {
                openAlert(error.toString(), 'error');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        mountedRef.current = true;

        const botDetectionPromise = botDetectionAgent.load({ publicKey: FINGERPRINT_PUBLIC_KEY });

        (async () => {
            const botd = await botDetectionPromise;
            const result = (await botd.detect()) as { requestId: string };

            if (result?.requestId && mountedRef.current) {
                setRequestId(result.requestId);
            }
        })();

        return () => {
            mountedRef.current = false;

            if (onChangeDelayRef.current) {
                clearTimeout(onChangeDelayRef.current);
            }
        };
    }, []);

    return (
        <Layout contentHeight={600}>
            <Content title="Contact Me">
                <Box sx={{ flexGrow: 1 }}>
                    <Snackbar
                        open={alertOpen}
                        autoHideDuration={6000}
                        onClose={closeAlert}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Alert onClose={closeAlert} severity={alertSeverity} sx={{ width: '100%' }}>
                            {alertText}
                        </Alert>
                    </Snackbar>
                    <form action={formEndpoint} method="POST" onSubmit={handleFormSubmit} ref={formRef} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    component="p"
                                    sx={{
                                        marginBottom: 2,
                                    }}
                                >
                                    For any queries please fill out the form below with your contact information and the
                                    related message.
                                </Typography>
                                <Stack spacing={2}>
                                    {getFields().map((field) => {
                                        const fieldError = fieldErrors?.[field.name];
                                        return (
                                            <TextField
                                                {...field}
                                                key={field.name}
                                                error={!!fieldError}
                                                helperText={fieldError}
                                                autoComplete="off"
                                                size="small"
                                                onBlur={handleBlurField}
                                                onChange={handleChangeField}
                                                InputProps={{
                                                    readOnly: field?.InputProps?.readOnly ?? loading,
                                                }}
                                            />
                                        );
                                    })}
                                    <Box sx={{ m: 1, position: 'relative' }}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            type="submit"
                                            disabled={loading}
                                            fullWidth
                                        >
                                            Send Message
                                        </Button>
                                        {loading && (
                                            <CircularProgress
                                                size={24}
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    marginTop: '-12px',
                                                    marginLeft: '-12px',
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Content>
        </Layout>
    );
};

export default ContactMePage;
