import {getCatalogContent} from '@/sanity/queries/ExperienceCatalog';
import {getGeneralLayout} from '@/sanity/queries/GeneralLayout/GeneralLayout';
import {local} from '@/lib/experience/normalize';
import {label} from '@/lib/experience/labels';
import type {Locale} from '@/lib/experience/types';
import AvailabilityForm from '@/components/ExperienceCatalog/AvailabilityForm';
import {catalogPageMetadata} from '@/components/ExperienceCatalog/Catalog';
export default async function Page({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;const [content,company]=await Promise.all([getCatalogContent(),getGeneralLayout()]);const c=content.contact,settings=content.settings||{};return <main className="ec-shell"><div className="ec-wrap"><h1>{local(c?.heading,locale)||label(settings,locale,'contactUsLabel')}</h1><p>{local(c?.description,locale)}</p><div className="ec-contact-grid"><AvailabilityForm locale={locale} settings={settings}/><aside>{(c?.telephone||company?.telephone)&&<p><a href={'tel:'+(c?.telephone||company?.telephone)}>{c?.telephone||company?.telephone}</a></p>}{(c?.email||company?.email)&&<p><a href={'mailto:'+(c?.email||company?.email)}>{c?.email||company?.email}</a></p>}{c?.whatsapp&&<p><a href={'https://wa.me/'+c.whatsapp.replace(/\D/g,'')}>WhatsApp</a></p>}<p>{local(c?.businessInformation,locale)}</p></aside></div></div></main>;}
export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;const c=await getCatalogContent();return catalogPageMetadata(locale,'/contact',c.contact?.seo,label(c.settings,locale,'contactUsLabel'));}
