import { GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "./home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hei, welcome</span>
          <h1>
            News about the <span>React</span> world
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { id, unit_amount } = await stripe.prices.retrieve(
    "price_1LcgypG9hJMlF4W7s1zIiogU"
  );

  const props: HomeProps = {
    product: {
      priceId: id,
      amount: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(unit_amount / 100),
    },
  };

  return {
    props,
    revalidate: 60 * 60 * 24,
  };
};
