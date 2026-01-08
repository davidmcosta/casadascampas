"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "./lib";
import { getSanityContactInfo } from "./lib/contactData";
import ContactSkeleton from "../components/contactSkeleton";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getSiteSettings } from "./lib/getSitSitting";

export default function Footer() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socialLinks, setSocialLinks] = useState([]);
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
  const [t, setT] = useState(null);

const productSlugs = [
  "campa",
  "placa",
  "jarras",
  "lanterna",
  "lápide",
  "jazigo"
];

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const siteSettings = await getSiteSettings();
        setSocialLinks(siteSettings || []);
        if (siteSettings) {
        }
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    };
    fetchSiteSettings();
  }, []);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dict = await getDictionary(lang, "footer");
        setT(dict || {});
      } catch (error) {
        console.error("Error loading dictionary:", error);
        setT({});
      }
    };
    loadDictionary();
  }, [lang]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getSanityContactInfo();
      if (Array.isArray(data) && data.length > 0) {
        setContact(data[0]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (!t) return null;

  return (
    <footer className="bg-blackDark text-white">
      <div className="px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Logo and Description */}
          <div className="space-y-3">
            <Logo />
            <p className="text-gray-300 text-sm leading-relaxed">
              {t.description}
            </p>
            <div className="flex space-x-3">
              {socialLinks?.social?.facebook && (
                <a href={socialLinks?.social?.facebook}
                  target="_blank" rel="noopener noreferrer"
                  className="text-gray-300 hover:text-amberhover transition-colors" aria-label="Facebook">
                  <FacebookIcon />
                </a>
              )}
              {socialLinks?.social?.instagram && (
                <a href={socialLinks?.social?.instagram}
                  target="_blank" rel="noopener noreferrer"
                  className="text-gray-300 hover:text-amberhover transition-colors" aria-label="Instagram">
                  <InstagramIcon />
                </a>
              )}
              {socialLinks?.social?.email && (
                <a
                  href={`mailto:${socialLinks?.social?.email}`}
                  className="text-gray-300 hover:text-amberhover transition-colors"
                  aria-label="Email"
                >
                  <MailIcon />
                </a>
              )}

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-amberVar">
              {t.quickLinksTitle}
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/#" className="text-gray-300 hover:text-amberhover">
                  {t.quickLinks?.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="text-gray-300 hover:text-amberhover">
                  {t.quickLinks?.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/products`} className="text-gray-300 hover:text-amberhover">
                  {t.quickLinks?.products}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/gallery`} className="text-gray-300 hover:text-amberhover">
                  {t.quickLinks?.gallery}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/blog`} className="text-gray-300 hover:text-amberhover">
                  {t.quickLinks?.blog}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-gray-300 hover:text-amberhover">
                  {t.quickLinks?.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-amberVar">
              {t.productsTitle}
            </h3>
          <ul className="space-y-1 text-sm">
  {productSlugs.map((slug, idx) => {
    const capitalized = slug.split("-")[0].charAt(0).toUpperCase() + slug.split("-")[0].slice(1);
    return (
      <li key={idx}>
        <Link
          href={`/${lang}/products/${slug}`}
          className="text-gray-300 hover:text-amberhover"
        >
          {capitalized}
        </Link>
      </li>
    );
  })}
</ul>

          </div>

          {/* Contact Info */}
          {loading ? (
            <ContactSkeleton />
          ) : (
            contact && (
              <div>
                <h3 className="text-base font-semibold mb-3 text-amberVar">
                  {t.contactTitle}
                </h3>
                <ul className="space-y-3 text-sm">
                  {contact.address && (
                    <li className="flex items-start">
                      <MapPinIcon className="mr-2 text-amberVar mt-1 h-5 w-5" />
                      <span className="text-gray-300 leading-tight">
                        {contact.address}
                      </span>
                    </li>
                  )}

                  {contact.phone && (
                    <li className="flex items-center">
                      <PhoneIcon className="mr-2 text-amberVar h-5 w-5" />
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-gray-300 hover:text-amberhover"
                      >
                        {contact.phone}
                      </a>
                    </li>
                  )}

                  {contact.email && (
                    <li className="flex items-center">
                      <MailIcon className="mr-2 text-amberVar h-5 w-5" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-gray-300 hover:text-amberhover"
                      >
                        {contact.email}
                      </a>
                    </li>
                  )}

                  {contact.hours?.length > 0 && (
                    <li className="flex items-start">
                      <ClockIcon className="mr-2 text-amberVar mt-1 h-5 w-5" />
                      <span className="text-gray-300 leading-tight space-y-1">
                        {contact.hours.map((item, index) => (
                          <div key={index}>
                            <strong className="block">{item.days}</strong>
                            <span>{item.time}</span>
                          </div>
                        ))}
                      </span>
                    </li>
                  )}

                  {contact.whatsapp && (
                    <li className="flex items-center">
                      <PhoneIcon className="mr-2 text-amberVar h-5 w-5" />
                      <a
                        href={`https://wa.me/${contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-amberhover"
                      >
                        {t.whatsappLabel}: {contact.whatsapp}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )
          )}
        </div>
        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} Casa das Campas. {t.bottomText}
          </p>
          <div className="mt-3 md:mt-0 flex space-x-4">
            <p>
              {t.privacy}
            </p>
            <p >
              {t.terms}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
