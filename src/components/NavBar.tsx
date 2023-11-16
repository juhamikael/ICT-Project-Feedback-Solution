import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserButton from "./thirdPartyComponents/kinde-starter/UserButton";
import AddProductSheet from "./add-product";
const NavBar = async ({}) => {
  const { getUser, isAuthenticated, getPermission } = getKindeServerSession();
  const getPermissionFlag = getPermission("add-products");
  const user = getUser();
  const userAuthenticated = isAuthenticated();
  return (
    <MaxWidthWrapper className="pb-8">
      <nav className="flex justify-between items-center border-b">
        <div className="flex py-4 gap-x-4 ">
          <Link
            className="flex gap-x-2"
            href={userAuthenticated ? "/dashboard" : "/products"}
          >
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src="/Acme.svg"
              alt="Acme Logo"
              width={30}
              height={30}
              priority
            />
            <div className="font-black">AcmeStore</div>
          </Link>
          <Link href="/products">Tuotteet</Link>
        </div>
        {userAuthenticated ? (
          <div className="flex gap-x-4 items-center">
            {getPermissionFlag.isGranted && (
              <AddProductSheet title="Lisää tuote" />
            )}
            <UserButton isAuthenticated={userAuthenticated} user={user} />
          </div>
        ) : (
          <div className="flex gap-x-4">
            <LoginLink>Login</LoginLink>
            <RegisterLink>Sign up</RegisterLink>
          </div>
        )}
      </nav>
    </MaxWidthWrapper>
  );
};

export default NavBar;
