'use client'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'


import DottedSeparatort from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const formSchema = z.object({
    name: z.string().trim().min(1, "이름을 입력해주세요."),
    email: z.string().trim().min(1, "이메일을 입력해주세요").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "유효한 이메일 형식이 아닙니다"),
    password: z.string().min(8, "비밀번호는 최소 8자리 이상적어주세요")
})


const SignUpCard = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name:"",
            email:"",
            password:""
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>)=>{
        console.log(values);        
    }

 
    return ( 
        <Card className='w-full h-full md:w-[487px] border-none shadow-none'>
            <CardHeader className='flex items-center justify-center text-center p-7'>
                <CardTitle className='text-2xl'>
                    Sign Up
                </CardTitle>
                <CardDescription>
                    By signing up, you agree to our{" "}
                    <Link href="/privacy">
                        <span className='text-blue-700'>Privacy Policy</span>
                    </Link>{" "}
                    add{" "}
                    <Link href="/privacy">
                        <span className='text-blue-700'>Terms of Service</span>
                    </Link>
                </CardDescription>
            </CardHeader>
            <div className='px-7'>
                <DottedSeparatort/>
            </div>
            <CardContent className='p-7'>                
                {/* <form className='space-y-4 flex flex-col'>
                    <Input
                        required
                        type='text'
                        value={""}
                        onChange={()=>{}}
                        placeholder='Enter your name'
                        disabled={false}
                    />
                    <Input
                        required
                        type='email'
                        value={""}
                        onChange={()=>{}}
                        placeholder='Enter email address'
                        disabled={false}
                    />
                    <Input
                        required
                        type='password'
                        value={""}
                        onChange={()=>{}}
                        placeholder='Enter password'
                        disabled={false}
                        min={8}
                        max={256}
                    />
                    <Button disabled={false} size="lg" className='w-full'>
                        Login
                    </Button>
                </form> */}
                <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name='name'
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder="Enter your name"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="email"
                                    placeholder="Enter email address"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="password"
                                    placeholder="Enter password"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />    
            </form>
        </Form>

            </CardContent>
            <div className='px-7'>
                <DottedSeparatort/>
            </div>
            <CardContent className='p-7 flex flex-col gap-y-4'>
                <Button 
                    disabled={false}
                    variant={'secondary'}
                    size={'lg'}
                    className='w-full'
                >
                    {/* <FcGoogle className="mr-2 size-5"/> */}
                    Login width Google
                </Button>
                <Button 
                    disabled={false}
                    variant={'secondary'}
                    size={'lg'}
                    className='w-full'
                >
                    {/* <FaGithub className="mr-2 size-5"/> */}
                    Login width Github
                </Button>
            </CardContent>
            <div className='px-7'>
                <DottedSeparatort/>
            </div>
            <CardContent className='p-7 items-center justify-center'>
                <p>사용 계정이 있으세요 ?  
                    <Link href={"/sign-up"}>
                        <span className='text-blue-700'> 로그인하기</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
}
 
export default SignUpCard;
