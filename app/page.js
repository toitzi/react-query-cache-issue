import PageClient from "@/app/page.client";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import { promises as fs } from 'fs';
import {Suspense} from "react";

export default async function Home()
{
    const queryClient = new QueryClient();

    queryClient.prefetchQuery({
        queryKey: ['users'],
        queryFn: async () => {
            console.log("Backend Server has been fetched")
            const file = await fs.readFile(process.cwd() + '/data/users.json', 'utf8');
            return JSON.parse(file)
        }
    }).catch()

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<p>Suspense Loading...</p>}>
                <PageClient />
            </Suspense>
        </HydrationBoundary>
    );
}
