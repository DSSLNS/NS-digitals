import { AtelierCheckout, AtelierCollection, AtelierHome, AtelierMobileProduct, AtelierProduct } from "./atelier";
import { BrightpathHome, BrightpathMobileCourse } from "./brightpath";
import { HarbourBefore, HarbourHome, HarbourMobileHome } from "./harbour";
import { LedgerlyHome, LedgerlyMobileHome, LedgerlyPricing } from "./ledgerly";
import { NorthfieldHome, NorthfieldMobileHome } from "./northfield";
import { OakhavenCollection, OakhavenHome, OakhavenMobileHome } from "./oakhaven";
import { SaffronHome, SaffronMobileBooking } from "./saffron";
import { WayfarerHome, WayfarerMobileHome } from "./wayfarer";

/** Every capturable screen, keyed by project slug, then view. Views starting with "mobile" are phone screens. */
export const mockups: Record<string, Record<string, () => React.ReactElement>> = {
  "atelier-commerce-concept": {
    home: AtelierHome,
    collection: AtelierCollection,
    product: AtelierProduct,
    checkout: AtelierCheckout,
    "mobile-product": AtelierMobileProduct,
  },
  "oakhaven-furniture-concept": { home: OakhavenHome, collection: OakhavenCollection, "mobile-home": OakhavenMobileHome },
  "ledgerly-saas-concept": { home: LedgerlyHome, pricing: LedgerlyPricing, "mobile-home": LedgerlyMobileHome },
  "harbour-clinic-redesign-concept": { before: HarbourBefore, home: HarbourHome, "mobile-home": HarbourMobileHome },
  "saffron-table-bug-fixing-concept": { home: SaffronHome, "mobile-booking": SaffronMobileBooking },
  "brightpath-qa-testing-concept": { home: BrightpathHome, "mobile-course": BrightpathMobileCourse },
  "wayfarer-seo-performance-concept": { home: WayfarerHome, "mobile-home": WayfarerMobileHome },
  "northfield-maintenance-concept": { home: NorthfieldHome, "mobile-home": NorthfieldMobileHome },
};
