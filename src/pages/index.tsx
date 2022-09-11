import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import { IBlogPostFields } from '../@types/contentful';
import styles from '../styles/Home.module.css';
import ContentService from '../util/content-service';

interface Props {
  articles: IBlogPostFields[];
}

const Home: NextPage<Props> = ({ articles }) => {
  useEffect(() => {
    console.log(articles);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Grunewald Solutions</title>
        <meta
          name='description'
          content='Professional Services and Management Consulting'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Grunewald Solutoins!</h1>

        <p className={styles.description}>Professional Services</p>

        <div className={styles.grid}>
          {articles.map((article) => (
            <Link key={article.slug} href={`/${article.slug}`}>
              <a className={styles.card}>
                <h2>{article.title} &rarr;</h2>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const articles = (
    await ContentService.instance.getEntriesByType<IBlogPostFields>('blogPost')
  ).map((entry) => {
    return entry.fields;
  });

  return {
    props: {
      articles,
    },
  };
};

export default Home;
