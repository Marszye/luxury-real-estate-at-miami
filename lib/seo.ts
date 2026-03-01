import type {Property} from './queries'

type RealEstateListingOptions = {
  url?: string
  imageUrl?: string
}

export function createRealEstateListingJsonLd(
  property: Property,
  options: RealEstateListingOptions = {},
) {
  const {url, imageUrl} = options

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    url,
    image: imageUrl,
    address: property.location
      ? {
          '@type': 'PostalAddress',
          streetAddress: property.location,
        }
      : undefined,
    numberOfBedrooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize:
      typeof property.sqFt === 'number'
        ? {
            '@type': 'QuantitativeValue',
            value: property.sqFt,
            unitText: 'SquareFeet',
          }
        : undefined,
    offers:
      typeof property.price === 'number'
        ? {
            '@type': 'Offer',
            price: property.price,
            priceCurrency: 'USD',
          }
        : undefined,
  }

  // Remove undefined keys so JSON-LD stays clean
  Object.keys(jsonLd).forEach((key) => {
    if (jsonLd[key] === undefined) {
      delete jsonLd[key]
    }
  })

  return jsonLd
}

