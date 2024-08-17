export default async function getCarImage(
  make: string | null,
  model: string | null
) {
  if (!make || !model) {
    return null;
  }
  const res = await fetch(
    `https://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=${make}+${model}`
  );
  const data = await res.text();
  const match = data.match(/<string[^>]*>([^<]*)<\/string>/);
  const imageUrl = match ? match[1].replace("http://", "https://") : null;

  return imageUrl;
}
