import type { QrdContact } from "./types";

export const XP_CONTACT: QrdContact = {
  name: 'Christopher "Xopher" Pollard',
  title: "Computer Repair, Web Design & Tech Consulting",
  organization: "Hall of the Gods Inc.",
  phone: "+1 520.762.4947",
  email: "sayhi@xophz.com",
  website: "https://www.xophz.com",
  websites: [
    "https://www.xophz.com",
    "https://www.mycompassconsulting.com",
    "https://www.youmeos.com",
    "https://www.hallofthegods.com",
  ],
  birthday: "May 7",
  location: "Tucson, AZ",
  avatar: "/xp_headshot.webp",
  note: "Computer repair · Website design · Tech consulting · Principal Software Architect · Sovereign Infrastructure · Legacy Modernization · Tucson, AZ",
};

export function generateQrVcard(contact: QrdContact): string {
  const urlLines = contact.websites.map((url) => `URL:${url}`);
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Pollard;Christopher;;;",
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
    "N:Pollard;Christopher;;;",
    `FN:${contact.name}`,
    "NICKNAME:Xopher",
    `TITLE:${contact.title}`,
    `ORG:${contact.organization}`,
    "BDAY:--05-07",
    `TEL;TYPE=CELL,VOICE:${contact.phone}`,
    `EMAIL;TYPE=PREF,INTERNET:${contact.email}`,
    ...urlLines,
    "URL;TYPE=LinkedIn:https://linkedin.com/in/xophz",
    "URL;TYPE=GitHub:https://github.com/xopherdeep",
    "ADR;TYPE=HOME:;;;Tucson;AZ;;USA",
    `NOTE:${contact.note}`,
    "END:VCARD",
  ].join("\r\n");
}
