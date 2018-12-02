<template>
  <div class="work">
    <div class="container">
      <h1 class="page-headline">Work</h1>
      <filter-menu v-on:filterChanged="resetFilter"/>
      <section class="projects-section">
        <loading-indicator :loading="loading"/>
        <projects-grid :projects="projects"/>
      </section>
      <pagination :numPages=numPages :activePage=activePage @pageChanged="retrievePage"/>
    </div>
  </div>
</template>

<script>
import ProjectsGrid from "@/components/ProjectsGrid.vue";
import FilterMenu from "@/components/FilterMenu.vue";
import Pagination from "@/components/Pagination.vue";
import LoadingIndicator from "@/components/LoadingIndicator.vue";

export default {
  name: "Work",
  metaInfo: {
    // all titles will be injected into this template
    titleTemplate: "%s | Work",
    meta: [
      { vmid: "og:title", content: "Work" },
      { vmid: "og:url", content: "https://www.ramkumar.me/work/" }
    ]
  },
  components: {
    FilterMenu,
    ProjectsGrid,
    Pagination,
    LoadingIndicator
  },
  data() {
    return {
      loading: false,
      projects: [],
      numPages: 0,
      activePage: 0,
      pageSize: 9,
      selectedTag: ''
    };
  },
  methods: {
    getContent() {
      // Start progress bar
      this.loading = true;
      this.startProgress();
      this.$prismic.client
        .query(this.$prismic.Predicates.at("document.type", "project"), {
          fetch: [
            "project.title",
            "project.short_description",
            "project.image",
            "project.link"
          ],
          orderings: "[document.last_publication_date desc]",
          pageSize: this.pageSize,
          page: this.activePage
        })
        .then(response => {
          console.log(response);
          this.setProgress(95);
          this.setupPagination(response);
          this.buildProjectsList(response.results);
          // let projectsContainer = document.getElementsByClassName("container")[0]
          // window.scrollTo(0, projectsContainer.offsetTop);
          this.loading = false;
        });
    },
    retrieveProjects(tag) {
      // Initialise progress bar
      this.setProgress(0);
      this.loading = true;
      if (tag === "all") {
        this.getContent();
      } else {
        this.startProgress();
        this.$prismic.client
          .query(this.$prismic.Predicates.at("document.tags", [tag]), {
            fetch: [
              "project.title",
              "project.short_description",
              "project.image",
              "project.link"
            ],
            orderings: "[document.last_publication_date desc]",
            pageSize: this.pageSize,
            page: this.activePage
          })
          .then(response => {
            this.setProgress(95);
            this.setupPagination(response);
            this.buildProjectsList(response.results);
            // let projectsContainer = document.getElementsByClassName("container")[0]
            // window.scrollTo(0, projectsContainer.offsetTop);
            this.loading = false;
          });
      }
    },
    buildProjectsList(projectsResponse) {
      // Remove projects that are not in response
      this.projects = this.projects.filter(project => {
        let indexInArray = projectsResponse
          .map(projectItem => {
            return projectItem["id"];
          })
          .indexOf(project.id);
        return indexInArray !== -1;
      });
      // Add additional projects to the array
      projectsResponse.forEach(projectItem => {
        let indexInArray = this.projects
          .map(project => {
            return project["id"];
          })
          .indexOf(projectItem.id);
        if (indexInArray === -1) {
          this.projects.push({
            id: projectItem.id,
            title: projectItem.data.title,
            short_description: projectItem.data.short_description,
            image: projectItem.data.image,
            link: projectItem.data.link,
            tags: projectItem.tags
          });
        }
      });
    },
    resetFilter(tag) {
      this.selectedTag = tag;
      this.activePage = 1;
      this.retrieveProjects(this.selectedTag);
    },
    retrievePage(page) {
      this.activePage = page;
      this.retrieveProjects(this.selectedTag);
    },
    setupPagination(response) {
        this.numPages = response.total_pages;
        this.activePage = response.page;
    },
    startProgress() {
      this.$Progress.start();
    },
    setProgress(value) {
      this.$Progress.set(value);
    },
    finishProgress() {
      this.$Progress.finish();
    }
  },
  created() {
    this.selectedTag = "all";
    this.activePage = 1;
    this.getContent();
  }
};
</script>

<style lang="stylus" scoped>
h1.page-headline {
  margin-top: 50px;
  margin-bottom: 20px;
}

section.projects-section {
  position: relative;
  min-height: 300px;
}
</style>
