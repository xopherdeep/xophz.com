import { IDENTITY } from "~/constants/identity";
import type { QrdContact } from "./types";

export const XP_CONTACT: QrdContact = {
  name: IDENTITY.fullName,
  title: IDENTITY.title,
  organization: "Hall of the Gods Inc.",
  phone: IDENTITY.formattedPhone,
  email: IDENTITY.vcardEmail,
  website: IDENTITY.siteUrl,
  websites: [
    IDENTITY.siteUrl,
    "https://www.mycompassconsulting.com",
    "https://www.youmeos.com",
    "https://www.hallofthegods.com",
  ],
  birthday: "May 7",
  location: IDENTITY.location,
  avatar: "/xp_headshot.webp",
  note: `${IDENTITY.title} · Principal Software Architect · Sovereign Infrastructure · Legacy Modernization · ${IDENTITY.location}`,
};

export function generateQrVcard(contact: QrdContact): string {
  const urlLines = contact.websites.map((url) => `URL:${url}`);
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${IDENTITY.lastName};${IDENTITY.firstName};;;`,
    `FN:${contact.name}`,
    `ORG:${contact.organization}`,
    "BDAY:--05-07",
    `TEL;TYPE=CELL:${contact.phone}`,
    `EMAIL;TYPE=INTERNET:${contact.email}`,
    ...urlLines,
    "END:VCARD",
  ].join("\r\n");
}

export function generateFullVcard(contact: QrdContact): string {
  const urlLines = contact.websites.map((url) => `URL:${url}`);
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${IDENTITY.lastName};${IDENTITY.firstName};;;`,
    `FN:${contact.name}`,
    `NICKNAME:${IDENTITY.nickname}`,
    `TITLE:${contact.title}`,
    `ORG:${contact.organization}`,
    "BDAY:--05-07",
    `TEL;TYPE=CELL,VOICE:${contact.phone}`,
    `EMAIL;TYPE=PREF,INTERNET:${contact.email}`,
    ...urlLines,
    "URL;TYPE=LinkedIn:https://linkedin.com/in/xophz",
    "URL;TYPE=GitHub:https://github.com/xopherdeep",
    `ADR;TYPE=HOME:;;;${IDENTITY.location};;;USA`,
    `NOTE:${contact.note}`,
    "END:VCARD",
  ].join("\r\n");
}
