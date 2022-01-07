import { useUser } from '@auth0/nextjs-auth0';

export default function PageWrapper({ children, status }) {
    const { user } = useUser();

    return status || user ? (
        <> 
            {!status && <div class="somestyle">You are logged in but the site is offline!</div>}
            {children}
        </>
    ) : (
        <SiteOffline />
    );       
};