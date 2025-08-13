import {QueryClientProvider} from "@/lib/providers/query-client-provider";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export const metadata = {
  title: "Cache issue demo",
  description: "Tanstack Query cache issue demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
