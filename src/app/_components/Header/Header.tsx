import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import HeaderSign from "./HeaderSign";

export default async function Header() {
  // const res = await getServerSession();
  // const username = res?.user?.name;
  // const isUserAuthenticated = !!username;
  return (
    <div className="flex justify-between px-10 py-1">
      <div className="flex gap-1">
        <h6>Free Shipping on Orders 500 EGP</h6>
        <h6>New Arrivals Daily</h6>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex gap-2">
          <a className="flex items-center gap-1" href="#">
            <FaPhoneAlt />
            +1 (800) 123-4567
          </a>
          <a className="flex items-center gap-1" href="#">
            <MdOutlineMail />
            support@freshcart.com
          </a>
        </div>

        <HeaderSign />
      </div>
    </div>
  );
}
