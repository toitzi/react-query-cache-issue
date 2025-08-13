import PageClient from "@/app/page.client";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import { promises as fs } from 'fs';


const queryClient = new QueryClient()
export default async function Home()
{
    queryClient.prefetchQuery({
        queryKey: ['users'],
        queryFn: async () => {
            console.log("Backend Server has been fetched")
            const file = await fs.readFile(process.cwd() + '/data/users.json', 'utf8');
            return JSON.parse(file)
        },
        staleTime: 8000 // 8 seconds
    }).catch()

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PageClient />
        </HydrationBoundary>
    );
}
