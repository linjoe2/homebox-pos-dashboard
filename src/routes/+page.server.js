import { redirect } from "@sveltejs/kit";

export const load = async (data) => {
  redirect(302, '/User');
}