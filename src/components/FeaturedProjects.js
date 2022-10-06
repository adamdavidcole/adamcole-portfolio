import {
  getProjectTitle,
  getProjectSubtitle,
  getProjectTextEl,
  getProjectKeywords,
  getProjectImageURLs,
} from "../data/data-selectors";

function FeaturedProject({ project }) {
  return (
    <div>
      <h3>{getProjectTitle(project)}</h3>
      <h4>{getProjectSubtitle(project)}</h4>
      <div>
        <div>{getProjectTextEl(project)}</div>
        <div>
          <strong>Tools:</strong> {getProjectKeywords(project)?.join(", ")}
        </div>
        <div>
          {getProjectImageURLs(project)?.map((imageURL) => (
            <img key={imageURL} src={imageURL} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjects({ featuredProjects = [] } = {}) {
  return (
    <div>
      <h2>Featured Projects</h2>
      {featuredProjects.map((project) => (
        <FeaturedProject key={project._id} project={project} />
      ))}
    </div>
  );
}
