<script setup lang="ts">
import type { MarkdownParsedContent } from "@nuxt/content";

interface Project extends MarkdownParsedContent {
  title: string;
  url: string;
  github: string;
}

const { data: projects } = await useAsyncData(async () => {
  const list = await queryContent<Project>("projects").find();

  return list.map(({ url, github, ...project }) => {
    const links = [
      {
        url: url,
        title: "Live",
      },
      {
        url: github,
        title: "Source",
      },
    ].filter(({ url }) => url);

    return {
      ...project,
      links,
    };
  });
});
</script>

<template>
  <ul class="space-y-7 pt-8">
    <li
      v-for="(project, index) in projects"
      :key="project._id"
      class="space-y-3 animate-in fade-in fill-mode-both slide-in-from-bottom-10"
      :style="{ animationDelay: `${100 * index}ms` }"
    >
      <div class="flex items-center">
        <h2 class="font-semibold">{{ project.title }}</h2>

        <div
          v-if="project.links.length > 0"
          class="h-[1em] w-px bg-border mx-5"
        />

        <div class="flex gap-3">
          <a
            class="flex items-center gap-1 group hover:underline"
            :href="link.url"
            v-for="link in project.links"
          >
            {{ link.title }}
          </a>
        </div>
      </div>

      <UiProse>
        <ContentRendererMarkdown :value="project" />
      </UiProse>
    </li>
  </ul>
</template>

<!-- export default function Projects() {
  const { projects } = useLoaderData<typeof loader>();

  return (
    <ul className="space-y-7 pt-8">
      {projects.map((project, index) => {
        return (
          <li
            key={project.slug}
            className="space-y-3 animate-in fade-in fill-mode-both slide-in-from-bottom-10"
            style={{
              animationDelay: `${100 * index}ms`,
            }}
          >
            <div className="flex items-center">
              <h2 className="font-semibold">{project.title}</h2>

              {[project.url, project.github].filter(Boolean).length > 0 && (
                <div className="h-[1em] w-px bg-border mx-5" />
              )}

              <div className="flex gap-3">
                {project.url && (
                  <ProjectLink to={project.url}>Live</ProjectLink>
                )}
                {project.github && (
                  <ProjectLink to={project.github}>Source</ProjectLink>
                )}
              </div>
            </div>

            <Prose>
              <MDXContent code={project.content} />
            </Prose>

            <ul className="flex  flex-wrap gap-2">
              {project.skills.map((skill) => {
                return (
                  <li
                    className="bg-card py-0.5 px-2 text-xs rounded"
                    key={skill.name}
                  >
                    {skill.name}
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

const ProjectLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <Link className="flex items-center gap-1 group hover:underline" to={to}>
      {children}
    </Link>
  );
}; -->
