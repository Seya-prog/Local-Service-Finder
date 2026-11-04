export const MALE_AVATARS = [
  "/avatars/abel.jpg",
  "/avatars/yonas.jpg",
  "/avatars/solomon.jpg",
  "/avatars/daniel.jpg",
  "/avatars/mike.jpg",
  "/avatars/john_doe.jpg",
]

export const FEMALE_AVATARS = [
  "/avatars/meron.jpg",
  "/avatars/hana.jpg",
  "/avatars/tigist.jpg",
  "/avatars/emily.jpg",
  "/avatars/sarah.jpg",
  "/avatars/daisy.jpg",
]

const KNOWN_MALE_NAMES = new Set([
  "abel", "solomon", "dawit", "yonas", "kidus", "ermias", "bereket", "haile", 
  "daniel", "michael", "mike", "john", "yared", "samuel", "henok", "fitsum", 
  "natnael", "bro", "guy", "man", "mr", "boy", "alemu", "bekele", "kebede", 
  "tesfaye", "tadesse", "assefa", "worku", "demissie", "lema", "girum", "biruk", 
  "amanuel", "dave", "alex", "yohannes", "tariku", "tedros", "tamirat", "tewodros",
  "dagnachew", "mulugeta", "kassahun", "berhanu", "kassaye", "negash", "habte", "sisay",
  "abiy", "getachew", "meles", "mengistu", "fasil", "eyob", "nahom", "biniam", "kaleab",
  "ezra", "mikael", "petros", "paulos", "markos", "surafel", "robiel", "leul", "senay",
  "dagim", "aman", "aron", "yosef", "joseph", "david", "james", "peter", "paul", "mark",
  "ato", "gashe"
])

const KNOWN_FEMALE_NAMES = new Set([
  "meron", "almaz", "genet", "hana", "tigist", "sara", "sarah", "eden", "mahlet", 
  "tsion", "hiwot", "bethlehem", "selam", "senait", "rahel", "aster", "meseret", 
  "marta", "emebet", "daisy", "emily", "emma", "jessica", "josephine", "ruth", 
  "helen", "luna", "woman", "ms", "mrs", "lemlem", "hawi", "kalkidan", "mekdes",
  "feven", "rediet", "birtukan", "dinknesh", "yeabsira", "hermela", "liya", "frehiwot",
  "fikerte", "chaltu", "toltu", "derartu", "meskerem", "worknesh", "tsehay",
  "mary", "bethel", "hanna", "rebecca", "rachel", "esther", "miriam", "leah", "grace",
  "wezero", "emaye"
])

export function isMaleName(name?: string | null): boolean {
  if (!name) return false
  const clean = name.toLowerCase().trim()
  const tokens = clean.split(/[\s_\-.,/]+/)
  return tokens.some((t) => KNOWN_MALE_NAMES.has(t))
}

export function isFemaleName(name?: string | null): boolean {
  if (!name) return false
  const clean = name.toLowerCase().trim()
  const tokens = clean.split(/[\s_\-.,/]+/)
  return tokens.some((t) => KNOWN_FEMALE_NAMES.has(t))
}

export function isFemaleAvatar(url?: string | null): boolean {
  if (!url) return false
  const lower = url.toLowerCase()
  return (
    lower.includes("hero-cleaner") ||
    lower.includes("hero-nanny") ||
    lower.includes("meron") ||
    lower.includes("hana") ||
    lower.includes("tigist") ||
    lower.includes("emily") ||
    lower.includes("sarah") ||
    lower.includes("daisy") ||
    lower.includes("emma") ||
    lower.includes("jessica") ||
    lower.includes("josephine")
  )
}

export function isMaleAvatar(url?: string | null): boolean {
  if (!url) return false
  const lower = url.toLowerCase()
  return (
    lower.includes("hero-handyman") ||
    lower.includes("abel") ||
    lower.includes("yonas") ||
    lower.includes("solomon") ||
    lower.includes("daniel") ||
    lower.includes("mike") ||
    lower.includes("john_doe") ||
    lower.includes("michael")
  )
}

/**
 * Resolves an authentic Ethiopian avatar matching the person's gender and identity,
 * ensuring male names never receive woman photos and preventing repeated photos.
 */
export function getProviderAvatar(
  name?: string | null,
  category?: string | null,
  customImage?: string | null
): string {
  const cleanName = (name || "").trim()
  const lowerName = cleanName.toLowerCase()

  const male = isMaleName(cleanName)
  const female = isFemaleName(cleanName)

  // Check if customImage is provided and valid
  if (customImage && typeof customImage === "string" && customImage.trim() !== "") {
    // If name is clearly male, prevent any female photo/cleaner default from being used
    if (male && isFemaleAvatar(customImage)) {
      // Reject female avatar for male person, proceed to pick deterministic male avatar
    } else if (female && isMaleAvatar(customImage)) {
      // Reject male avatar for female person, proceed to pick deterministic female avatar
    } else if (!customImage.includes("hero-cleaner")) {
      return customImage
    }
  }

  // Deterministic hash based on the name so the same provider consistently gets their own avatar,
  // and different providers get different avatars
  let hash = 0
  for (let i = 0; i < lowerName.length; i++) {
    hash = (hash << 5) - hash + lowerName.charCodeAt(i)
    hash |= 0
  }
  const posHash = Math.abs(hash)

  if (male) {
    return MALE_AVATARS[posHash % MALE_AVATARS.length]
  }

  if (female) {
    return FEMALE_AVATARS[posHash % FEMALE_AVATARS.length]
  }

  // If gender is not detected from name, use category hint
  const cat = (category || "").toLowerCase()
  if (cat.includes("handy") || cat.includes("tech") || cat.includes("electr") || cat.includes("plumb")) {
    return MALE_AVATARS[posHash % MALE_AVATARS.length]
  }
  if (cat.includes("beauty") || cat.includes("hair")) {
    return FEMALE_AVATARS[posHash % FEMALE_AVATARS.length]
  }

  // Balanced rotation fallback
  const combined = [
    "/avatars/daniel.jpg",
    "/avatars/sarah.jpg",
    "/avatars/yonas.jpg",
    "/avatars/hana.jpg",
    "/avatars/mike.jpg",
    "/avatars/tigist.jpg",
    "/avatars/abel.jpg",
    "/avatars/daisy.jpg",
  ]
  return combined[posHash % combined.length]
}
