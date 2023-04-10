import React, { useState, useEffect } from "react";
import { Tooltip } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  UserIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  CalendarDaysIcon,
  ClipboardIcon,
  CreditCardIcon,
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  DocumentTextIcon,
  ListBulletIcon,
  LockClosedIcon,
  PaperClipIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";

const navigation = [
  {
    name: "Anexo V",
    icon: HomeIcon,
    current: false,
    to: "/",
  },

  {
    name: "Componentes",
    icon: InboxIcon,
    current: false,
    to: "/componentes",
  },
  {
    name: "Clientes",
    icon: FolderIcon,
    current: false,
    to: "/clientes",
  },
  {
    name: "Reportes",
    icon: PaperClipIcon,
    current: false,
    to: "/reportes",
  },
  {
    name: "Consultas",
    icon: ListBulletIcon,
    current: false,
    to: "consultas",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Side() {
  const pintarCurrent = (e, i) => {
    e.preventDefault();

    if (navigation[i].current == true) {
      return (navigation[i].current = false);
    }

    navigation[i].current = true;
  };

  return (
    <div className="mt-20 h-full fixed md:inset-y-0 md:flex md:w-48 md:h-screen md:flex-col bg-[#009640]">
      <div className="flex flex-grow flex-col overflow-y-auto  pt-5">
        <nav className="flex-1 space-y-1  px-2 " aria-label="Sidebar">
          {navigation.map((item, i) =>
            <Disclosure
            as="div"
            key={item.name}
            onClick={(e) => pintarCurrent(e, i)}
            className="space-y-1 "
          >
            <Link to={item.to}>
            <Tooltip
                  className="bg-gray-400 py-2 w-28 text-center md:hidden transition duration-150 "
                  content={item.name}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <Disclosure.Button
                  key={i}
                    className={classNames(
                      item.current
                        ? "bg-white text-gray-900"
                        : "bg-[#009640] text-white hover:bg-gray-50 hover:text-gray-900",
                      "group w-full flex items-center md:pl-2 md:pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    )}
                  >
                    <item.icon
                      className="md:mr-3 h-6 w-6 flex-shrink-0 text-white group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="flex-1 md:block hidden">
                      {item.name}
                    </span>
                    
                  </Disclosure.Button>
                </Tooltip>
            </Link>
           
          </Disclosure>
          )}
        </nav>
      </div>
    </div>
  );
}
