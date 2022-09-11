import Head from 'next/head';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import { IBlogPostFields, IRecommendationFields } from '../@types/contentful';
import styles from '../styles/Home.module.css';
import ContentService from '../util/content-service';

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
interface Props {
  article: IBlogPostFields;
}

const overrides = {
  [BLOCKS.PARAGRAPH]: '<p></p>',
};

const Article: NextPage<Props> = ({ article }) => {
  // console.log('article', article);
  return (
    <div className={styles.container}>
      <Head>
        <title>{article.title}</title>
        {/* <meta name='description' content={description} /> */}
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{article.title}</h1>

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

        {article.recommendations?.map((recommendation, i) => (
          <div key={i}>
            <div>{recommendation.fields.recommendor as string}</div>
            <div>{recommendation.fields.subheadline as string}</div>
            <div>{recommendation.fields.body as string}</div>
          </div>
        ))}

        {article.professionalExperiences?.map((experience, i) => (
          <div key={i}>
            <div>{experience.fields.organizationName as string}</div>
            <div>{experience.fields.role as string}</div>
            <div>{experience.fields.location as string}</div>
            <div>{experience.fields.dates as string}</div>
            <div>{experience.fields.description as string}</div>
          </div>
        ))}
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
