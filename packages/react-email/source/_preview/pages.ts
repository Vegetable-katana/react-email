export const pages = [
  {
    title: '_app.tsx',
    content:
      "import '../styles/globals.css';\nimport type { AppProps } from 'next/app';\nimport { Inter } from '@next/font/google';\nimport classnames from 'classnames';\nimport Head from 'next/head';\n\nconst inter = Inter({\n  subsets: ['latin'],\n  variable: '--font-inter',\n});\n\nfunction MyApp({ Component, pageProps }: AppProps) {\n  return (\n    <div className={classnames(inter.variable, 'font-sans')}>\n      <Head>\n        <title>React Email</title>\n      </Head>\n      <Component {...pageProps} />\n    </div>\n  );\n}\n\nexport default MyApp;\n",
  },
  {
    title: '_document.tsx',
    content:
      'import { Html, Head, Main, NextScript } from \'next/document\';\n\nexport default function Document() {\n  return (\n    <Html lang="en">\n      <Head />\n      <body className="bg-black text-slate-12 font-sans">\n        <Main />\n        <NextScript />\n      </body>\n    </Html>\n  );\n}\n',
  },
  {
    title: 'index.tsx',
    content:
      "import { promises as fs } from 'fs';\nimport path from 'path';\nimport { Button, Heading, Text } from '../components';\nimport { Layout } from '../components/layout';\nimport Link from 'next/link';\n\ninterface HomeProps {}\n\nexport const CONTENT_DIR = 'emails';\n\nconst getEmails = async () => {\n  const emailsDirectory = path.join(process.cwd(), CONTENT_DIR);\n  const filenames = await fs.readdir(emailsDirectory);\n  const emails = filenames.map((file) => file.replace(/\\.(jsx|tsx)$/g, ''));\n\n  return emails;\n};\n\nexport async function getStaticProps({ params }) {\n  try {\n    const emails = await getEmails();\n    return emails\n      ? { props: { navItems: emails } }\n      : { props: { navItems: [] } };\n  } catch (error) {\n    console.error(error);\n    return { props: { navItems: [] } };\n  }\n}\n\nconst Home: React.FC<Readonly<HomeProps>> = ({ navItems }: any) => {\n  return (\n    <Layout navItems={navItems}>\n      <div className=\"max-w-md border border-slate-6 mx-auto mt-56 rounded-md p-8\">\n        <Heading as=\"h2\" weight=\"medium\">\n          Welcome to the React Email preview!\n        </Heading>\n        <Text as=\"p\" className=\"mt-2 mb-4\">\n          To start developing your next email template, you can create a{' '}\n          <code>.jsx</code> or <code>.tsx</code> file under the \"emails\" folder.\n        </Text>\n\n        <Button asChild>\n          <Link href=\"https://react.email/docs\">Check the docs</Link>\n        </Button>\n      </div>\n    </Layout>\n  );\n};\n\nexport default Home;\n",
  },
  {
    dir: 'preview',
    title: '[slug].tsx',
    content:
      "import { promises as fs } from 'fs';\nimport path from 'path';\nimport { render } from '@react-email/render';\nimport { GetStaticPaths } from 'next';\nimport { Layout } from '../../components/layout';\nimport * as React from 'react';\nimport { Code } from '../../components';\nimport Head from 'next/head';\n\ninterface PreviewProps {}\n\nexport const CONTENT_DIR = 'emails';\n\nconst getEmails = async () => {\n  const emailsDirectory = path.join(process.cwd(), CONTENT_DIR);\n  const filenames = await fs.readdir(emailsDirectory);\n  const emails = filenames.map((file) => file.replace(/\\.(jsx|tsx)$/g, ''));\n  return { emails, filenames };\n};\n\nexport const getStaticPaths: GetStaticPaths = async () => {\n  const { emails } = await getEmails();\n  const paths = emails.map((email) => {\n    return { params: { slug: email } };\n  });\n  return { paths, fallback: true };\n};\n\nexport async function getStaticProps({ params }) {\n  try {\n    const { emails, filenames } = await getEmails();\n    const template = filenames.filter((email) => {\n      const [fileName] = email.split('.');\n      return params.slug === fileName;\n    });\n\n    const Email = (await import(`../../../emails/${params.slug}`)).default;\n    const markup = render(<Email />, { pretty: true });\n    const path = `${process.cwd()}/${CONTENT_DIR}/${template[0]}`;\n    const reactMarkup = await fs.readFile(path, {\n      encoding: 'utf-8',\n    });\n\n    return emails\n      ? { props: { navItems: emails, slug: params.slug, markup, reactMarkup } }\n      : { notFound: true };\n  } catch (error) {\n    console.error(error);\n    return { notFound: true };\n  }\n}\n\nconst Preview: React.FC<Readonly<PreviewProps>> = ({\n  navItems,\n  markup,\n  reactMarkup,\n  slug,\n}: any) => {\n  const [viewMode, setViewMode] = React.useState('desktop');\n  const title = `${slug} — React Email`;\n\n  return (\n    <Layout\n      navItems={navItems}\n      title={slug}\n      viewMode={viewMode}\n      setViewMode={setViewMode}\n    >\n      <Head>\n        <title>{title}</title>\n      </Head>\n      {viewMode === 'desktop' ? (\n        <iframe\n          srcDoc={markup}\n          frameBorder=\"0\"\n          className=\"w-full h-[calc(100vh_-_70px)]\"\n        />\n      ) : (\n        <div className=\"flex gap-6 mx-auto p-6\">\n          <Code>{reactMarkup}</Code>\n          <Code>{markup}</Code>\n        </div>\n      )}\n    </Layout>\n  );\n};\n\nexport default Preview;\n",
  },
];
