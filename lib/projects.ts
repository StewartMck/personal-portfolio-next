interface Project {
    id: Number
    title: String
    description: String
    url: String
    image: String
    featured: Boolean
}

export const filterFeaturedProjects = (projects: Array<Project>) =>{
    return projects.filter(proj=>proj.featured)
}