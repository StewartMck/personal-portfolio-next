interface Project {
    id: number
    title: string
    description: string
    url: string
    image: string
    featured: boolean
}

export const filterFeaturedProjects = (projects: Array<Project>) => {
    return projects.filter(proj => proj.featured)
}