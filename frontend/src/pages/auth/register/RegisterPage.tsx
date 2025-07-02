import { UserRegisterReqDTO, UserRegisterResDTO } from '@lfgamers/shared-types';
import {
    Button,
    Card,
    Container,
    InputError,
    PasswordInput,
    Title,
    Text,
    TextInput,
    Center,
    Box,
    LoadingOverlay,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AxiosResponse } from 'axios';
import appClient from '../../../api/apiClient';

type RegisterInputs = UserRegisterReqDTO;

function RegisterPage() {
    const navigate = useNavigate();
    const {
        control,
        setError,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<RegisterInputs>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const mutation = useMutation<UserRegisterResDTO, Error, UserRegisterReqDTO>({
        mutationFn: async (data) => {
            const response = await appClient.request<
                UserRegisterReqDTO,
                AxiosResponse<UserRegisterResDTO>,
                UserRegisterReqDTO
            >({
                method: 'POST',
                url: '/auth/register',
                data,
            });

            return response.data;
        },
    });

    const onSubmit: SubmitHandler<RegisterInputs> = async (data: UserRegisterReqDTO) => {
        try {
            const response = await mutation.mutateAsync(data);
            if (response.error) {
                setError('password', { message: response.error ?? 'Register failed' });
                return;
            }

            navigate('/login');
        } catch (error) {
            console.error(error);
            setError('password', { message: 'Register failed' });
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
                    Already have an account?{' '}
                    <Link to='/login'>
                        Login
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
                            name='email'
                            control={control}
                            render={({ field }) => (
                                <>
                                    <TextInput
                                        label='Email'
                                        placeholder='Your email'
                                        required
                                        {...field}
                                    />
                                    {errors?.email?.message && (
                                        <InputError>
                                            {errors.email.message}
                                        </InputError>
                                    )}
                                </>
                            )}
                            rules={{
                                required: {
                                    message: 'Email is required',
                                    value: true,
                                },
                                minLength: {
                                    message: 'Email must be at least 6 characters',
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
                                Create Account
                            </Button>
                        </Center>
                    </form>
                </Box>
            </Card>
        </Container>
    );
}

export default RegisterPage;