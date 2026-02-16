"use server";

import { createClient } from "@supabase/supabase-js";
import { auth, currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function syncUserProfile() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return { error: "Not authenticated" };
  }



  const email = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress;
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ");

  const { data: existingUser } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!existingUser) {
    const { error } = await supabaseAdmin.from("users").insert({
      user_id: userId,
      email: email,
      name: name,
    });

    if (error) {
      console.error("Error syncing user:", error);
      return { error: error.message };
    }
  }

  return { success: true };
}
