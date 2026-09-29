import Catalog,{catalogPageMetadata} from '@/components/ExperienceCatalog/Catalog';
import {getCatalogContent} from '@/sanity/queries/ExperienceCatalog';
import {label} from '@/lib/experience/labels';
import type {Locale} from '@/lib/experience/types';
export default async function Page({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;return <Catalog locale={locale}/>;}
export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;const c=await getCatalogContent();return catalogPageMetadata(locale,'',c.home?.seo,'Punta Cana Proposal Packages');}
