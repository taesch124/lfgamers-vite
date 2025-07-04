import { UserLoginReqDTO, UserLoginResDTO } from '@lfgamers/shared-types';
import {
    Box,
    Button,
    Card,
    Center,
    Container,
    InputError,
    LoadingOverlay,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import appClient from '@api/apiClient';
import sessionAtom from '@atoms/sessionAtom';

type LoginInputs = UserLoginReqDTO;

function LoginPage() {
    const navigate = useNavigate();
    const [ , setSession ] = useAtom(sessionAtom);
    const {
        control,
        setError,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<LoginInputs>();

    const mutation = useMutation<UserLoginResDTO, Error, UserLoginReqDTO>({
        mutationFn: async (data) => {
            const response = await appClient.request<
                UserLoginReqDTO,
                AxiosResponse<UserLoginResDTO>,
                UserLoginReqDTO
            >({
                method: 'POST',
                url: '/auth/login',
                data,
            });

            return response.data;
        },
    });

    const onSubmit: SubmitHandler<LoginInputs> = async (data: LoginInputs) => {
        try {
            const response = await mutation.mutateAsync(data);
            if (response.error) {
                setError('password', { message: response.error ?? 'Login failed' });
                return;
            }
            setSession({ authenticated: true });
            navigate('/games');
        } catch (error) {
            console.error(error);
            setError('password', { message: 'Login failed' });
        }
    };
    return (
        <Container>
            <Title>
                Welcome to LFGamers!
            </Title>
            <Center>
                <Text
                    c='dimmed'
                    size='small'
                    mt={5}
                >
                    Do not have an account yet?{' '}
                    <Link to='/register'>
                        Create account
                    </Link>
                </Text>
            </Center>
            <Card
                p={30}
                mt={30}
                withBorder
                shadow="sm"
                padding="lg"
                radius="md"
                style={{ marginBottom: '1rem' }}
            >
                <Box pos='relative'>
                    <LoadingOverlay visible={isSubmitting} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name='username'
                            control={control}
                            render={({ field }) => (
                                <>
                                    <TextInput
                                        label='Username'
                                        placeholder='Your username'
                                        required
                                        {...field}
                                    />
                                    {errors?.username?.message && (
                                        <InputError>
                                            {errors.username.message}
                                        </InputError>
                                    )}
                                </>
                            )}
                            rules={{
                                required: {
                                    message: 'Username is required',
                                    value: true,
                                },
                                minLength: {
                                    message: 'Username must be at least 6 characters',
                                    value: 6,
                                },
                            }}
                        />
                        <Controller
                            name='password'
                            control={control}
                            render={({ field }) => (
                                <>
                                    <PasswordInput
                                        label='Password'
                                        placeholder='Your password'
                                        required
                                        {...field}
                                    />
                                    {errors?.password?.message && (
                                        <InputError>
                                            {errors.password.message}
                                        </InputError>
                                    )}
                                </>
                            )}
                            rules={{
                                required: {
                                    message: 'Password is required',
                                    value: true,
                                },
                                minLength: {
                                    message: 'Password must be at least 6 characters',
                                    value: 6,
                                },
                            }}
                        />
                        <Center>
                            <Button mt={20} type='submit'>
                                Login
                            </Button>
                        </Center>
                    </form>
                </Box>
            </Card>
        </Container>
    );
}

export default LoginPage;