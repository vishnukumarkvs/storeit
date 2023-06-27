"use client";

import { Button, useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { user, signOut } = useAuthenticator();
  return (
    <div className="flex justify-between">
      <div className="flex justify-start items-start gap-x-4 p-3 pl-[30px]">
        <Link href="/" className="font-semibold">
          Home
        </Link>
        <Link href="/create" className="font-semibold">
          Create
        </Link>
        <Link href="/test" className="font-semibold">
          Test
        </Link>
      </div>
      <div>
        {user ? (
          <>
            <div className="flex gap-x-2 pr-4 items-center m-2">
              <p className="text-sm font-semibold">{user.username}</p>
              <Button
                onClick={() => {
                  signOut();
                  router.push("/");
                }}
              >
                Sign Out
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
