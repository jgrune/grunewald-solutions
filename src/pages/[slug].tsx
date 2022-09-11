import Head from 'next/head';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { IBlogPostFields } from '../@types/contentful';
import styles from '../styles/Home.module.css';
import ContentService from '../util/content-service';

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

interface Props {
  article: IBlogPostFields;
}

const Article: NextPage<Props> = ({ article }) => {
  console.log('article', article);
  return (
    <div className={styles.container}>
      <Head>
        <title>{article.title} | My awesome Harry Potter blog</title>
        {/* <meta name='description' content={description} /> */}
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{article.title}</h1>
        <time className={styles.publishDate}>Published on {article.slug}</time>

        {article.description && (
          <div className={styles.article}>
            {documentToReactComponents(article.description)}
          </div>
        )}
        {article.body && (
          <div className={styles.article}>
            {documentToReactComponents(article.body)}
          </div>
        )}
      </main>
    </div>
  );
};

export default Article;

export const getStaticProps: GetStaticProps<
  Props,
  // This is the match for the [slug] path param
  { slug: string }
> = async (ctx) => {
  // get article by slug
  const { slug } = ctx.params!;
  const article = await ContentService.instance.getPostBySlug(slug);

  if (!article) {
    return { notFound: true };
  }

  return {
    props: {
      article: article.fields,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles =
    await ContentService.instance.getEntriesByType<IBlogPostFields>('blogPost');

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.fields.slug,
      },
    })),
    fallback: false,
  };
};
