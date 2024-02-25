

import { redirect } from '@sveltejs/kit';

// inleveren

export const load = async (data) => {
    let params = new URL(data.url).searchParams;
    let User = params.get("User");
    let lessen = params.get("lessen"); 
    if(!User) {
        redirect(302, '/User');
    }
};
