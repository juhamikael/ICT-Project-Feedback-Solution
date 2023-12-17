import RedirectUser from "@/components/redirectUser";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export default async function Home() {
  const url = process.env.NEXT_PUBLIC_URL;
  const { getUser } = getKindeServerSession();
  const fetchProducts = async () => {
    const res = await fetch(`${url}/api/products`);
    const productsData = await res.json();
    return productsData.body.products;
  };

  const fetchCategories = async () => {
    const res = await fetch(`${url}/api/categories`);
    const data = await res.json();
    return data.body;
  };

  return (
    <RedirectUser
      categories={await fetchCategories()}
      products={await fetchProducts()}
      user={await getUser()}
    />
  );
}
