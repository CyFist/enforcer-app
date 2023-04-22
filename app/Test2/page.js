import { getBaseUrl } from "#/lib/getBaseUrl";

async function getData() {
  const res = await fetch(`${getBaseUrl()}/api/getRecords`, {
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const dynamicData = await getData();

  return (
    <div>
      <div>
        {dynamicData.map((rec) => (
          <li>{rec.user}</li>
        ))}
      </div>
    </div>
  );
}
