import React from 'react'
import { getProjects } from './project'

type Props = {}

const page = (props: Props) => {
    const projects = getProjects();
  return (
    <div>
        <h1>Projects</h1>
        {projects.map((project) => (
            <div key={project.slug}>
                {/* <h1>{project.title}</h1> */}
                <p>{project.content}</p>
            </div>
        ))}
    </div>
  )
}

export default page