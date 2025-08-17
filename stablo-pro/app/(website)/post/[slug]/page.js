import Container from "@/components/container";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import {
  getAllBestToolsSlugs,
  getBestToolsBySlug
} from "@/lib/sanity/client";

export async function generateStaticParams() {
  return await getAllBestToolsSlugs();
}

export async function generateMetadata({ params }) {
  const doc = await getBestToolsBySlug(params.slug);
  return { title: doc?.title || "Best Tools", description: doc?.metaDescription };
}

export default async function BestToolsEntry({ params }) {
  const doc = await getBestToolsBySlug(params.slug);

  return (
    <Container>
      <div className="prose mx-auto dark:prose-invert">
        {doc?.introContent && <PortableText value={doc.introContent} />}

        {doc?.rankingCriteriaContent && (
          <>
            <h2>Ranking Criteria</h2>
            <PortableText value={doc.rankingCriteriaContent} />
          </>
        )}

        {Array.isArray(doc?.bestTools) && doc.bestTools.length > 0 && (
          <>
            {doc.bestTools.map(tool => (
              <section key={tool.id}>
                {tool.bestFor && <h2>{tool.bestFor}</h2>}
                {tool.content && <PortableText value={tool.content} />}
              </section>
            ))}
          </>
        )}

        {doc?.conclusionContent && (
          <>
            <h2>Conclusion</h2>
            <PortableText value={doc.conclusionContent} />
          </>
        )}
      </div>
    </Container>
  );
}

export const revalidate = 60;
